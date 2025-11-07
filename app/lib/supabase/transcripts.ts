/**
 * Transcript Database Operations
 *
 * Functions for managing transcript history and stats
 */

import { supabaseAdmin } from './server';
import { Transcript, UserStats } from './types';

/**
 * Save a cleaned transcript to the database
 */
export async function saveTranscript(
  userId: string,
  inputText: string,
  outputText: string,
  platform?: 'youtube' | 'loom' | 'srt' | 'general',
  processingTimeMs?: number
): Promise<Transcript | null> {
  try {
    const characterCount = inputText.length;

    const { data, error } = await supabaseAdmin
      .from('transcripts')
      .insert({
        user_id: userId,
        input_text: inputText,
        output_text: outputText,
        character_count: characterCount,
        platform: platform || 'general',
        processing_time_ms: processingTimeMs,
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving transcript:', error);
      return null;
    }

    console.log('✅ Transcript saved:', data.id);
    return data;
  } catch (error) {
    console.error('Exception saving transcript:', error);
    return null;
  }
}

/**
 * Get user's transcript history
 */
export async function getUserTranscripts(
  userId: string,
  limit: number = 50,
  offset: number = 0
): Promise<Transcript[]> {
  try {
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
  } catch (error) {
    console.error('Exception fetching transcripts:', error);
    return [];
  }
}

/**
 * Get a single transcript by ID
 */
export async function getTranscriptById(
  transcriptId: string,
  userId: string
): Promise<Transcript | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('transcripts')
      .select('*')
      .eq('id', transcriptId)
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching transcript:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Exception fetching transcript:', error);
    return null;
  }
}

/**
 * Delete a transcript
 */
export async function deleteTranscript(
  transcriptId: string,
  userId: string
): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from('transcripts')
      .delete()
      .eq('id', transcriptId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error deleting transcript:', error);
      return false;
    }

    console.log('✅ Transcript deleted:', transcriptId);
    return true;
  } catch (error) {
    console.error('Exception deleting transcript:', error);
    return false;
  }
}

/**
 * Get user statistics
 */
export async function getUserStats(userId: string): Promise<UserStats> {
  try {
    // Use the database function we created
    const { data, error } = await supabaseAdmin
      .rpc('get_user_stats', { user_uuid: userId });

    if (error) {
      console.error('Error fetching user stats:', error);
      return {
        total_transcripts: 0,
        total_characters: 0,
        month_transcripts: 0,
        monthly_api_calls: 0,
      };
    }

    // RPC returns an array with one result
    const stats = data[0] || {
      total_transcripts: 0,
      total_characters: 0,
      month_transcripts: 0,
      monthly_api_calls: 0,
    };

    return {
      total_transcripts: Number(stats.total_transcripts),
      total_characters: Number(stats.total_characters),
      month_transcripts: Number(stats.month_transcripts),
      monthly_api_calls: Number(stats.monthly_api_calls),
    };
  } catch (error) {
    console.error('Exception fetching user stats:', error);
    return {
      total_transcripts: 0,
      total_characters: 0,
      month_transcripts: 0,
      monthly_api_calls: 0,
    };
  }
}

/**
 * Get recent activity for dashboard
 */
export async function getRecentActivity(
  userId: string,
  limit: number = 10
): Promise<Array<{
  action: string;
  timestamp: string;
  characters: number;
  platform?: string;
}>> {
  try {
    const { data, error } = await supabaseAdmin
      .from('transcripts')
      .select('platform, character_count, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent activity:', error);
      return [];
    }

    return (data || []).map((item) => ({
      action: `Cleaned ${item.platform || 'general'} transcript`,
      timestamp: formatTimestamp(item.created_at),
      characters: item.character_count,
      platform: item.platform,
    }));
  } catch (error) {
    console.error('Exception fetching recent activity:', error);
    return [];
  }
}

/**
 * Helper function to format timestamps
 */
function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
  if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  if (diffDays < 7) return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;

  return date.toLocaleDateString();
}
