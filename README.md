# Molarya — virtual kimyo laboratoriyasi

Next.js 16 + next-intl + Tailwind v4. Landing page (`/`), working virtual lab (`/virtual-lab`), pricing and business strategy (`/pricing`, also `/#narxlar`).

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # reaction engine + data tests
npm run lint && npm run typecheck
```

The lab's reaction rules live in `src/lib/lab/chemistry.ts`; add a substance to `substances` and a rule to `reactions`, and it appears in the lab.

## Production (Vercel)

1. Push this repository to GitHub.
2. In Vercel: **Add New → Project → import the repo** (framework: Next.js, defaults are fine).
3. Set the environment variable `NEXT_PUBLIC_SITE_URL` to your domain, e.g. `https://molarya.uz`.
4. **Settings → Domains → add your domain** and create the DNS records Vercel shows (A `76.76.21.21` for the root, CNAME `cname.vercel-dns.com` for `www`).
