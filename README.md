# STAHLTECH — Private Security Uniforms & Accessories

A Next.js App Router, React, TypeScript, Tailwind CSS and Motion catalogue with a persistent multi-product quotation basket. No prices, payments, reviews, certifications or protection claims are invented.

## Setup

Use Node.js 22.14+ and npm. Run `npm ci`, copy `.env.example` to `.env.local`, then run `npm run build` and `npm run dev` for the production Worker preview. Use `npm run develop` for the Next.js development server. Public configuration is compiled at build time. `npm run build` builds all Next.js pages and packages a self-contained Cloudflare Worker in `dist/server/index.js` for Sites hosting. `npm run typecheck`, `npm run lint` and `npm test` run verification. Exact dependencies are pinned in package.json and package-lock.json; installed versions were checked against the package registry during development. Next.js 16.4.5 / React 19.3.1 / Motion 14.10.1 are used.

## Architecture and hosting

- `app/`: server components, App Router pages, metadata, sitemap, robots, error and loading boundaries.
- `components/`: responsive layout, client-side filters, variant gallery, forms, quote provider and review page.
- `lib/config.ts`: business configuration. Unknown contact details and external links are hidden.
- `lib/products.ts`: 30 **sample** catalogue entries and 11 private-security collections, including security badges and tactical phone holders.
- `lib/quote.ts`: shared Zod schemas and persisted-basket validation.
- `lib/enquiry-handler.ts`: server-only validation, honeypot, timing check, best-effort per-isolate rate limit, email delivery.
- `scripts/dev.ts`: optional Next.js development server with `/api/enquiry` handler.
- `scripts/build-worker.mjs`: packages gzip-compressed Next.js exports as assets alongside the enquiry handler in a Worker ES module. No external asset host is required. The Worker serves proper 404 responses and adds basic security headers. If the hosting target requires an `.openai/hosting.json` manifest, add it at the project root; the build copies it into `dist/.openai/` when present and skips the copy with a warning otherwise.

Pages are rendered on the server at **build time** with Next.js static generation. Interactive components hydrate in the browser. This deployment intentionally uses prerendered catalogue pages rather than request-time SSR; runtime server execution is reserved for validated enquiries. No Next.js Node server is needed in production. For very large catalogues or CMS-driven request-time rendering, migrate the hosting adapter and remove static export. The portable Next.js source can also be adapted for Vercel/Node; add a Next route handler forwarding POST to `handleEnquiry` and remove `output: 'export'` for that target. There is no fake client-side email success path.

## Email configuration (Resend)

The contact form posts to `/api/enquiry`, which is handled by `lib/enquiry-handler.ts` inside the packaged Worker. Only three values are needed:

| Variable | Meaning |
| --- | --- |
| `RESEND_API_KEY` | Server-only key from https://resend.com/api-keys |
| `ENQUIRY_FROM` | Verified sender, e.g. `STAHLTECH <enquiries@your-domain.com>` |
| `ENQUIRY_TO` | Business inbox, e.g. `stahltechbiz@gmail.com` (comma-separate for several) |

Setup:

1. Create a free Resend account and add a sending domain at https://resend.com/domains. Add the DNS records Resend shows and wait for **Verified**. Using a domain you own is required for reliable delivery to Gmail and other inboxes.
2. Create an API key and paste it into `.env.local` (already created from `.env.example`). Set `ENQUIRY_FROM` to an address on the verified domain and `ENQUIRY_TO` to the STAHLTECH inbox.
3. Run `npm run email:test`. It sends one message through the real Resend API and prints the exact provider error if something is wrong (invalid key, unverified domain, wrong `from` format).
4. Run `npm run develop`, submit the real form, and confirm the email arrives and that **Reply** addresses the buyer.
5. For production, add the same three values to the hosting provider's **runtime** environment settings, then redeploy. They are read from the Worker `env`, not baked into the bundle.

Before a domain is verified you can set `ENQUIRY_FROM="STAHLTECH <onboarding@resend.dev>"`. Resend's test sender only delivers to the email address that owns the Resend account, so it is useful for local checks but not for customers.

Never prefix these with `NEXT_PUBLIC_`. The form validates on both client and server, includes a honeypot, a 2.5-second minimum form age, same-origin enforcement and a best-effort rate limit. Buyer input is HTML-escaped in the notification email. If Resend rejects a message, the Worker logs the provider reason and the UI reports failure — there is no fake success path.

