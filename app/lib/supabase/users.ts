/**
 * User Database Operations
 *
 * Functions for managing user data in Supabase
 */

import { supabaseAdmin } from './server';
import { User } from './types';

/**
 * Get user by Clerk ID
 * Used when authenticating requests to find the corresponding database user
 */
export async function getUserByClerkId(clerkUserId: string): Promise<User | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('clerk_user_id', clerkUserId)
      .single();

    if (error) {
      console.error('Error fetching user by Clerk ID:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Exception fetching user:', error);
    return null;
  }
}

/**
 * Get user by database ID
 */
export async function getUserById(userId: string): Promise<User | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user by ID:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Exception fetching user:', error);
    return null;
  }
}

/**
 * Create a new user (called from Clerk webhook)
 */
export async function createUser(
  clerkUserId: string,
  email: string,
  fullName?: string
): Promise<User | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert({
        clerk_user_id: clerkUserId,
        email,
        full_name: fullName,
        plan: 'free',
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating user:', error);
      return null;
    }

    console.log('✅ User created:', data.id);
    return data;
  } catch (error) {
    console.error('Exception creating user:', error);
    return null;
  }
}

/**
 * Update user information
 */
export async function updateUser(
  clerkUserId: string,
  updates: {
    email?: string;
    full_name?: string;
  }
): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from('users')
      .update(updates)
      .eq('clerk_user_id', clerkUserId);

    if (error) {
      console.error('Error updating user:', error);
      return false;
    }

    console.log('✅ User updated:', clerkUserId);
    return true;
  } catch (error) {
    console.error('Exception updating user:', error);
    return false;
  }
}

/**
 * Delete user (called from Clerk webhook when user is deleted)
 */
export async function deleteUser(clerkUserId: string): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('clerk_user_id', clerkUserId);

    if (error) {
      console.error('Error deleting user:', error);
      return false;
    }

    console.log('✅ User deleted:', clerkUserId);
    return true;
  } catch (error) {
    console.error('Exception deleting user:', error);
    return false;
  }
}

/**
 * Update user's subscription plan
 */
export async function updateUserPlan(
  userId: string,
  plan: 'free' | 'pro' | 'enterprise'
): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from('users')
      .update({ plan })
      .eq('id', userId);

    if (error) {
      console.error('Error updating user plan:', error);
      return false;
    }

    console.log('✅ User plan updated:', userId, '→', plan);
    return true;
  } catch (error) {
    console.error('Exception updating user plan:', error);
    return false;
  }
}

/**
 * Update user's Stripe customer ID
 */
export async function updateUserStripeCustomer(
  userId: string,
  stripeCustomerId: string
): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin
      .from('users')
      .update({ stripe_customer_id: stripeCustomerId })
      .eq('id', userId);

    if (error) {
      console.error('Error updating Stripe customer ID:', error);
      return false;
    }

    console.log('✅ Stripe customer ID updated:', userId);
    return true;
  } catch (error) {
    console.error('Exception updating Stripe customer ID:', error);
    return false;
  }
}

/**
 * Get all users (admin function)
 */
export async function getAllUsers(
  limit: number = 50,
  offset: number = 0
): Promise<User[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching all users:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Exception fetching all users:', error);
    return [];
  }
}
