# TimeWipe SaaS Setup Guide

This guide will help you set up the complete TimeWipe SaaS platform with authentication, dashboard, and all features.

## Phase 2 Features Implemented

- ✅ Clerk Authentication Integration
- ✅ Protected Routes (Dashboard, Account pages)
- ✅ User Dashboard with stats and quick actions
- ✅ Account Settings pages (Profile, Billing, API Keys, Usage)
- ✅ API Documentation page
- ✅ Content pages (About, Contact, Privacy, Terms, Blog, Docs)
- ✅ Complete navigation with auth state
- ✅ DashboardLayout component

## Environment Setup

### 1. Clerk Authentication

1. Sign up at [https://clerk.com](https://clerk.com)
2. Create a new application
3. Copy your API keys from the dashboard
4. Create a `.env.local` file in the project root:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_here

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

### 2. Supabase (Optional for Phase 3)

If you want to implement the database features:

1. Create a project at [https://supabase.com](https://supabase.com)
2. Add these environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Stripe (Optional for Phase 3)

For payment processing:

1. Create an account at [https://stripe.com](https://stripe.com)
2. Get your API keys from the dashboard
3. Add to `.env.local`:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## Running the Application

1. Install dependencies:
```bash
npm install
```

2. Set up your `.env.local` file (see above)

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Pages Available

### Public Pages
- `/` - Homepage with free tool
- `/tools` - Tools directory
- `/tools/youtube` - YouTube transcript cleaner
- `/tools/loom` - Loom transcript cleaner
- `/tools/srt` - SRT file cleaner
- `/pricing` - Pricing plans
- `/features` - Features showcase
- `/api` - API documentation
- `/blog` - Blog (placeholder)
- `/docs` - Documentation
- `/about` - About page
- `/contact` - Contact page
- `/privacy` - Privacy policy
- `/terms` - Terms of service

### Authentication Pages
- `/login` - Login page
- `/signup` - Sign up page

### Protected Pages (Require Login)
- `/dashboard` - User dashboard
- `/account` - Account settings
- `/account/billing` - Billing & subscription
- `/account/api-keys` - API key management
- `/account/usage` - Usage statistics

## Next Steps (Phase 3)

To complete the full SaaS platform, implement:

1. **Database Integration**
   - User profiles table
   - Subscriptions tracking
   - API keys storage
   - Usage logs

2. **Stripe Payment Integration**
   - Create products in Stripe dashboard
   - Implement checkout flow
   - Add webhook handlers for subscription events
   - Update user subscription status

3. **API Endpoints**
   - `POST /api/v1/clean` - Clean timestamp endpoint
   - `POST /api/v1/bulk` - Bulk processing
   - `GET /api/v1/usage` - Usage statistics
   - Add API key validation middleware
   - Implement rate limiting

4. **Email Notifications**
   - Welcome emails
   - Billing notifications
   - API key alerts
   - Usage limit warnings

5. **Analytics Dashboard**
   - Usage charts with Recharts
   - Real-time statistics
   - Export functionality

## Troubleshooting

### Build Fails with Clerk Error

Make sure your `.env.local` file has valid Clerk keys. Get them from:
https://dashboard.clerk.com/last-active?path=api-keys

### Authentication Not Working

1. Check that Clerk keys are correctly set
2. Verify the middleware.ts file is in the project root
3. Check that ClerkProvider wraps your app in layout.tsx

### Protected Routes Not Working

The middleware automatically protects routes matching:
- `/dashboard/*`
- `/account/*`
- `/api/v1/*`

Make sure middleware.ts is in the root directory.

## Support

For issues or questions:
- Check the `.env.example` file for required environment variables
- Review the Clerk documentation: https://clerk.com/docs
- Contact the development team

## License

This project is proprietary to TimeWipe.
