# Deployment Guide (`Pracodee` Static Site)

This is a frontend-only Vite + React application (`npm run build` outputs static files to `dist/`). No backend server or environment variables are required.

Deployment configs are included for:
- **Vercel**: `vercel.json`
- **Netlify**: `netlify.toml` and `public/_redirects`
- **Cloudflare Pages**: `public/_redirects`

---

## Step 1: Fill Remaining `[BRACKETED]` Placeholders
Before deploying, update:
1. `[YOUR_DOMAIN]` in `index.html`, `public/robots.txt`, `public/sitemap.xml`, and `src/data/services.ts`.
2. `[YOUR_STREET_ADDRESS]`, `[YOUR_CITY]`, `[YOUR_STATE]`, `[YOUR_PINCODE]`, and `[Mo-Sa 10:00-19:00]` in `index.html` (`LocalBusiness` JSON-LD).
3. `[BRACKETED]` policy answers in `src/data/services.ts` (`FAQ_ITEMS`) and `index.html` (`FAQPage` JSON-LD).
4. `[GOOGLE_REVIEW_LINK]` (and optional `embedUrl`) in `src/data/caseStudies.ts`.

---

## Step 2: Push Project to GitHub
```bash
git init
git add .
git commit -m "Initial production build for Pracodee website"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

---

## Step 3A: Deploy on Vercel (Recommended)
1. Sign in at [vercel.com](https://vercel.com) with GitHub.
2. Click **Add New → Project** and import your GitHub repository.
3. Confirm settings (auto-detected via `vercel.json`):
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**. Every future push to `main` automatically triggers a fresh production deployment.

### Connect Custom Domain on Vercel
1. Go to **Project Settings → Domains** and add your domain (e.g. `pracodee.in` and `www.pracodee.in`).
2. Add the DNS records shown in Vercel at your domain registrar (GoDaddy, Namecheap, Hostinger, Cloudflare):
   - **Apex (`@`)**: `A` record pointing to `76.76.21.21` (or Vercel's displayed IP).
   - **Subdomain (`www`)**: `CNAME` record pointing to `cname.vercel-dns.com`.
3. Wait for DNS propagation (usually 5–30 minutes); Vercel automatically provisions and renews **HTTPS (SSL)**.

---

## Step 3B: Deploy on Netlify
1. Sign in at [netlify.com](https://app.netlify.com) and click **Add new site → Import an existing project**.
2. Connect GitHub and select your repository.
3. Confirm build settings (also defined in `netlify.toml`):
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Click **Deploy site**. Every push to `main` auto-deploys.

### Connect Custom Domain on Netlify
1. Go to **Site configuration → Domain management → Add a domain**.
2. Add DNS records at your registrar:
   - **Apex (`@`)**: `A` record pointing to `75.2.60.5` (Netlify Load Balancer).
   - **Subdomain (`www`)**: `CNAME` record pointing to `<your-site-name>.netlify.app`.
3. Under **HTTPS**, click **Verify DNS configuration** and **Provision certificate** (Let's Encrypt SSL).

---

## Step 3C: Deploy on Cloudflare Pages
1. Open **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git**.
2. Select your repo with:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
3. Deploy; `public/_redirects` handles SPA client-side routing automatically. Add your custom domain under **Custom domains** for instant Cloudflare SSL.
