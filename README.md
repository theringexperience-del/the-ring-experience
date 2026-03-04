# The Ring Experience

Vue + Vite website with Sanity CMS content and a separate Studio mounted at `/admin`.

## Tech Stack

- Vue 3
- Vue Router
- Vite
- Tailwind CSS
- GSAP
- Sanity CMS

## Local Development

Install dependencies:

```bash
npm install
```

Run frontend in development mode:

```bash
npm run dev
```

Preview production build locally:

```bash
npx vite build
npm run preview
```

## Environment Variables

Create `.env` from `.env.example` and set:

- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`
- `VITE_GOOGLE_PLACES_API_KEY` (only if using Google reviews)

## CMS Notes

- Sanity Studio is configured with `basePath: /admin`.
- Main schema files are under `sanity/schemaTypes`.
- Studio config is in `studio/sanity.config.js`.

## Forms

- Forms send an email via `mailto` to `contactForm.recipientEmail` from CMS.
- Optional lead save to Google Sheet webhook via `contactForm.sheetWebhookUrl`.
- Lead save happens only when newsletter consent is checked.

## Build Notes

- `npm run dev` serves source code with Vite dev server (HMR).
- `npm run preview` serves the built `dist` output.
- If they differ, rebuild first (`npx vite build`) and check environment/config differences.
