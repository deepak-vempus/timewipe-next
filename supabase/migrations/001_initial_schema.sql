-- TimeWipe Database Schema
-- Created: 2025-11-07
-- Description: Initial schema for TimeWipe SaaS platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS TABLE
-- Synced from Clerk via webhooks
-- =====================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'enterprise')),
  stripe_customer_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TRANSCRIPTS TABLE
-- Stores user transcript history
-- =====================================================
CREATE TABLE transcripts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  input_text TEXT NOT NULL,
  output_text TEXT NOT NULL,
  character_count INTEGER NOT NULL,
  platform TEXT CHECK (platform IN ('youtube', 'loom', 'srt', 'general')),
  processing_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- API KEYS TABLE
-- For API access (Pro/Enterprise only)
-- =====================================================
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  key_hash TEXT NOT NULL, -- SHA-256 hash of the actual key
  key_prefix TEXT NOT NULL, -- First 12 chars for display (e.g., 'tw_abc12345...')
  name TEXT NOT NULL,
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  revoked_at TIMESTAMPTZ
);

-- =====================================================
-- API USAGE TABLE
-- Tracks API calls for rate limiting and billing
-- =====================================================
CREATE TABLE api_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  api_key_id UUID REFERENCES api_keys(id) ON DELETE SET NULL,
  endpoint TEXT NOT NULL,
  character_count INTEGER,
  response_time_ms INTEGER,
  status_code INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SUBSCRIPTIONS TABLE
-- Synced from Stripe via webhooks
-- =====================================================
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_price_id TEXT,
  plan TEXT NOT NULL CHECK (plan IN ('free', 'pro', 'enterprise')),
  status TEXT NOT NULL, -- 'active', 'canceled', 'past_due', 'trialing'
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Users indexes
CREATE INDEX idx_users_clerk_id ON users(clerk_user_id);
CREATE INDEX idx_users_stripe_customer ON users(stripe_customer_id);
CREATE INDEX idx_users_plan ON users(plan);

-- Transcripts indexes
CREATE INDEX idx_transcripts_user_id ON transcripts(user_id);
CREATE INDEX idx_transcripts_created_at ON transcripts(created_at DESC);
CREATE INDEX idx_transcripts_platform ON transcripts(platform);

-- API Keys indexes
CREATE INDEX idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX idx_api_keys_hash ON api_keys(key_hash);
CREATE INDEX idx_api_keys_revoked ON api_keys(revoked_at);

-- API Usage indexes
CREATE INDEX idx_api_usage_user_id ON api_usage(user_id);
CREATE INDEX idx_api_usage_created_at ON api_usage(created_at DESC);
CREATE INDEX idx_api_usage_endpoint ON api_usage(endpoint);

-- Subscriptions indexes
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE transcripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (clerk_user_id = auth.jwt() ->> 'sub');

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (clerk_user_id = auth.jwt() ->> 'sub');

-- Transcripts policies
CREATE POLICY "Users can view own transcripts" ON transcripts
  FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub')
  );

CREATE POLICY "Users can insert own transcripts" ON transcripts
  FOR INSERT WITH CHECK (
    user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub')
  );

CREATE POLICY "Users can delete own transcripts" ON transcripts
  FOR DELETE USING (
    user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub')
  );

-- API Keys policies
CREATE POLICY "Users can view own api keys" ON api_keys
  FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub')
  );

CREATE POLICY "Users can insert own api keys" ON api_keys
  FOR INSERT WITH CHECK (
    user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub')
  );

CREATE POLICY "Users can update own api keys" ON api_keys
  FOR UPDATE USING (
    user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub')
  );

CREATE POLICY "Users can delete own api keys" ON api_keys
  FOR DELETE USING (
    user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub')
  );

-- API Usage policies
CREATE POLICY "Users can view own api usage" ON api_usage
  FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub')
  );

-- Subscriptions policies
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (
    user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub')
  );

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for users table
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for subscriptions table
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Function to get monthly API usage count for a user
CREATE OR REPLACE FUNCTION get_monthly_api_usage(user_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  usage_count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO usage_count
  FROM api_usage
  WHERE user_id = user_uuid
    AND created_at >= DATE_TRUNC('month', NOW());

  RETURN COALESCE(usage_count, 0);
END;
$$ LANGUAGE plpgsql;

-- Function to get user stats
CREATE OR REPLACE FUNCTION get_user_stats(user_uuid UUID)
RETURNS TABLE(
  total_transcripts BIGINT,
  total_characters BIGINT,
  month_transcripts BIGINT,
  monthly_api_calls INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::BIGINT as total_transcripts,
    COALESCE(SUM(character_count), 0)::BIGINT as total_characters,
    COUNT(CASE WHEN created_at >= DATE_TRUNC('month', NOW()) THEN 1 END)::BIGINT as month_transcripts,
    get_monthly_api_usage(user_uuid) as monthly_api_calls
  FROM transcripts
  WHERE user_id = user_uuid;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================

COMMENT ON TABLE users IS 'User accounts synced from Clerk authentication';
COMMENT ON TABLE transcripts IS 'History of all transcript cleaning operations';
COMMENT ON TABLE api_keys IS 'API keys for programmatic access (Pro/Enterprise only)';
COMMENT ON TABLE api_usage IS 'API call tracking for rate limiting and analytics';
COMMENT ON TABLE subscriptions IS 'Subscription data synced from Stripe';

COMMENT ON COLUMN users.clerk_user_id IS 'Unique ID from Clerk authentication service';
COMMENT ON COLUMN users.plan IS 'Subscription plan: free, pro, or enterprise';
COMMENT ON COLUMN api_keys.key_hash IS 'SHA-256 hash of the API key for secure storage';
COMMENT ON COLUMN api_keys.key_prefix IS 'First 12 characters of key for display purposes';
COMMENT ON COLUMN api_usage.endpoint IS 'API endpoint that was called';
COMMENT ON COLUMN subscriptions.status IS 'Stripe subscription status';

-- =====================================================
-- INITIAL DATA (Optional)
-- =====================================================

-- You can add seed data here if needed
-- Example: INSERT INTO users (clerk_user_id, email, full_name) VALUES (...);

-- =====================================================
-- SCHEMA VERSION
-- =====================================================

-- Create a table to track schema versions
CREATE TABLE IF NOT EXISTS schema_versions (
  version INTEGER PRIMARY KEY,
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  description TEXT
);

INSERT INTO schema_versions (version, description)
VALUES (1, 'Initial schema with users, transcripts, api_keys, api_usage, and subscriptions tables');
