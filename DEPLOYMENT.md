# Deployment Guide - Fixing Clerk "Invalid Host" Error

## Problem
You're seeing this error when visiting your deployed site:
```json
{
  "errors": [{
    "message": "Invalid host",
    "long_message": "We were unable to attribute this request to an instance running on Clerk..."
  }]
}
```

## Root Cause
This error occurs because your Netlify domain is not registered in your Clerk application's allowed domains.

---

## Solution: Configure Clerk for Your Deployed Domain

### Step 1: Get Your Netlify Domain
1. Go to your Netlify dashboard
2. Find your site's URL (e.g., `https://your-site.netlify.app` or your custom domain)
3. Copy the full domain

### Step 2: Add Domain to Clerk Dashboard

1. **Go to Clerk Dashboard**: https://dashboard.clerk.com/
2. **Select your application** (the one you're using for TimeWipe)
3. **Navigate to "Domains"** in the left sidebar (or go to Settings → Domains)
4. **Add your Netlify domain**:
   - Click "Add domain" or "Add production domain"
   - Enter your Netlify URL: `https://your-site.netlify.app`
   - OR if using custom domain: `https://yourdomain.com`
   - Save the domain

### Step 3: Verify Environment Variables in Netlify

Make sure you've added the **correct** Clerk keys to Netlify:

1. Go to **Netlify Dashboard** → Your Site → **Site Settings** → **Environment Variables**
2. Verify these variables exist and have the **correct values**:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_... (or pk_test_... for testing)
CLERK_SECRET_KEY=sk_live_... (or sk_test_... for testing)
```

**IMPORTANT**: Make sure the keys match the Clerk instance where you added the domain!

### Step 4: Check Development vs Production Instance

Clerk has separate instances for development and production:

- **Development keys** start with `pk_test_` and `sk_test_`
- **Production keys** start with `pk_live_` and `sk_live_`

**For Netlify deployment**, you should use:
- **Production instance** keys (`pk_live_` / `sk_live_`) if deploying to a production domain
- **Development instance** keys (`pk_test_` / `sk_test_`) for testing/preview deployments

Make sure:
1. Your Netlify environment variables use keys from the **same** Clerk instance
2. Your domain is added to that **same** Clerk instance

### Step 5: Redeploy

After adding the domain and verifying keys:

1. Go to Netlify → Deploys
2. Click "Trigger deploy" → "Deploy site"
3. Wait for deployment to complete
4. Visit your site - the error should be gone!

---

## Common Issues

### Issue: Still seeing "Invalid host" after adding domain

**Solution**:
- Make sure the domain in Clerk **exactly matches** your Netlify URL
- Include `https://` if required
- Check for typos
- Try adding both with and without `www` if using custom domain

### Issue: Different error about publishable key

**Solution**:
- Your environment variables might not be set correctly in Netlify
- Go to Site Settings → Environment Variables and verify
- Make sure to redeploy after changing environment variables

### Issue: Works in development but not production

**Solution**:
- You're probably using development keys (`pk_test_`) for production
- Create a production instance in Clerk or use production keys
- Add your production domain to the production instance

---

## Quick Checklist

- [ ] Netlify domain added to Clerk dashboard (Settings → Domains)
- [ ] Correct Clerk keys in Netlify environment variables
- [ ] Keys match the Clerk instance where domain was added
- [ ] Site redeployed after changes
- [ ] No typos in domain or keys

---

## Testing

After completing the steps above:

1. Visit your Netlify URL
2. You should see the homepage without errors
3. Try signing up or logging in
4. Navigation should work properly

---

## Still Having Issues?

1. **Check Clerk Dashboard Logs**:
   - Go to Clerk Dashboard → Logs
   - Look for any error messages
   - They'll show exactly what's failing

2. **Verify in Browser DevTools**:
   - Open browser DevTools (F12)
   - Go to Network tab
   - Look for Clerk API requests
   - Check the request/response for more details

3. **Double-check Domain**:
   - In Clerk Dashboard → Domains
   - Make sure your exact Netlify URL is listed
   - Try removing and re-adding it

---

## Environment Variables Reference

Here are ALL the environment variables you should have in Netlify:

```bash
# Required - Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Optional - Clerk URLs (use defaults below)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Optional - If using custom domain
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

Make sure these are set in:
- Netlify Dashboard → Site Settings → Environment Variables

Do NOT set them in `netlify.toml` as they contain sensitive keys.

---

## Alternative: Use Development Instance for Testing

If you just want to test the deployment quickly:

1. Use your **development** Clerk instance keys (`pk_test_`, `sk_test_`)
2. Add your Netlify domain to the **development** instance in Clerk
3. This will work for testing but switch to production keys for live site

---

Need more help? Check:
- Clerk Docs: https://clerk.com/docs/deployments/overview
- Netlify Docs: https://docs.netlify.com/environment-variables/overview/
