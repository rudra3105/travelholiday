# Travel Holiday — Premium Travel Agency

Full-stack Next.js 15 travel agency with Supabase.

## 1. Install & Run

```bash
npm install
npm run dev
# Opens at http://localhost:3000
```

## 2. Database Setup (Supabase SQL Editor — Easiest)

1. Go to: https://app.supabase.com/project/ycofajiaplkckwftonzf/sql/new
2. Paste the contents of `supabase/migrations/001_initial_schema.sql` → click **Run**
3. Paste the contents of `supabase/migrations/002_seed_data.sql` → click **Run**

Done! Your database has all tables + demo content.

## 3. Get Service Role Key

1. Go to: https://app.supabase.com/project/ycofajiaplkckwftonzf/settings/api
2. Copy the **service_role** secret key
3. Add to `.env.local`:
```
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## 4. Deploy to Vercel

```bash
npx vercel --prod
```

Add these in Vercel dashboard → Settings → Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL` = `https://ycofajiaplkckwftonzf.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `sb_publishable_8M1--6tmM39RGBgjD1AZmw_XHms7y_-`
- `SUPABASE_SERVICE_ROLE_KEY` = from step 3 above
- `RESEND_API_KEY` = from resend.com (for emails)
- `NEXT_PUBLIC_SITE_URL` = your Vercel URL

## Admin Panel

URL: `/admin/login` | User: `admin` | Pass: `admin123`
