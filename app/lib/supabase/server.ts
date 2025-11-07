/**
 * Supabase Admin Client for Server Components and API Routes
 *
 * This client bypasses Row Level Security (RLS) and has full database access.
 * Use this ONLY in server-side code (API routes, server components, webhooks).
 *
 * ⚠️ NEVER import this in client components!
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_URL. ' +
    'Please add it to your .env.local file.'
  );
}

if (!supabaseServiceKey) {
  throw new Error(
    'Missing SUPABASE_SERVICE_ROLE_KEY. ' +
    'This is required for server-side operations. ' +
    'Please add it to your .env.local file (NOT .env.example as it contains sensitive data).'
  );
}

/**
 * Supabase admin client with service role privileges
 * Bypasses RLS policies - use with caution!
 *
 * Use cases:
 * - Webhook handlers (Clerk, Stripe)
 * - Admin operations
 * - System-level queries
 * - Operations that need to bypass RLS
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/**
 * Test database connection
 * Call this to verify Supabase is properly configured
 */
export async function testConnection(): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from('users')
      .select('count')
      .limit(1);

    if (error) {
      console.error('Supabase connection test failed:', error);
      return false;
    }

    console.log('✅ Supabase connection successful');
    return true;
  } catch (error) {
    console.error('Supabase connection test error:', error);
    return false;
  }
}
