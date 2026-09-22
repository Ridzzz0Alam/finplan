# FinPlan

Marketing site for FinPlan Advisory Group, an agency/organization site showcasing
services, the team and a contact funnel.

## Stack

| Piece | Version | Notes |
| --- | --- | --- |
| Next.js | 16.3.5 | App Router, Turbopack, typed routes (`PageProps` / `LayoutProps`) |
| React | 19.2.8 | Server Components by default |
| TypeScript | 5.x | Strict mode |
| Tailwind CSS | v4 | CSS-first config via `@theme` in `src/app/globals.css` |
| shadcn/ui | 4.x (`base-nova`) | Built on Base UI; components live in `src/components/ui` |
| lucide-react | 1.x | Icons |
| ESLint | 9 | Flat config, `eslint-config-next` |

## Commands

```bash
npm run dev     # dev server on http://localhost:3000
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Structure

```
src/
  app/
    layout.tsx              root layout, metadata, header + footer
    page.tsx                home: hero, services, process, proof
    services/page.tsx       services index + FAQ
    services/[slug]/        per-service detail (static, generateStaticParams)
    about/page.tsx          firm story, principles, team
    contact/page.tsx        contact details + form
    contact/actions.ts      "use server" form action
    contact/form-state.ts   shared form state type (kept out of the server module)
    sitemap.ts, robots.ts   generated SEO routes
    not-found.tsx           404
  components/
    ui/                     shadcn primitives (regenerate with `npx shadcn@latest add`)
    site-header, site-footer, mobile-nav, section, cta-band, service-card, contact-form
  lib/
    site.ts                 name, contact details, nav
    services.ts             service catalogue: one source for cards, detail pages, sitemap
```

## Editing content

- **Services**: add an entry to `services` in `src/lib/services.ts`. The card grid,
  detail route, sitemap and contact form dropdown all read from it.
- **Firm details**: `src/lib/site.ts`. Set `url` to the real domain before deploying.
  It backs `metadataBase`, the sitemap and `robots.txt`.
- **Brand colour**: the `--brand` tokens at the bottom of `src/app/globals.css`
  override the neutral shadcn defaults for both light and dark themes.

## Contact form

`submitContactForm` validates server-side and currently logs the enquiry. Replace the
`TODO` in `src/app/contact/actions.ts` with your email provider, CRM or database write.
Note that a `"use server"` module may only export async functions, so shared constants
belong in `form-state.ts`.

## Not included

No database, authentication or CMS. Content is typed data in `src/lib`.