Without all three credentials the handler returns HTTP 503, explicitly stating the enquiry was neither sent nor stored. The basket remains in local storage. Buyer contact consent is validated on both client and server. The provider must return an acceptance ID before the UI shows success. Provider acceptance means accepted for delivery, not a guarantee of arrival. Test delivery and reply-to behavior with the real destination inbox before launch. There is no database or independent enquiry store.

Spam protection includes same-origin enforcement, JSON/content-size validation, honeypot, 2.5-second minimum form age and a basic five-attempt/minute limit. The in-memory limit is best effort per Worker isolate, not a global guarantee. Add Cloudflare rate limiting/Turnstile for a public high-traffic deployment.

## Replace business and catalogue content

1. Edit `lib/config.ts` and the `NEXT_PUBLIC_*` values in `.env.example`. Set the real domain, business contact information and other division URLs. Footer division links and WhatsApp appear only when configured. WhatsApp expects an international number including country code.
2. Replace the sample records in `lib/products.ts`. Each product has a stable slug, code, category, materials, colours, sizes and specification dictionary. Add optional `moq` and `leadTime` only when verified. Never add unsupported ballistic/safety claims. Product variants are validated again on the server.
3. Replace `public/images/` with original product photos. `imagePath` maps an image index to a local WebP. Image indices 20–28 and 42–43 represent private-security categories; 30–41 contain further uniform and identification products. Index 10 is a black glove keeper. Indices 42–43 are derived close-ups of the badge and holder concept images and should be replaced with original category photography. Multiple sample products share illustrative collection images; these are not exact SKU photos. Add separate photo paths/gallery arrays for real SKU-specific views. The current gallery supplies a full image and a crop, both explicitly illustrative. Current images use local WebP assets; Next Image has responsive sizing and prioritizes the hero. Worker-hosted images are pre-optimised rather than using a runtime image optimizer.
4. Remove or revise development notices only after catalogue verification. Set `sampleCatalogue:false` after legal/content review; this enables indexing and changes robots.txt. Set the correct canonical origin and rebuild.
5. Replace About's verification panel with approved company facts and original facility imagery. Draft privacy and terms need review for the actual legal entity, jurisdiction, retention, international transfers, order acceptance, shipping, returns and other policies.

## Private-security catalogue and imagery

The active range is now focused on Sécurité privée: polos, pilot shirts, softshells, windbreakers, parkas, padded clothing gilets, service trousers, armbands, chest/back strips, name tapes, numeric identifier carriers, security badges, badge reels, PVC badge holders, lanyards, ID wallets, duty belts, radio holders, glove keepers, belt and MOLLE phone holders, utility pouches, caps, beanies, plain uniform gloves, duty boots and formal shoes. There are 30 editable sample entries across 11 categories. English and French product terms are searchable, including unaccented French queries.

All imagery is illustrative AI-generated concept photography, not Stahltech stock photography. The hero shows black private-security clothing, a professional ID holder and orange identification armband. Product contact sheets show the same private-security range on off-white studio backgrounds. They were generated with the built-in image tool using these briefs and cropped into local WebP catalogue assets (indices 20–28 and 30–41). The badge and tactical phone-holder category images (42–43) are close-up crops of the same illustrative concepts. Index 10 is the earlier black glove-keeper concept. No ATEQ images, third-party brand marks or product claims were copied.

The sample numeric identification carrier is blank. Security badge products are plain concepts for buyer-supplied wording; no official identifier, agency badge or insignia is supplied. Phone holders and utility pouches are ordinary duty accessories. Padded gilets are ordinary clothing. No ballistic, anti-stab, cut-resistance or regulatory-compliance performance is claimed. Replace sample specifications and concept pictures with verified product information before launch.

## Before public launch

- Verify legal identity, address, contact email and phone.
- Replace/approve all sample product records, variants and concept images.
- Verify customisation options, MOQ and lead times individually.
- Configure and test Resend delivery with a verified sender.
- Add verified other-division URLs and optional WhatsApp.
- Approve privacy and terms; document retention and customer support procedures.
- Set the production domain and review canonical/social metadata.
- Disable sample mode only after review and run build/checks again.

Direct checkout can be added as a separate order/payment layer. Catalogue data and the quote schema are separate from presentation; do not treat quotation quantities as accepted orders.


## Delivery regression fix

The Worker keeps compressed assets internally but always decodes them before returning a response. It never manually sends Content-Encoding; the hosting layer owns transport compression. `/delivery-v2` versions Next.js assets so browsers do not reuse old compressed files from their immutable cache. Build before running `npm test`, which includes delivery regression checks for HTML, CSS, JavaScript, WebP, gzip/br request headers and HEAD responses.
