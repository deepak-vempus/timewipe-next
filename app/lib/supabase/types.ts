/**
 * TypeScript types for Supabase database tables
 *
 * These types match the database schema and provide type safety
 * throughout the application.
 */

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

export interface UserStats {
  total_transcripts: number;
  total_characters: number;
  month_transcripts: number;
  monthly_api_calls: number;
}

// Database function return types
export type DatabaseFunction<T> = T;

// Helper types for API responses
export type DatabaseResult<T> = {
  data: T | null;
  error: Error | null;
};

// Plan type guard
export function isValidPlan(plan: string): plan is 'free' | 'pro' | 'enterprise' {
  return ['free', 'pro', 'enterprise'].includes(plan);
}

// Platform type guard
export function isValidPlatform(platform: string): platform is 'youtube' | 'loom' | 'srt' | 'general' {
  return ['youtube', 'loom', 'srt', 'general'].includes(platform);
}
