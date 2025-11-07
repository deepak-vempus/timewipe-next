/**
 * API Usage Tracking
 *
 * Functions for tracking API calls and enforcing rate limits
 */

import { supabaseAdmin } from './server';

/**
 * Track an API call for rate limiting and analytics
 */
export async function trackApiUsage(
  userId: string,
  endpoint: string,
  characterCount?: number,
  apiKeyId?: string,
  responseTimeMs?: number,
  statusCode?: number
): Promise<boolean> {
  try {
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
  } catch (error) {
    console.error('Exception tracking API usage:', error);
    return false;
  }
}

/**
 * Get monthly API call count for a user
 */
export async function getMonthlyApiCalls(userId: string): Promise<number> {
  try {
    // Use the database function we created
    const { data, error } = await supabaseAdmin
      .rpc('get_monthly_api_usage', { user_uuid: userId });

    if (error) {
      console.error('Error fetching monthly API calls:', error);
      return 0;
    }

    return data || 0;
  } catch (error) {
    console.error('Exception fetching monthly API calls:', error);
    return 0;
  }
}

/**
 * Check if user has exceeded rate limit
 */
export async function checkRateLimit(
  userId: string,
  plan: 'free' | 'pro' | 'enterprise'
): Promise<{ allowed: boolean; used: number; limit: number }> {
  try {
    const limits: Record<string, number> = {
      free: 100, // 100 API calls per month for free users
      pro: 10000, // 10,000 API calls per month for Pro users
      enterprise: Infinity, // Unlimited for Enterprise
    };

    const limit = limits[plan];
    const used = await getMonthlyApiCalls(userId);

    return {
      allowed: used < limit,
      used,
      limit,
    };
  } catch (error) {
    console.error('Exception checking rate limit:', error);
    return {
      allowed: false,
      used: 0,
      limit: 0,
    };
  }
}

/**
 * Get API usage analytics for dashboard
 */
export async function getApiUsageAnalytics(
  userId: string,
  days: number = 30
): Promise<Array<{
  date: string;
  calls: number;
  characters: number;
}>> {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabaseAdmin
      .from('api_usage')
      .select('created_at, character_count')
      .eq('user_id', userId)
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching API usage analytics:', error);
      return [];
    }

    // Group by date
    const grouped = (data || []).reduce((acc, item) => {
      const date = new Date(item.created_at).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { calls: 0, characters: 0 };
      }
      acc[date].calls++;
      acc[date].characters += item.character_count || 0;
      return acc;
    }, {} as Record<string, { calls: number; characters: number }>);

    return Object.entries(grouped).map(([date, stats]) => ({
      date,
      calls: stats.calls,
      characters: stats.characters,
    }));
  } catch (error) {
    console.error('Exception fetching API usage analytics:', error);
    return [];
  }
}

/**
 * Get endpoint usage breakdown
 */
export async function getEndpointUsage(
  userId: string
): Promise<Array<{ endpoint: string; count: number }>> {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { data, error } = await supabaseAdmin
      .from('api_usage')
      .select('endpoint')
      .eq('user_id', userId)
      .gte('created_at', startOfMonth.toISOString());

    if (error) {
      console.error('Error fetching endpoint usage:', error);
      return [];
    }

    // Count by endpoint
    const counts = (data || []).reduce((acc, item) => {
      acc[item.endpoint] = (acc[item.endpoint] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts)
      .map(([endpoint, count]) => ({ endpoint, count }))
      .sort((a, b) => b.count - a.count);
  } catch (error) {
    console.error('Exception fetching endpoint usage:', error);
    return [];
  }
}

/**
 * Calculate average response time
 */
export async function getAverageResponseTime(userId: string): Promise<number> {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { data, error } = await supabaseAdmin
      .from('api_usage')
      .select('response_time_ms')
      .eq('user_id', userId)
      .gte('created_at', startOfMonth.toISOString())
      .not('response_time_ms', 'is', null);

    if (error || !data || data.length === 0) {
      return 0;
    }

    const total = data.reduce((sum, item) => sum + (item.response_time_ms || 0), 0);
    return Math.round(total / data.length);
  } catch (error) {
    console.error('Exception fetching average response time:', error);
    return 0;
  }
}
