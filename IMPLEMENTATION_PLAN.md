# TimeWipe SaaS - Detailed Implementation Plan

**Created:** 2025-11-07
**Status:** Ready to Execute
**Estimated Timeline:** 4-6 weeks to full production
**Current Progress:** 40% (Frontend Complete)

---

## Table of Contents

1. [Overview](#overview)
2. [Phase 1: Database & Core Backend (Week 1)](#phase-1-database--core-backend)
3. [Phase 2: API Endpoints & Authentication (Week 2)](#phase-2-api-endpoints--authentication)
4. [Phase 3: Stripe Payment Integration (Week 3)](#phase-3-stripe-payment-integration)
5. [Phase 4: Email & Notifications (Week 4)](#phase-4-email--notifications)
6. [Phase 5: Testing & Quality Assurance (Week 5)](#phase-5-testing--quality-assurance)
7. [Phase 6: Production Launch (Week 6)](#phase-6-production-launch)
8. [Post-Launch Roadmap](#post-launch-roadmap)

---

## Overview

### Current State
- ✅ Frontend: 95% complete
- ✅ Design System: 100% complete
- ✅ Authentication: 90% complete
- ❌ Backend: 0% complete
- ❌ Payments: 0% complete
- ❌ API: 0% complete

### Goal
Build a fully functional SaaS platform with:
- User authentication and authorization
- Database-backed user data
- Stripe payment processing
- REST API for integrations
- Email notifications
- Usage tracking and analytics
- Production-grade monitoring

---

## Phase 1: Database & Core Backend

**Duration:** 5-7 days
**Goal:** Set up database, connect to app, implement basic data operations

### Task 1.1: Supabase Project Setup

**Estimated Time:** 2-3 hours

**Steps:**

1. **Create Supabase Project**
   ```bash
   # Go to https://supabase.com/dashboard
   # Click "New Project"
   # Name: timewipe-production
   # Choose region closest to users
   # Set strong database password
   # Wait for provisioning (~2 minutes)
   ```

2. **Get Credentials**
   - Copy Project URL: `https://xxxxxxxxxxxxx.supabase.co`
   - Copy `anon` public key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - Copy `service_role` secret key (for server operations)

3. **Add to Environment Variables**

   Update `.env.local`:
   ```bash
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGci... # Server-side only
   ```

   Add to Netlify:
   - Site Settings → Environment Variables
   - Add all three variables
   - Redeploy

**Deliverables:**
- [ ] Supabase project created
- [ ] Environment variables configured locally
- [ ] Environment variables configured on Netlify
- [ ] Connection tested

---

### Task 1.2: Database Schema Implementation

**Estimated Time:** 4-6 hours

**Steps:**

1. **Create Migration File**

   Create `supabase/migrations/001_initial_schema.sql`:

   ```sql
   -- Enable UUID extension
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

   -- Users table (synced from Clerk)
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

   -- Transcripts table (history)
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

   -- API Keys table
   CREATE TABLE api_keys (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID REFERENCES users(id) ON DELETE CASCADE,
     key_hash TEXT NOT NULL, -- SHA-256 hash
     key_prefix TEXT NOT NULL, -- First 8 chars for display
     name TEXT NOT NULL,
     last_used_at TIMESTAMPTZ,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     revoked_at TIMESTAMPTZ
   );

   -- API Usage table
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

   -- Subscriptions table (synced from Stripe)
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

   -- Indexes for performance
   CREATE INDEX idx_users_clerk_id ON users(clerk_user_id);
   CREATE INDEX idx_users_stripe_customer ON users(stripe_customer_id);
   CREATE INDEX idx_transcripts_user_id ON transcripts(user_id);
   CREATE INDEX idx_transcripts_created_at ON transcripts(created_at DESC);
   CREATE INDEX idx_api_keys_user_id ON api_keys(user_id);
   CREATE INDEX idx_api_keys_hash ON api_keys(key_hash);
   CREATE INDEX idx_api_usage_user_id ON api_usage(user_id);
   CREATE INDEX idx_api_usage_created_at ON api_usage(created_at DESC);
   CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
   CREATE INDEX idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id);

   -- Row Level Security (RLS) policies
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE transcripts ENABLE ROW LEVEL SECURITY;
   ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
   ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;
   ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

   -- Users can only read their own data
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

   -- API Keys policies
   CREATE POLICY "Users can view own api keys" ON api_keys
     FOR SELECT USING (
       user_id IN (SELECT id FROM users WHERE clerk_user_id = auth.jwt() ->> 'sub')
     );

   CREATE POLICY "Users can manage own api keys" ON api_keys
     FOR ALL USING (
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

   -- Function to update updated_at timestamp
   CREATE OR REPLACE FUNCTION update_updated_at_column()
   RETURNS TRIGGER AS $$
   BEGIN
     NEW.updated_at = NOW();
     RETURN NEW;
   END;
   $$ language 'plpgsql';

   -- Trigger for users table
   CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
     FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

   -- Trigger for subscriptions table
   CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
     FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
   ```

2. **Run Migration**
   ```bash
   # Option 1: Using Supabase CLI
   npx supabase db push

   # Option 2: Using Supabase Dashboard
   # Go to SQL Editor → New Query
   # Paste the SQL above
   # Click "Run"
   ```

3. **Verify Tables**
   ```bash
   # Check tables were created
   # Supabase Dashboard → Table Editor
   # Should see: users, transcripts, api_keys, api_usage, subscriptions
   ```

**Deliverables:**
- [ ] Migration file created
- [ ] Tables created in Supabase
- [ ] Indexes created
- [ ] RLS policies enabled
- [ ] Schema verified

---

### Task 1.3: Supabase Client Setup

**Estimated Time:** 2-3 hours

**Steps:**

1. **Create Supabase Client**

   Create `app/lib/supabase/client.ts`:

   ```typescript
   import { createClient } from '@supabase/supabase-js';

   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
   const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

   if (!supabaseUrl || !supabaseAnonKey) {
     throw new Error('Missing Supabase environment variables');
   }

   export const supabase = createClient(supabaseUrl, supabaseAnonKey);
   ```

2. **Create Server Client**

   Create `app/lib/supabase/server.ts`:

   ```typescript
   import { createClient } from '@supabase/supabase-js';

   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
   const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

   if (!supabaseUrl || !supabaseServiceKey) {
     throw new Error('Missing Supabase service role key');
   }

   // Server-side client with admin privileges
   export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
     auth: {
       autoRefreshToken: false,
       persistSession: false,
     },
   });
   ```

3. **Create Type Definitions**

   Create `app/lib/supabase/types.ts`:

   ```typescript
   export interface User {
     id: string;
     clerk_user_id: string;
     email: string;
     full_name?: string;
     plan: 'free' | 'pro' | 'enterprise';
     stripe_customer_id?: string;
     created_at: string;
     updated_at: string;
   }

   export interface Transcript {
     id: string;
     user_id: string;
     input_text: string;
     output_text: string;
     character_count: number;
     platform?: 'youtube' | 'loom' | 'srt' | 'general';
     processing_time_ms?: number;
     created_at: string;
   }

   export interface ApiKey {
     id: string;
     user_id: string;
     key_hash: string;
     key_prefix: string;
     name: string;
     last_used_at?: string;
     created_at: string;
     revoked_at?: string;
   }

   export interface ApiUsage {
     id: string;
     user_id: string;
     api_key_id?: string;
     endpoint: string;
     character_count?: number;
     response_time_ms?: number;
     status_code?: number;
     created_at: string;
   }

   export interface Subscription {
     id: string;
     user_id: string;
     stripe_subscription_id?: string;
     stripe_price_id?: string;
     plan: 'free' | 'pro' | 'enterprise';
     status: 'active' | 'canceled' | 'past_due' | 'trialing';
     current_period_start?: string;
     current_period_end?: string;
     cancel_at_period_end: boolean;
     created_at: string;
     updated_at: string;
   }
   ```

**Deliverables:**
- [ ] Client created for browser
- [ ] Server client created for API routes
- [ ] TypeScript types defined
- [ ] Imports tested

---

### Task 1.4: Clerk → Supabase User Sync

**Estimated Time:** 3-4 hours

**Goal:** Automatically create user in Supabase when they sign up via Clerk

**Steps:**

1. **Create Webhook Handler**

   Create `app/api/webhooks/clerk/route.ts`:

   ```typescript
   import { Webhook } from 'svix';
   import { headers } from 'next/headers';
   import { WebhookEvent } from '@clerk/nextjs/server';
   import { supabaseAdmin } from '@/app/lib/supabase/server';

   export async function POST(req: Request) {
     // Get the headers
     const headerPayload = await headers();
     const svix_id = headerPayload.get('svix-id');
     const svix_timestamp = headerPayload.get('svix-timestamp');
     const svix_signature = headerPayload.get('svix-signature');

     // If there are no headers, error out
     if (!svix_id || !svix_timestamp || !svix_signature) {
       return new Response('Error: Missing svix headers', { status: 400 });
     }

     // Get the body
     const payload = await req.json();
     const body = JSON.stringify(payload);

     // Create a new Svix instance with your webhook secret
     const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

     let evt: WebhookEvent;

     // Verify the payload with the headers
     try {
       evt = wh.verify(body, {
         'svix-id': svix_id,
         'svix-timestamp': svix_timestamp,
         'svix-signature': svix_signature,
       }) as WebhookEvent;
     } catch (err) {
       console.error('Error verifying webhook:', err);
       return new Response('Error: Verification error', { status: 400 });
     }

     // Handle the webhook
     const eventType = evt.type;

     if (eventType === 'user.created') {
       const { id, email_addresses, first_name, last_name } = evt.data;

       // Create user in Supabase
       const { error } = await supabaseAdmin
         .from('users')
         .insert({
           clerk_user_id: id,
           email: email_addresses[0].email_address,
           full_name: `${first_name || ''} ${last_name || ''}`.trim(),
           plan: 'free',
         });

       if (error) {
         console.error('Error creating user in Supabase:', error);
         return new Response('Error: Database error', { status: 500 });
       }
     }

     if (eventType === 'user.updated') {
       const { id, email_addresses, first_name, last_name } = evt.data;

       // Update user in Supabase
       const { error } = await supabaseAdmin
         .from('users')
         .update({
           email: email_addresses[0].email_address,
           full_name: `${first_name || ''} ${last_name || ''}`.trim(),
         })
         .eq('clerk_user_id', id);

       if (error) {
         console.error('Error updating user in Supabase:', error);
       }
     }

     if (eventType === 'user.deleted') {
       const { id } = evt.data;

       // Delete user from Supabase (cascade deletes related data)
       const { error } = await supabaseAdmin
         .from('users')
         .delete()
         .eq('clerk_user_id', id);

       if (error) {
         console.error('Error deleting user from Supabase:', error);
       }
     }

     return new Response('Webhook processed', { status: 200 });
   }
   ```

2. **Configure Clerk Webhook**

   ```bash
   # 1. Go to Clerk Dashboard
   # 2. Navigate to Webhooks
   # 3. Click "Add Endpoint"
   # 4. Enter URL: https://your-site.netlify.app/api/webhooks/clerk
   # 5. Subscribe to events:
   #    - user.created
   #    - user.updated
   #    - user.deleted
   # 6. Copy the webhook signing secret
   # 7. Add to .env.local:
   CLERK_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx
   # 8. Add to Netlify environment variables
   ```

3. **Test Webhook**

   ```bash
   # Create a test user in Clerk
   # Check Supabase users table
   # Should see new row with clerk_user_id
   ```

**Deliverables:**
- [ ] Webhook route created
- [ ] Clerk webhook configured
- [ ] Webhook secret added to env
- [ ] User sync tested

---

### Task 1.5: Database Utility Functions

**Estimated Time:** 3-4 hours

**Steps:**

1. **Create User Utilities**

   Create `app/lib/supabase/users.ts`:

   ```typescript
   import { supabaseAdmin } from './server';
   import { User } from './types';

   export async function getUserByClerkId(clerkUserId: string): Promise<User | null> {
     const { data, error } = await supabaseAdmin
       .from('users')
       .select('*')
       .eq('clerk_user_id', clerkUserId)
       .single();

     if (error) {
       console.error('Error fetching user:', error);
       return null;
     }

     return data;
   }

   export async function getUserById(userId: string): Promise<User | null> {
     const { data, error } = await supabaseAdmin
       .from('users')
       .select('*')
       .eq('id', userId)
       .single();

     if (error) {
       console.error('Error fetching user:', error);
       return null;
     }

     return data;
   }

   export async function updateUserPlan(
     userId: string,
     plan: 'free' | 'pro' | 'enterprise'
   ): Promise<boolean> {
     const { error } = await supabaseAdmin
       .from('users')
       .update({ plan })
       .eq('id', userId);

     if (error) {
       console.error('Error updating user plan:', error);
       return false;
     }

     return true;
   }

   export async function updateUserStripeCustomer(
     userId: string,
     stripeCustomerId: string
   ): Promise<boolean> {
     const { error } = await supabaseAdmin
       .from('users')
       .update({ stripe_customer_id: stripeCustomerId })
       .eq('id', userId);

     if (error) {
       console.error('Error updating stripe customer:', error);
       return false;
     }

     return true;
   }
   ```

2. **Create Transcript Utilities**

   Create `app/lib/supabase/transcripts.ts`:

   ```typescript
   import { supabaseAdmin } from './server';
   import { Transcript } from './types';

   export async function saveTranscript(
     userId: string,
     inputText: string,
     outputText: string,
     platform?: 'youtube' | 'loom' | 'srt' | 'general',
     processingTimeMs?: number
   ): Promise<Transcript | null> {
     const characterCount = inputText.length;

     const { data, error } = await supabaseAdmin
       .from('transcripts')
       .insert({
         user_id: userId,
         input_text: inputText,
         output_text: outputText,
         character_count: characterCount,
         platform,
         processing_time_ms: processingTimeMs,
       })
       .select()
       .single();

     if (error) {
       console.error('Error saving transcript:', error);
       return null;
     }

     return data;
   }

   export async function getUserTranscripts(
     userId: string,
     limit: number = 50,
     offset: number = 0
   ): Promise<Transcript[]> {
     const { data, error } = await supabaseAdmin
       .from('transcripts')
       .select('*')
       .eq('user_id', userId)
       .order('created_at', { ascending: false })
       .range(offset, offset + limit - 1);

     if (error) {
       console.error('Error fetching transcripts:', error);
       return [];
     }

     return data || [];
   }

   export async function getUserStats(userId: string) {
     // Get total transcripts cleaned
     const { count: totalTranscripts } = await supabaseAdmin
       .from('transcripts')
       .select('*', { count: 'exact', head: true })
       .eq('user_id', userId);

     // Get total characters processed
     const { data: transcripts } = await supabaseAdmin
       .from('transcripts')
       .select('character_count')
       .eq('user_id', userId);

     const totalCharacters = transcripts?.reduce(
       (sum, t) => sum + t.character_count,
       0
     ) || 0;

     // Get this month's stats
     const startOfMonth = new Date();
     startOfMonth.setDate(1);
     startOfMonth.setHours(0, 0, 0, 0);

     const { count: monthTranscripts } = await supabaseAdmin
       .from('transcripts')
       .select('*', { count: 'exact', head: true })
       .eq('user_id', userId)
       .gte('created_at', startOfMonth.toISOString());

     return {
       totalTranscripts: totalTranscripts || 0,
       totalCharacters,
       monthTranscripts: monthTranscripts || 0,
     };
   }
   ```

3. **Create API Usage Utilities**

   Create `app/lib/supabase/api-usage.ts`:

   ```typescript
   import { supabaseAdmin } from './server';

   export async function trackApiUsage(
     userId: string,
     endpoint: string,
     characterCount?: number,
     apiKeyId?: string,
     responseTimeMs?: number,
     statusCode?: number
   ): Promise<boolean> {
     const { error } = await supabaseAdmin
       .from('api_usage')
       .insert({
         user_id: userId,
         api_key_id: apiKeyId,
         endpoint,
         character_count: characterCount,
         response_time_ms: responseTimeMs,
         status_code: statusCode,
       });

     if (error) {
       console.error('Error tracking API usage:', error);
       return false;
     }

     return true;
   }

   export async function getMonthlyApiCalls(userId: string): Promise<number> {
     const startOfMonth = new Date();
     startOfMonth.setDate(1);
     startOfMonth.setHours(0, 0, 0, 0);

     const { count } = await supabaseAdmin
       .from('api_usage')
       .select('*', { count: 'exact', head: true })
       .eq('user_id', userId)
       .gte('created_at', startOfMonth.toISOString());

     return count || 0;
   }

   export async function checkRateLimit(
     userId: string,
     plan: 'free' | 'pro' | 'enterprise'
   ): Promise<{ allowed: boolean; used: number; limit: number }> {
     const limits = {
       free: 100,
       pro: 10000,
       enterprise: Infinity,
     };

     const limit = limits[plan];
     const used = await getMonthlyApiCalls(userId);

     return {
       allowed: used < limit,
       used,
       limit,
     };
   }
   ```

**Deliverables:**
- [ ] User utility functions created
- [ ] Transcript utility functions created
- [ ] API usage tracking functions created
- [ ] Functions tested with sample data

---

### Phase 1 Deliverables Checklist

- [ ] Supabase project set up
- [ ] Database schema created
- [ ] All tables and indexes created
- [ ] RLS policies enabled
- [ ] Supabase clients configured
- [ ] TypeScript types defined
- [ ] Clerk webhook configured
- [ ] User sync working
- [ ] Utility functions created and tested
- [ ] Documentation updated

**Phase 1 Complete! Ready for Phase 2.**

---

## Phase 2: API Endpoints & Authentication

**Duration:** 5-7 days
**Goal:** Build REST API with authentication, implement core endpoints

### Task 2.1: API Route Structure

**Estimated Time:** 2 hours

**Steps:**

1. **Create API Directory Structure**

   ```bash
   mkdir -p app/api/v1/clean
   mkdir -p app/api/v1/usage
   mkdir -p app/api/v1/keys
   mkdir -p app/api/v1/transcripts
   ```

2. **Create API Types**

   Create `app/lib/api/types.ts`:

   ```typescript
   export interface ApiResponse<T = any> {
     success: boolean;
     data?: T;
     error?: {
       code: string;
       message: string;
       details?: any;
     };
     meta?: {
       timestamp: string;
       requestId?: string;
     };
   }

   export interface ApiError {
     code: string;
     message: string;
     statusCode: number;
   }

   export const API_ERRORS = {
     UNAUTHORIZED: {
       code: 'UNAUTHORIZED',
       message: 'Authentication required',
       statusCode: 401,
     },
     FORBIDDEN: {
       code: 'FORBIDDEN',
       message: 'Access denied',
       statusCode: 403,
     },
     NOT_FOUND: {
       code: 'NOT_FOUND',
       message: 'Resource not found',
       statusCode: 404,
     },
     RATE_LIMIT: {
       code: 'RATE_LIMIT_EXCEEDED',
       message: 'Rate limit exceeded',
       statusCode: 429,
     },
     INVALID_INPUT: {
       code: 'INVALID_INPUT',
       message: 'Invalid input data',
       statusCode: 400,
     },
     SERVER_ERROR: {
       code: 'SERVER_ERROR',
       message: 'Internal server error',
       statusCode: 500,
     },
   } as const;
   ```

3. **Create Response Helpers**

   Create `app/lib/api/response.ts`:

   ```typescript
   import { NextResponse } from 'next/server';
   import { ApiResponse, ApiError } from './types';

   export function successResponse<T>(
     data: T,
     status: number = 200
   ): NextResponse<ApiResponse<T>> {
     return NextResponse.json(
       {
         success: true,
         data,
         meta: {
           timestamp: new Date().toISOString(),
         },
       },
       { status }
     );
   }

   export function errorResponse(
     error: ApiError,
     details?: any
   ): NextResponse<ApiResponse> {
     return NextResponse.json(
       {
         success: false,
         error: {
           code: error.code,
           message: error.message,
           details,
         },
         meta: {
           timestamp: new Date().toISOString(),
         },
       },
       { status: error.statusCode }
     );
   }
   ```

**Deliverables:**
- [ ] API directory structure created
- [ ] API types defined
- [ ] Response helpers created

---

### Task 2.2: API Authentication Middleware

**Estimated Time:** 4-6 hours

**Steps:**

1. **Create API Key Generator**

   Create `app/lib/api/keys.ts`:

   ```typescript
   import { randomBytes, createHash } from 'crypto';

   export function generateApiKey(): { key: string; hash: string; prefix: string } {
     // Generate random 32-byte key
     const randomKey = randomBytes(32).toString('hex');

     // Create key with prefix
     const key = `tw_${randomKey}`;

     // Hash the key for storage
     const hash = createHash('sha256').update(key).digest('hex');

     // Get prefix for display (first 12 chars)
     const prefix = key.substring(0, 12);

     return { key, hash, prefix };
   }

   export function hashApiKey(key: string): string {
     return createHash('sha256').update(key).digest('hex');
   }

   export function validateApiKeyFormat(key: string): boolean {
     return /^tw_[a-f0-9]{64}$/.test(key);
   }
   ```

2. **Create Authentication Middleware**

   Create `app/lib/api/auth.ts`:

   ```typescript
   import { auth } from '@clerk/nextjs/server';
   import { NextRequest } from 'next/server';
   import { supabaseAdmin } from '@/app/lib/supabase/server';
   import { getUserByClerkId } from '@/app/lib/supabase/users';
   import { hashApiKey, validateApiKeyFormat } from './keys';
   import { API_ERRORS } from './types';

   export interface AuthContext {
     userId: string;
     clerkUserId: string;
     plan: 'free' | 'pro' | 'enterprise';
     apiKeyId?: string;
   }

   export async function authenticateRequest(
     req: NextRequest
   ): Promise<AuthContext | null> {
     // Try API key authentication first
     const apiKey = req.headers.get('x-api-key');

     if (apiKey) {
       if (!validateApiKeyFormat(apiKey)) {
         return null;
       }

       const keyHash = hashApiKey(apiKey);

       const { data: apiKeyData } = await supabaseAdmin
         .from('api_keys')
         .select('*, users(*)')
         .eq('key_hash', keyHash)
         .is('revoked_at', null)
         .single();

       if (!apiKeyData) {
         return null;
       }

       // Update last used timestamp
       await supabaseAdmin
         .from('api_keys')
         .update({ last_used_at: new Date().toISOString() })
         .eq('id', apiKeyData.id);

       return {
         userId: apiKeyData.user_id,
         clerkUserId: apiKeyData.users.clerk_user_id,
         plan: apiKeyData.users.plan,
         apiKeyId: apiKeyData.id,
       };
     }

     // Try Clerk session authentication
     const { userId: clerkUserId } = await auth();

     if (!clerkUserId) {
       return null;
     }

     const user = await getUserByClerkId(clerkUserId);

     if (!user) {
       return null;
     }

     return {
       userId: user.id,
       clerkUserId: user.clerk_user_id,
       plan: user.plan,
     };
   }

   export async function requireAuth(
     req: NextRequest
   ): Promise<AuthContext> {
     const authContext = await authenticateRequest(req);

     if (!authContext) {
       throw API_ERRORS.UNAUTHORIZED;
     }

     return authContext;
   }
   ```

**Deliverables:**
- [ ] API key generator created
- [ ] Authentication middleware created
- [ ] API key validation implemented
- [ ] Both auth methods supported (API key + session)

---

### Task 2.3: POST /api/v1/clean Endpoint

**Estimated Time:** 4-5 hours

**Steps:**

1. **Create Input Validation Schema**

   Create `app/lib/api/validation.ts`:

   ```typescript
   import { z } from 'zod';

   export const CleanRequestSchema = z.object({
     text: z.string().min(1, 'Text is required').max(1000000, 'Text too large'),
     platform: z.enum(['youtube', 'loom', 'srt', 'general']).optional(),
     save: z.boolean().optional().default(true),
   });

   export type CleanRequest = z.infer<typeof CleanRequestSchema>;
   ```

2. **Create Clean Endpoint**

   Create `app/api/v1/clean/route.ts`:

   ```typescript
   import { NextRequest } from 'next/server';
   import { requireAuth } from '@/app/lib/api/auth';
   import { successResponse, errorResponse } from '@/app/lib/api/response';
   import { API_ERRORS } from '@/app/lib/api/types';
   import { CleanRequestSchema } from '@/app/lib/api/validation';
   import { removeTimestamps } from '@/app/utils/timestampRemover';
   import { saveTranscript } from '@/app/lib/supabase/transcripts';
   import { trackApiUsage } from '@/app/lib/supabase/api-usage';
   import { checkRateLimit } from '@/app/lib/supabase/api-usage';

   export async function POST(req: NextRequest) {
     const startTime = Date.now();

     try {
       // Authenticate request
       const authContext = await requireAuth(req);

       // Check rate limit
       const rateLimitCheck = await checkRateLimit(authContext.userId, authContext.plan);

       if (!rateLimitCheck.allowed) {
         return errorResponse(API_ERRORS.RATE_LIMIT, {
           used: rateLimitCheck.used,
           limit: rateLimitCheck.limit,
         });
       }

       // Parse and validate request body
       const body = await req.json();
       const validationResult = CleanRequestSchema.safeParse(body);

       if (!validationResult.success) {
         return errorResponse(API_ERRORS.INVALID_INPUT, {
           errors: validationResult.error.format(),
         });
       }

       const { text, platform, save } = validationResult.data;

       // Process text
       const processStart = Date.now();
       const cleanedText = removeTimestamps(text);
       const processingTime = Date.now() - processStart;

       // Save to database if requested
       if (save) {
         await saveTranscript(
           authContext.userId,
           text,
           cleanedText,
           platform,
           processingTime
         );
       }

       // Track API usage
       await trackApiUsage(
         authContext.userId,
         '/api/v1/clean',
         text.length,
         authContext.apiKeyId,
         Date.now() - startTime,
         200
       );

       return successResponse({
         input: {
           length: text.length,
           platform: platform || 'general',
         },
         output: {
           text: cleanedText,
           length: cleanedText.length,
         },
         processing: {
           timeMs: processingTime,
         },
       });
     } catch (error: any) {
       // Track failed API usage
       try {
         const authContext = await requireAuth(req);
         await trackApiUsage(
           authContext.userId,
           '/api/v1/clean',
           0,
           authContext.apiKeyId,
           Date.now() - startTime,
           error.statusCode || 500
         );
       } catch {}

       if (error.statusCode) {
         return errorResponse(error);
       }

       console.error('API Error:', error);
       return errorResponse(API_ERRORS.SERVER_ERROR);
     }
   }
   ```

3. **Test Endpoint**

   ```bash
   # Test with curl
   curl -X POST https://your-site.netlify.app/api/v1/clean \
     -H "Content-Type: application/json" \
     -H "x-api-key: tw_your_api_key_here" \
     -d '{"text": "[00:00] Hello world", "platform": "youtube"}'

   # Expected response:
   {
     "success": true,
     "data": {
       "input": { "length": 18, "platform": "youtube" },
       "output": { "text": "Hello world", "length": 11 },
       "processing": { "timeMs": 2 }
     },
     "meta": { "timestamp": "2025-11-07T..." }
   }
   ```

**Deliverables:**
- [ ] Input validation schema created
- [ ] POST /api/v1/clean endpoint implemented
- [ ] Rate limiting working
- [ ] Usage tracking working
- [ ] Endpoint tested

---

### Task 2.4: GET /api/v1/usage Endpoint

**Estimated Time:** 2-3 hours

**Create** `app/api/v1/usage/route.ts`:

```typescript
import { NextRequest } from 'next/server';
import { requireAuth } from '@/app/lib/api/auth';
import { successResponse, errorResponse } from '@/app/lib/api/response';
import { API_ERRORS } from '@/app/lib/api/types';
import { getUserStats } from '@/app/lib/supabase/transcripts';
import { getMonthlyApiCalls, checkRateLimit } from '@/app/lib/supabase/api-usage';

export async function GET(req: NextRequest) {
  try {
    const authContext = await requireAuth(req);

    // Get user stats
    const stats = await getUserStats(authContext.userId);
    const monthlyApiCalls = await getMonthlyApiCalls(authContext.userId);
    const rateLimit = await checkRateLimit(authContext.userId, authContext.plan);

    return successResponse({
      plan: authContext.plan,
      usage: {
        transcripts: {
          total: stats.totalTranscripts,
          thisMonth: stats.monthTranscripts,
        },
        characters: {
          total: stats.totalCharacters,
        },
        apiCalls: {
          thisMonth: monthlyApiCalls,
          limit: rateLimit.limit,
          remaining: rateLimit.limit - monthlyApiCalls,
        },
      },
    });
  } catch (error: any) {
    if (error.statusCode) {
      return errorResponse(error);
    }
    console.error('API Error:', error);
    return errorResponse(API_ERRORS.SERVER_ERROR);
  }
}
```

**Deliverables:**
- [ ] GET /api/v1/usage endpoint implemented
- [ ] Returns accurate usage stats
- [ ] Endpoint tested

---

### Task 2.5: API Keys Management Endpoints

**Estimated Time:** 4-5 hours

**Create** `app/api/v1/keys/route.ts`:

```typescript
import { NextRequest } from 'next/server';
import { requireAuth } from '@/app/lib/api/auth';
import { successResponse, errorResponse } from '@/app/lib/api/response';
import { API_ERRORS } from '@/app/lib/api/types';
import { generateApiKey } from '@/app/lib/api/keys';
import { supabaseAdmin } from '@/app/lib/supabase/server';

// GET /api/v1/keys - List all API keys
export async function GET(req: NextRequest) {
  try {
    const authContext = await requireAuth(req);

    const { data: keys } = await supabaseAdmin
      .from('api_keys')
      .select('id, key_prefix, name, last_used_at, created_at')
      .eq('user_id', authContext.userId)
      .is('revoked_at', null)
      .order('created_at', { ascending: false });

    return successResponse({ keys: keys || [] });
  } catch (error: any) {
    if (error.statusCode) {
      return errorResponse(error);
    }
    console.error('API Error:', error);
    return errorResponse(API_ERRORS.SERVER_ERROR);
  }
}

// POST /api/v1/keys - Create new API key
export async function POST(req: NextRequest) {
  try {
    const authContext = await requireAuth(req);

    // Only Pro and Enterprise can create API keys
    if (authContext.plan === 'free') {
      return errorResponse(API_ERRORS.FORBIDDEN, {
        message: 'Upgrade to Pro to use API keys',
      });
    }

    const { name } = await req.json();

    if (!name || typeof name !== 'string') {
      return errorResponse(API_ERRORS.INVALID_INPUT, {
        message: 'Key name is required',
      });
    }

    // Generate API key
    const { key, hash, prefix } = generateApiKey();

    // Save to database
    const { data: apiKey, error } = await supabaseAdmin
      .from('api_keys')
      .insert({
        user_id: authContext.userId,
        key_hash: hash,
        key_prefix: prefix,
        name,
      })
      .select('id, key_prefix, name, created_at')
      .single();

    if (error) {
      console.error('Error creating API key:', error);
      return errorResponse(API_ERRORS.SERVER_ERROR);
    }

    return successResponse(
      {
        key, // Only returned once!
        ...apiKey,
      },
      201
    );
  } catch (error: any) {
    if (error.statusCode) {
      return errorResponse(error);
    }
    console.error('API Error:', error);
    return errorResponse(API_ERRORS.SERVER_ERROR);
  }
}
```

**Create** `app/api/v1/keys/[id]/route.ts`:

```typescript
import { NextRequest } from 'next/server';
import { requireAuth } from '@/app/lib/api/auth';
import { successResponse, errorResponse } from '@/app/lib/api/response';
import { API_ERRORS } from '@/app/lib/api/types';
import { supabaseAdmin } from '@/app/lib/supabase/server';

// DELETE /api/v1/keys/:id - Revoke API key
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authContext = await requireAuth(req);
    const { id } = params;

    // Verify ownership and revoke
    const { error } = await supabaseAdmin
      .from('api_keys')
      .update({ revoked_at: new Date().toISOString() })
      .eq('id', id)
      .eq('user_id', authContext.userId)
      .is('revoked_at', null);

    if (error) {
      return errorResponse(API_ERRORS.NOT_FOUND);
    }

    return successResponse({ message: 'API key revoked successfully' });
  } catch (error: any) {
    if (error.statusCode) {
      return errorResponse(error);
    }
    console.error('API Error:', error);
    return errorResponse(API_ERRORS.SERVER_ERROR);
  }
}
```

**Deliverables:**
- [ ] GET /api/v1/keys endpoint implemented
- [ ] POST /api/v1/keys endpoint implemented
- [ ] DELETE /api/v1/keys/:id endpoint implemented
- [ ] Plan validation working
- [ ] Endpoints tested

---

### Phase 2 Deliverables Checklist

- [ ] API route structure created
- [ ] Authentication middleware working
- [ ] POST /api/v1/clean endpoint working
- [ ] GET /api/v1/usage endpoint working
- [ ] API keys management endpoints working
- [ ] Rate limiting implemented
- [ ] Usage tracking working
- [ ] Error handling robust
- [ ] API documentation updated

**Phase 2 Complete! Ready for Phase 3.**

---

## Phase 3: Stripe Payment Integration

**Duration:** 5-7 days
**Goal:** Implement payment processing, subscription management

### Task 3.1: Stripe Setup

**Estimated Time:** 2-3 hours

**Steps:**

1. **Create Stripe Account**
   - Sign up at https://stripe.com
   - Complete business profile
   - Get API keys (test mode)

2. **Install Stripe**
   ```bash
   npm install stripe
   ```

3. **Add Environment Variables**
   ```bash
   # .env.local
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...

   # Add to Netlify as well
   ```

4. **Create Stripe Client**

   Create `app/lib/stripe/client.ts`:
   ```typescript
   import Stripe from 'stripe';

   if (!process.env.STRIPE_SECRET_KEY) {
     throw new Error('Missing STRIPE_SECRET_KEY');
   }

   export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
     apiVersion: '2024-11-20.acacia',
     typescript: true,
   });
   ```

5. **Create Stripe Products**
   - Go to Stripe Dashboard → Products
   - Create "Pro Plan" - $29/month
   - Create "Enterprise Plan" - Contact sales
   - Copy price IDs

6. **Add Price IDs to .env**
   ```bash
   STRIPE_PRO_PRICE_ID=price_...
   STRIPE_ENTERPRISE_PRICE_ID=price_...
   ```

**Deliverables:**
- [ ] Stripe account created
- [ ] Stripe installed
- [ ] Environment variables configured
- [ ] Products created in Stripe
- [ ] Price IDs saved

### Task 3.2: Checkout Flow

**Estimated Time:** 4-5 hours

**Create** `app/api/checkout/route.ts`:

```typescript
import { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { stripe } from '@/app/lib/stripe/client';
import { getUserByClerkId } from '@/app/lib/supabase/users';
import { successResponse, errorResponse } from '@/app/lib/api/response';
import { API_ERRORS } from '@/app/lib/api/types';

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return errorResponse(API_ERRORS.UNAUTHORIZED);
    }

    const user = await getUserByClerkId(clerkUserId);

    if (!user) {
      return errorResponse(API_ERRORS.NOT_FOUND);
    }

    const { priceId, successUrl, cancelUrl } = await req.json();

    // Create or retrieve Stripe customer
    let customerId = user.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          clerk_user_id: user.clerk_user_id,
          user_id: user.id,
        },
      });
      customerId = customer.id;

      // Save customer ID
      await updateUserStripeCustomer(user.id, customerId);
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/account/billing?success=true`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
      metadata: {
        user_id: user.id,
      },
    });

    return successResponse({ url: session.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return errorResponse(API_ERRORS.SERVER_ERROR);
  }
}
```

**Update** `app/account/billing/page.tsx` to use checkout:

```typescript
'use client';

// Add checkout handler
const handleUpgrade = async (priceId: string) => {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId }),
  });

  const data = await response.json();

  if (data.success && data.data.url) {
    window.location.href = data.data.url;
  }
};
```

**Deliverables:**
- [ ] Checkout API route created
- [ ] Stripe customer creation working
- [ ] Checkout session creation working
- [ ] Billing page updated
- [ ] Checkout flow tested

### Task 3.3: Stripe Webhooks

**Estimated Time:** 6-8 hours

**Create** `app/api/webhooks/stripe/route.ts`:

```typescript
import { headers } from 'next/headers';
import { stripe } from '@/app/lib/stripe/client';
import { supabaseAdmin } from '@/app/lib/supabase/server';
import { updateUserPlan } from '@/app/lib/supabase/users';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature');

  if (!signature) {
    return new Response('No signature', { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response('Invalid signature', { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.metadata?.user_id;
        const customerId = session.customer as string;

        if (!userId) break;

        // Get subscription details
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

        const priceId = subscription.items.data[0].price.id;
        const plan = getPlanFromPriceId(priceId);

        // Create subscription record
        await supabaseAdmin.from('subscriptions').insert({
          user_id: userId,
          stripe_subscription_id: subscription.id,
          stripe_price_id: priceId,
          plan,
          status: subscription.status,
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        });

        // Update user plan
        await updateUserPlan(userId, plan);

        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const priceId = subscription.items.data[0].price.id;
        const plan = getPlanFromPriceId(priceId);

        await supabaseAdmin
          .from('subscriptions')
          .update({
            plan,
            status: subscription.status,
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
          })
          .eq('stripe_subscription_id', subscription.id);

        // Update user plan
        const { data: sub } = await supabaseAdmin
          .from('subscriptions')
          .select('user_id')
          .eq('stripe_subscription_id', subscription.id)
          .single();

        if (sub) {
          await updateUserPlan(sub.user_id, plan);
        }

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;

        await supabaseAdmin
          .from('subscriptions')
          .update({ status: 'canceled' })
          .eq('stripe_subscription_id', subscription.id);

        // Downgrade to free
        const { data: sub } = await supabaseAdmin
          .from('subscriptions')
          .select('user_id')
          .eq('stripe_subscription_id', subscription.id)
          .single();

        if (sub) {
          await updateUserPlan(sub.user_id, 'free');
        }

        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const subscriptionId = invoice.subscription as string;

        await supabaseAdmin
          .from('subscriptions')
          .update({ status: 'past_due' })
          .eq('stripe_subscription_id', subscriptionId);

        break;
      }
    }

    return new Response('Webhook processed', { status: 200 });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return new Response('Webhook error', { status: 500 });
  }
}

function getPlanFromPriceId(priceId: string): 'free' | 'pro' | 'enterprise' {
  if (priceId === process.env.STRIPE_PRO_PRICE_ID) return 'pro';
  if (priceId === process.env.STRIPE_ENTERPRISE_PRICE_ID) return 'enterprise';
  return 'free';
}
```

**Configure Stripe Webhook:**
1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-site.netlify.app/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Copy webhook secret
5. Add to .env and Netlify

**Deliverables:**
- [ ] Webhook endpoint created
- [ ] All subscription events handled
- [ ] Stripe webhook configured
- [ ] Webhook tested with Stripe CLI

### Task 3.4: Customer Portal

**Estimated Time:** 2-3 hours

**Create** `app/api/billing-portal/route.ts`:

```typescript
import { NextRequest } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { stripe } from '@/app/lib/stripe/client';
import { getUserByClerkId } from '@/app/lib/supabase/users';
import { successResponse, errorResponse } from '@/app/lib/api/response';
import { API_ERRORS } from '@/app/lib/api/types';

export async function POST(req: NextRequest) {
  try {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return errorResponse(API_ERRORS.UNAUTHORIZED);
    }

    const user = await getUserByClerkId(clerkUserId);

    if (!user || !user.stripe_customer_id) {
      return errorResponse(API_ERRORS.NOT_FOUND);
    }

    const { returnUrl } = await req.json();

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripe_customer_id,
      return_url: returnUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/account/billing`,
    });

    return successResponse({ url: session.url });
  } catch (error: any) {
    console.error('Billing portal error:', error);
    return errorResponse(API_ERRORS.SERVER_ERROR);
  }
}
```

**Update billing page:**
```typescript
const handleManageSubscription = async () => {
  const response = await fetch('/api/billing-portal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });

  const data = await response.json();

  if (data.success && data.data.url) {
    window.location.href = data.data.url;
  }
};
```

**Deliverables:**
- [ ] Billing portal endpoint created
- [ ] Billing page updated
- [ ] Portal tested

### Phase 3 Deliverables Checklist

- [ ] Stripe account set up
- [ ] Products created in Stripe
- [ ] Checkout flow working
- [ ] Webhooks handling all events
- [ ] Customer portal working
- [ ] Subscription upgrades/downgrades working
- [ ] Payment failure handling
- [ ] Billing page showing real data

**Phase 3 Complete! Ready for Phase 4.**

---

## Phase 4: Email & Notifications

**Duration:** 3-4 days
**Goal:** Implement email system with transactional and marketing emails

### Task 4.1: Resend Setup

**Estimated Time:** 2 hours

1. **Sign up for Resend**
   - Go to https://resend.com
   - Create account
   - Verify domain
   - Get API key

2. **Install Resend**
   ```bash
   npm install resend
   ```

3. **Add to .env**
   ```bash
   RESEND_API_KEY=re_...
   ```

4. **Create Email Client**

   Create `app/lib/email/client.ts`:
   ```typescript
   import { Resend } from 'resend';

   export const resend = new Resend(process.env.RESEND_API_KEY);
   ```

**Deliverables:**
- [ ] Resend account created
- [ ] Domain verified
- [ ] Resend installed
- [ ] API key configured

### Task 4.2: Email Templates

**Estimated Time:** 4-6 hours

Create React email templates in `app/lib/email/templates/`:

1. **Welcome Email** (`welcome.tsx`)
2. **Usage Alert** (`usage-alert.tsx`)
3. **Payment Success** (`payment-success.tsx`)
4. **Payment Failed** (`payment-failed.tsx`)
5. **Subscription Canceled** (`subscription-canceled.tsx`)

Example template:

```typescript
import { Html, Head, Body, Container, Heading, Text, Button } from '@react-email/components';

interface WelcomeEmailProps {
  name: string;
}

export default function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f9fafb' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <Heading>Welcome to TimeWipe! 👋</Heading>
          <Text>Hi {name},</Text>
          <Text>
            Thanks for signing up! You're now ready to clean timestamps from your transcripts.
          </Text>
          <Button href="https://timewipe.com/tools" style={{ background: '#e07a5f', color: '#fff' }}>
            Get Started
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
```

**Deliverables:**
- [ ] 5 email templates created
- [ ] Templates tested locally

### Task 4.3: Email Sending Functions

**Estimated Time:** 3-4 hours

Create `app/lib/email/send.ts`:

```typescript
import { resend } from './client';
import WelcomeEmail from './templates/welcome';
import UsageAlertEmail from './templates/usage-alert';
// ... import other templates

export async function sendWelcomeEmail(to: string, name: string) {
  try {
    await resend.emails.send({
      from: 'TimeWipe <hello@timewipe.com>',
      to,
      subject: 'Welcome to TimeWipe!',
      react: WelcomeEmail({ name }),
    });
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
}

export async function sendUsageAlert(to: string, name: string, usage: number, limit: number) {
  try {
    await resend.emails.send({
      from: 'TimeWipe <alerts@timewipe.com>',
      to,
      subject: 'API Usage Alert - TimeWipe',
      react: UsageAlertEmail({ name, usage, limit }),
    });
  } catch (error) {
    console.error('Error sending usage alert:', error);
  }
}

// ... more email functions
```

**Deliverables:**
- [ ] Email sending functions created
- [ ] Error handling implemented
- [ ] Functions tested

### Task 4.4: Integrate Emails into Webhooks

**Estimated Time:** 2-3 hours

Update Clerk webhook to send welcome email:

```typescript
// In app/api/webhooks/clerk/route.ts

import { sendWelcomeEmail } from '@/app/lib/email/send';

if (eventType === 'user.created') {
  // ... existing code ...

  // Send welcome email
  await sendWelcomeEmail(
    email_addresses[0].email_address,
    first_name || 'there'
  );
}
```

Update Stripe webhook to send payment emails:

```typescript
// In app/api/webhooks/stripe/route.ts

import { sendPaymentSuccessEmail, sendPaymentFailedEmail } from '@/app/lib/email/send';

case 'checkout.session.completed': {
  // ... existing code ...

  // Send payment success email
  const user = await getUserById(userId);
  await sendPaymentSuccessEmail(user.email, user.full_name);

  break;
}
```

**Deliverables:**
- [ ] Welcome email integrated
- [ ] Payment emails integrated
- [ ] Usage alerts integrated
- [ ] All emails tested

### Phase 4 Deliverables Checklist

- [ ] Resend configured
- [ ] Email templates created
- [ ] Email sending functions created
- [ ] Emails integrated into webhooks
- [ ] All emails tested and working

**Phase 4 Complete! Ready for Phase 5.**

---

## Phase 5: Testing & Quality Assurance

**Duration:** 3-5 days
**Goal:** Ensure code quality, write tests, fix bugs

### Task 5.1: Set Up Testing Framework

**Estimated Time:** 2-3 hours

1. **Install Testing Dependencies**
   ```bash
   npm install -D vitest @testing-library/react @testing-library/jest-dom
   npm install -D @vitejs/plugin-react jsdom
   ```

2. **Create Vitest Config**

   Create `vitest.config.ts`:
   ```typescript
   import { defineConfig } from 'vitest/config';
   import react from '@vitejs/plugin-react';
   import path from 'path';

   export default defineConfig({
     plugins: [react()],
     test: {
       environment: 'jsdom',
       globals: true,
       setupFiles: './vitest.setup.ts',
     },
     resolve: {
       alias: {
         '@': path.resolve(__dirname, './app'),
       },
     },
   });
   ```

3. **Create Setup File**

   Create `vitest.setup.ts`:
   ```typescript
   import '@testing-library/jest-dom';
   ```

4. **Add Test Scripts**

   Update `package.json`:
   ```json
   {
     "scripts": {
       "test": "vitest",
       "test:ui": "vitest --ui",
       "test:coverage": "vitest --coverage"
     }
   }
   ```

**Deliverables:**
- [ ] Testing framework installed
- [ ] Configuration complete
- [ ] Test scripts added

### Task 5.2: Unit Tests

**Estimated Time:** 6-8 hours

Write tests for core functionality:

1. **Test Timestamp Remover**

   Create `app/utils/__tests__/timestampRemover.test.ts`:
   ```typescript
   import { describe, it, expect } from 'vitest';
   import { removeTimestamps } from '../timestampRemover';

   describe('removeTimestamps', () => {
     it('should remove YouTube timestamps', () => {
       const input = '[00:00] Hello world';
       const output = removeTimestamps(input);
       expect(output).toBe(' Hello world');
     });

     it('should remove Loom timestamps', () => {
       const input = '00:00 - Hello world';
       const output = removeTimestamps(input);
       expect(output).toBe(' Hello world');
     });

     // ... more tests
   });
   ```

2. **Test API Utilities**

   Create tests for:
   - Authentication helpers
   - API key generation
   - Rate limiting logic
   - Database queries

3. **Test Components**

   Create tests for:
   - Button variants
   - TranscriptCleaner
   - UserMenu states

**Deliverables:**
- [ ] Timestamp remover tested (100% coverage)
- [ ] API utilities tested (80%+ coverage)
- [ ] Component tests written

### Task 5.3: Integration Tests

**Estimated Time:** 4-6 hours

Test API endpoints:

Create `app/api/v1/__tests__/clean.test.ts`:
```typescript
import { describe, it, expect, beforeAll } from 'vitest';

describe('POST /api/v1/clean', () => {
  let apiKey: string;

  beforeAll(async () => {
    // Create test API key
    apiKey = 'tw_test_key';
  });

  it('should clean timestamps', async () => {
    const response = await fetch('http://localhost:3000/api/v1/clean', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        text: '[00:00] Test',
        platform: 'youtube',
      }),
    });

    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.output.text).toBe(' Test');
  });

  // ... more integration tests
});
```

**Deliverables:**
- [ ] API endpoint tests written
- [ ] Webhook tests written
- [ ] Integration tests passing

### Task 5.4: E2E Tests

**Estimated Time:** 6-8 hours

Install Playwright:
```bash
npm install -D @playwright/test
npx playwright install
```

Create E2E tests:

`tests/e2e/auth.spec.ts`:
```typescript
import { test, expect } from '@playwright/test';

test('user can sign up and access dashboard', async ({ page }) => {
  await page.goto('/signup');

  // Fill signup form
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'SecurePassword123!');
  await page.click('button[type="submit"]');

  // Should redirect to dashboard
  await expect(page).toHaveURL('/dashboard');

  // Should see welcome message
  await expect(page.locator('h1')).toContainText('Welcome back');
});
```

**Deliverables:**
- [ ] Playwright installed
- [ ] Auth flow tested
- [ ] Payment flow tested
- [ ] Tool usage tested

### Task 5.5: Manual QA

**Estimated Time:** 4-6 hours

**Test Checklist:**

**Authentication:**
- [ ] Sign up flow works
- [ ] Login flow works
- [ ] Logout works
- [ ] Protected routes redirect
- [ ] User data syncs to Supabase

**Core Functionality:**
- [ ] Timestamp removal works (all formats)
- [ ] File upload works
- [ ] Copy to clipboard works
- [ ] Download works
- [ ] Platform-specific pages work

**Dashboard:**
- [ ] Stats display correctly
- [ ] Recent activity shows
- [ ] Links work

**Account Pages:**
- [ ] Profile displays correctly
- [ ] Billing shows subscription
- [ ] API keys can be created
- [ ] API keys can be revoked
- [ ] Usage stats accurate

**Payments:**
- [ ] Checkout works
- [ ] Payment succeeds
- [ ] Subscription activates
- [ ] Customer portal works
- [ ] Cancellation works

**API:**
- [ ] POST /api/v1/clean works
- [ ] GET /api/v1/usage works
- [ ] API keys work
- [ ] Rate limiting works

**Emails:**
- [ ] Welcome email sent
- [ ] Payment emails sent
- [ ] Usage alerts sent

**Mobile:**
- [ ] All pages responsive
- [ ] Navigation works
- [ ] Forms work
- [ ] Tools work

**Deliverables:**
- [ ] All manual tests passed
- [ ] Bugs documented
- [ ] Critical bugs fixed

### Phase 5 Deliverables Checklist

- [ ] Testing framework set up
- [ ] Unit tests written (80%+ coverage)
- [ ] Integration tests written
- [ ] E2E tests written
- [ ] Manual QA completed
- [ ] All critical bugs fixed
- [ ] Code coverage report generated

**Phase 5 Complete! Ready for Phase 6.**

---

## Phase 6: Production Launch

**Duration:** 5-7 days
**Goal:** Deploy to production, set up monitoring, launch

### Task 6.1: Production Environment Setup

**Estimated Time:** 3-4 hours

1. **Create Production Clerk Instance**
   - Clerk Dashboard → Create new instance
   - Name: "TimeWipe Production"
   - Get production keys (`pk_live_`, `sk_live_`)
   - Configure production domain
   - Set up production webhooks

2. **Create Production Stripe Account**
   - Enable live mode in Stripe
   - Create live products
   - Get live API keys
   - Configure live webhooks

3. **Update Netlify Environment Variables**
   - Replace test keys with production keys
   - Verify all variables set correctly

4. **Set Up Custom Domain**
   - Purchase domain (timewipe.com)
   - Configure DNS in Netlify
   - Enable HTTPS
   - Verify SSL certificate

**Deliverables:**
- [ ] Production Clerk configured
- [ ] Production Stripe configured
- [ ] All env vars updated
- [ ] Custom domain configured
- [ ] SSL enabled

### Task 6.2: Monitoring & Error Tracking

**Estimated Time:** 4-5 hours

1. **Set Up Sentry**
   ```bash
   npm install @sentry/nextjs
   npx @sentry/wizard@latest -i nextjs
   ```

   Configure `sentry.client.config.ts`:
   ```typescript
   import * as Sentry from '@sentry/nextjs';

   Sentry.init({
     dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
     environment: process.env.NODE_ENV,
     tracesSampleRate: 1.0,
   });
   ```

2. **Set Up Vercel Analytics** (or PostHog)
   ```bash
   npm install @vercel/analytics
   ```

   Add to layout:
   ```typescript
   import { Analytics } from '@vercel/analytics/react';

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     );
   }
   ```

3. **Set Up Uptime Monitoring**
   - Sign up for Checkly or UptimeRobot
   - Monitor: Homepage, API endpoint, Dashboard
   - Set up alerts

**Deliverables:**
- [ ] Sentry configured
- [ ] Analytics configured
- [ ] Uptime monitoring configured
- [ ] Alert channels set up

### Task 6.3: Performance Optimization

**Estimated Time:** 3-4 hours

1. **Optimize Images**
   - Use Next.js Image component
   - Add loading="lazy"
   - Optimize all assets

2. **Add Caching Headers**
   - Configure in `netlify.toml`
   - Cache static assets
   - Set proper cache TTLs

3. **Database Query Optimization**
   - Add indexes for slow queries
   - Optimize N+1 queries
   - Add query caching where needed

4. **API Performance**
   - Add request caching
   - Optimize timestamp algorithm
   - Add compression

**Deliverables:**
- [ ] Images optimized
- [ ] Caching configured
- [ ] Database optimized
- [ ] API optimized
- [ ] Lighthouse score > 90

### Task 6.4: Security Audit

**Estimated Time:** 4-5 hours

1. **Security Checklist:**
   - [ ] All environment variables secured
   - [ ] API rate limiting enabled
   - [ ] CORS configured correctly
   - [ ] SQL injection protection (RLS)
   - [ ] XSS protection enabled
   - [ ] CSRF protection (for forms)
   - [ ] Webhook signature verification
   - [ ] API key hashing implemented
   - [ ] HTTPS enforced
   - [ ] Security headers configured

2. **Run Security Scan**
   ```bash
   npm audit
   npm audit fix
   ```

3. **Update Dependencies**
   ```bash
   npm update
   ```

**Deliverables:**
- [ ] Security audit completed
- [ ] All vulnerabilities fixed
- [ ] Dependencies updated
- [ ] Security headers configured

### Task 6.5: Documentation & Support

**Estimated Time:** 3-4 hours

1. **Update All Documentation**
   - [ ] README.md complete
   - [ ] API documentation accurate
   - [ ] Setup guides updated
   - [ ] Deployment guide created

2. **Create Support Resources**
   - [ ] FAQ page updated
   - [ ] Contact form working
   - [ ] Support email configured
   - [ ] Knowledge base started

3. **Create Changelog**
   - Document all features
   - Create version 1.0.0

**Deliverables:**
- [ ] All docs updated
- [ ] Support resources ready
- [ ] Changelog created

### Task 6.6: Launch!

**Estimated Time:** 1 day

**Pre-Launch Checklist:**
- [ ] All tests passing
- [ ] Production environment configured
- [ ] Monitoring active
- [ ] Security audit passed
- [ ] Performance optimized
- [ ] Documentation complete
- [ ] Backups configured
- [ ] Support ready

**Launch Steps:**

1. **Soft Launch**
   - Test with small group
   - Monitor for issues
   - Fix any bugs

2. **Public Launch**
   - Announce on social media
   - Submit to directories (Product Hunt, etc.)
   - Monitor traffic and errors

3. **Post-Launch Monitoring**
   - Watch error rates
   - Monitor performance
   - Track user feedback

**Deliverables:**
- [ ] Soft launch successful
- [ ] Public launch complete
- [ ] Monitoring active
- [ ] No critical issues

### Phase 6 Deliverables Checklist

- [ ] Production environment fully configured
- [ ] Monitoring and error tracking active
- [ ] Performance optimized
- [ ] Security audit passed
- [ ] Documentation complete
- [ ] Support resources ready
- [ ] Successfully launched!

**Phase 6 Complete! Application is LIVE! 🚀**

---

## Post-Launch Roadmap

### Month 1: Stability & Feedback

**Goals:**
- Ensure stability
- Gather user feedback
- Fix bugs quickly

**Tasks:**
- [ ] Monitor error rates daily
- [ ] Respond to support tickets within 24h
- [ ] Collect user feedback
- [ ] Fix all critical bugs
- [ ] Optimize based on real usage patterns

### Month 2-3: Feature Enhancements

**Goals:**
- Add requested features
- Improve UX based on feedback
- Increase conversion

**Potential Features:**
- [ ] Bulk file processing
- [ ] Custom timestamp formats
- [ ] Browser extension
- [ ] Integrations (Zapier, Make)
- [ ] Team/organization features
- [ ] Advanced analytics

### Month 4-6: Growth & Scaling

**Goals:**
- Scale infrastructure
- Expand features
- Grow user base

**Tasks:**
- [ ] Optimize for higher traffic
- [ ] Add enterprise features
- [ ] Implement referral program
- [ ] Add white-label options
- [ ] Mobile app (if needed)
- [ ] API marketplace listing

---

## Success Metrics

### Technical Metrics
- [ ] Uptime: > 99.9%
- [ ] API Response Time: < 200ms
- [ ] Error Rate: < 0.1%
- [ ] Lighthouse Score: > 90
- [ ] Test Coverage: > 80%

### Business Metrics
- [ ] Users: Track sign-ups
- [ ] Conversion Rate: Free → Pro
- [ ] MRR: Monthly Recurring Revenue
- [ ] Churn Rate: < 5%
- [ ] NPS: > 50

---

## Conclusion

This implementation plan provides a complete roadmap from the current state (40% complete) to a fully functional, production-ready SaaS platform.

**Total Estimated Timeline:** 4-6 weeks

**Key Phases:**
1. Week 1: Database & Backend Foundation
2. Week 2: API Development
3. Week 3: Payment Integration
4. Week 4: Email & Notifications
5. Week 5: Testing & QA
6. Week 6: Production Launch

By following this plan systematically, you'll have a professional, scalable SaaS platform that:
- Accepts payments
- Persists user data
- Provides API access
- Sends email notifications
- Has proper monitoring
- Is production-ready

**Next Steps:**
1. Review this plan
2. Prioritize phases based on your goals
3. Start with Phase 1: Database & Backend
4. Follow each task sequentially
5. Test thoroughly at each phase

Good luck with the implementation! 🚀
