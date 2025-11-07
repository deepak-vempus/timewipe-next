# Supabase Setup Guide - Step by Step

**Goal:** Get your database up and running in ~30 minutes

**What you'll do:**
1. Create Supabase account
2. Create a project
3. Run the database migration
4. Get your credentials
5. Add to environment variables
6. Test the connection

---

## Step 1: Create Supabase Account (5 minutes)

1. **Go to** https://supabase.com
2. **Click** "Start your project"
3. **Sign in** with GitHub (recommended) or email
4. **Verify** your email if needed

✅ **Done!** You now have a Supabase account.

---

## Step 2: Create Your Project (2 minutes)

1. **Click** "New Project" button
2. **Fill in details:**
   - Name: `timewipe-production` (or whatever you want)
   - Database Password: Generate a strong one (save it!)
   - Region: Choose closest to your users (e.g., `us-east-1`)
3. **Click** "Create new project"
4. **Wait** ~2 minutes for provisioning

✅ **Done!** Your database is being created.

---

## Step 3: Run Database Migration (5 minutes)

Once your project is ready:

1. **Go to** SQL Editor (left sidebar)
2. **Click** "New Query"
3. **Open** `supabase/migrations/001_initial_schema.sql` in your code editor
4. **Copy** the entire file (all ~400 lines)
5. **Paste** into Supabase SQL Editor
6. **Click** "Run" button (bottom right)
7. **Wait** for "Success. No rows returned" message

✅ **Done!** Your database tables are created.

### Verify Tables Were Created:

1. **Go to** Table Editor (left sidebar)
2. **You should see 6 tables:**
   - users
   - transcripts
   - api_keys
   - api_usage
   - subscriptions
   - schema_versions

If you see all 6 tables, you're good! ✅

---

## Step 4: Get Your Credentials (3 minutes)

1. **Go to** Project Settings (click gear icon at bottom left)
2. **Click** "API" in the left menu
3. **You'll see 3 important values:**

### Copy These Values:

**A. Project URL:**
```
https://xxxxxxxxxxxxx.supabase.co
```
Look for: "Project URL"

**B. Anon/Public Key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...
```
Look for: "anon public" (click "Copy" button)

**C. Service Role Key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...
```
Look for: "service_role" (click eye icon to reveal, then copy)

⚠️ **IMPORTANT:** The service_role key is SECRET! Never commit it to git or share it publicly.

✅ **Done!** You have your credentials.

---

## Step 5: Add to Environment Variables (5 minutes)

### A. Local Development (.env.local)

1. **Open** `.env.local` in your code editor
2. **Add/Update** these lines:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. **Replace** the values with your actual credentials
4. **Save** the file

### B. Netlify (Production)

1. **Go to** Netlify Dashboard
2. **Click** your site
3. **Go to** Site Settings → Environment Variables
4. **Add** these 3 variables:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your service_role key |

5. **Click** "Save"
6. **Trigger** a new deploy (Deploys → Trigger deploy)

✅ **Done!** Environment variables configured.

---

## Step 6: Test the Connection (5 minutes)

Let's verify everything is working!

### Test Locally:

1. **Start** your dev server:
   ```bash
   npm run dev
   ```

2. **Open** browser to http://localhost:3000

3. **Sign up** for a new account (this will test Clerk → Supabase sync)

4. **After signing up**, check Supabase:
   - Go to Table Editor → users table
   - You should see your new user! ✅

5. **Go to** http://localhost:3000/dashboard
   - Should load without errors ✅

### If you see your user in the database, everything works! 🎉

---

## Step 7: Configure Clerk Webhook (10 minutes)

This ensures new users are automatically added to your database.

1. **Go to** Clerk Dashboard: https://dashboard.clerk.com
2. **Select** your TimeWipe application
3. **Click** "Webhooks" in left sidebar
4. **Click** "Add Endpoint"

5. **Fill in details:**
   - Endpoint URL: `https://your-site.netlify.app/api/webhooks/clerk`
   - Replace `your-site.netlify.app` with your actual Netlify domain

6. **Subscribe to events** (click checkboxes):
   - ✅ user.created
   - ✅ user.updated
   - ✅ user.deleted

7. **Click** "Create"

8. **Copy** the "Signing Secret" (starts with `whsec_`)

9. **Add** to environment variables:

   **Local (.env.local):**
   ```bash
   CLERK_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

   **Netlify:**
   - Site Settings → Environment Variables
   - Add: `CLERK_WEBHOOK_SECRET` = your signing secret
   - Save and redeploy

✅ **Done!** Webhook configured.

### Test the Webhook:

1. **Create** a test user in Clerk or on your site
2. **Check** Supabase users table
3. **User should appear** within seconds ✅

---

## Troubleshooting

### Problem: SQL migration fails

**Error:** "relation already exists"
**Fix:** Tables were already created. You're good!

**Error:** "permission denied"
**Fix:** Make sure you're running as the project owner. Check your Supabase account settings.

### Problem: Connection test fails

**Error:** "Missing NEXT_PUBLIC_SUPABASE_URL"
**Fix:**
1. Check `.env.local` file exists
2. Check variable names are exact (case sensitive)
3. Restart dev server: `npm run dev`

**Error:** "Invalid API key"
**Fix:**
1. Go back to Supabase → Settings → API
2. Copy the keys again (make sure you copied the full key)
3. Update `.env.local`
4. Restart dev server

### Problem: Webhook not working

**Error:** User created in Clerk but not in Supabase
**Fix:**
1. Check webhook URL is correct (should end with `/api/webhooks/clerk`)
2. Check `CLERK_WEBHOOK_SECRET` is set correctly
3. Check Clerk webhook dashboard for error messages
4. Check Netlify logs for errors

### Problem: RLS (Row Level Security) errors

**Error:** "new row violates row-level security policy"
**Fix:** This usually means you're using the anon key instead of service_role key for server operations. Make sure server-side code uses `supabaseAdmin` from `app/lib/supabase/server.ts`.

---

## Verification Checklist

Before moving on, verify:

- [ ] Supabase project created
- [ ] All 6 tables exist in Table Editor
- [ ] Environment variables set locally
- [ ] Environment variables set on Netlify
- [ ] Dev server starts without errors
- [ ] Can sign up for new account
- [ ] New user appears in Supabase users table
- [ ] Clerk webhook configured
- [ ] Webhook test successful

If all checkboxes are ✅, you're ready for Phase 2! 🚀

---

## What's Next?

You've completed **Phase 1: Database Infrastructure**! 🎉

Your database is now:
- ✅ Created and configured
- ✅ Connected to your app
- ✅ Syncing users from Clerk
- ✅ Ready to store data

**Next:** Phase 2 - API Endpoints

See `IMPLEMENTATION_PLAN.md` for Phase 2 details.

---

## Quick Reference

**Supabase Dashboard:** https://supabase.com/dashboard
**Your Project:** https://supabase.com/dashboard/project/YOUR_PROJECT_ID

**Useful Queries:**

View all users:
```sql
SELECT * FROM users;
```

View user stats:
```sql
SELECT * FROM get_user_stats('USER_UUID_HERE');
```

Count transcripts:
```sql
SELECT COUNT(*) FROM transcripts;
```

---

## Need Help?

**Supabase Docs:** https://supabase.com/docs
**Supabase Discord:** https://discord.supabase.com
**Clerk Docs:** https://clerk.com/docs

**Common Issues:** Check `CODE_REVIEW.md` and `IMPLEMENTATION_PLAN.md`

---

**Estimated Total Time:** 30-40 minutes

Good luck! 🚀
