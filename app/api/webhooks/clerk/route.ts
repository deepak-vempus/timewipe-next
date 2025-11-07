/**
 * Clerk Webhook Handler
 *
 * Syncs user data from Clerk to Supabase database
 * Handles user.created, user.updated, and user.deleted events
 */

import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createUser, updateUser, deleteUser } from '@/app/lib/supabase/users';

/**
 * POST /api/webhooks/clerk
 *
 * Receives webhook events from Clerk and syncs user data to Supabase
 */
export async function POST(req: Request) {
  // Get webhook secret from environment
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error('Missing CLERK_WEBHOOK_SECRET');
    return new Response('Configuration error', { status: 500 });
  }

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // Verify headers exist
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Missing svix headers');
    return new Response('Error: Missing svix headers', { status: 400 });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create Svix instance
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify webhook signature
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err: any) {
    console.error('Error verifying webhook:', err.message);
    return new Response('Error: Verification failed', { status: 400 });
  }

  // Handle webhook event
  const eventType = evt.type;
  console.log(`📥 Received Clerk webhook: ${eventType}`);

  try {
    switch (eventType) {
      case 'user.created': {
        const { id, email_addresses, first_name, last_name } = evt.data;

        const email = email_addresses[0]?.email_address;
        if (!email) {
          console.error('No email address found in user.created event');
          return new Response('Error: No email address', { status: 400 });
        }

        const fullName = [first_name, last_name]
          .filter(Boolean)
          .join(' ')
          .trim();

        // Create user in Supabase
        const user = await createUser(id, email, fullName || undefined);

        if (!user) {
          console.error('Failed to create user in Supabase');
          return new Response('Error: Failed to create user', { status: 500 });
        }

        console.log('✅ User created in Supabase:', user.id);
        break;
      }

      case 'user.updated': {
        const { id, email_addresses, first_name, last_name } = evt.data;

        const email = email_addresses[0]?.email_address;
        const fullName = [first_name, last_name]
          .filter(Boolean)
          .join(' ')
          .trim();

        // Update user in Supabase
        const success = await updateUser(id, {
          email: email || undefined,
          full_name: fullName || undefined,
        });

        if (!success) {
          console.error('Failed to update user in Supabase');
          return new Response('Error: Failed to update user', { status: 500 });
        }

        console.log('✅ User updated in Supabase:', id);
        break;
      }

      case 'user.deleted': {
        const { id } = evt.data;

        if (!id) {
          console.error('No user ID in user.deleted event');
          return new Response('Error: No user ID', { status: 400 });
        }

        // Delete user from Supabase (cascade deletes related data)
        const success = await deleteUser(id);

        if (!success) {
          console.error('Failed to delete user from Supabase');
          return new Response('Error: Failed to delete user', { status: 500 });
        }

        console.log('✅ User deleted from Supabase:', id);
        break;
      }

      default:
        console.log(`⚠️  Unhandled webhook event type: ${eventType}`);
    }

    return new Response('Webhook processed successfully', { status: 200 });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    return new Response(
      `Error: ${error.message || 'Unknown error'}`,
      { status: 500 }
    );
  }
}
