# The Ring Experience

Website and CMS project created by `klyk.studio` for The Ring Experience.

The project includes:
- a Vue 3 + Vite frontend
- a Sanity Studio mounted at `/admin`
- Cloudflare Pages Functions for lead handling
- Google Sheets lead storage
- Resend email notifications for form submissions

## Stack

- Vue 3
- Vue Router
- Vite
- Tailwind CSS
- GSAP
- Sanity CMS
- Cloudflare Pages Functions

## Main Features

- Editable website content through Sanity
- Embedded admin at `/admin`
- Booking and inquiry forms connected to `/api/lead`
- Lead backup in Google Sheets
- Notification emails sent through Resend

## Local Development

Install dependencies:

```bash
npm install
```

Run the frontend:

```bash
npm run dev
```

Build frontend + embedded studio:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Environment

Frontend `.env`:

- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`

Cloudflare Pages variables:

- `GOOGLE_PLACES_API_KEY` optional, used by `/api/google-reviews`
- `GOOGLE_PLACES_PLACE_ID` optional, used by `/api/google-reviews`
- `GOOGLE_SHEETS_CLIENT_EMAIL`
- `GOOGLE_SHEETS_PRIVATE_KEY`
- `GOOGLE_SHEETS_SPREADSHEET_ID`
- `GOOGLE_SHEETS_RANGE` optional
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_TO_EMAIL`

## Notes

- Sanity Studio config lives in [studio/sanity.config.js](/c:/Users/Nicoletta/OneDrive/Desktop/Tutto/Progetti/the-ring-experience/studio/sanity.config.js)
- Main schemas live in [sanity/schemaTypes](/c:/Users/Nicoletta/OneDrive/Desktop/Tutto/Progetti/the-ring-experience/sanity/schemaTypes)
- Lead function lives in [functions/api/lead.js](/c:/Users/Nicoletta/OneDrive/Desktop/Tutto/Progetti/the-ring-experience/functions/api/lead.js)

## Client content in Sanity

The client additions have been migrated to the production Sanity dataset. Content is read from the CMS; the page layouts remain Vue components.

| Content | Where to edit |
| --- | --- |
| Hero, workshop photographs and homepage sections | Pages / Homepage |
| Workshop prices, inclusions and descriptions | Pages / Our Offers |
| Maps, WhatsApp and Instagram destinations | Layout & Settings / Site Appearance / Public contact and review links |
| Main menu and footer links | Layout & Settings / Navbar / Footer |
| Journal articles | Journal articles |
| Custom jewellery, visitor guides and ring-planner content | Guides and new pages |
| FAQs | Pages / FAQ |
| Studio notebook links | Shared Sections / Studio notebook links |

All seven client WebP photographs are uploaded as native Sanity image assets. The frontend uses their asset URLs rather than local upload paths.

The production build renders the same Vue templates with a public CMS snapshot, so the initial HTML and the interactive site share their content. Rebuild after content changes to refresh static HTML, the sitemap and the journal feed.

Validation:

```bash
npm run check:cms
npm run build:frontend
node scripts/check-cms-migration.mjs
```

The one-time migration scripts under `scripts/migrate-client-*.mjs` preserve existing fields, reject pending drafts and use revision guards. They skip migrations already applied. Their `.local` backups are excluded from Git. The files in `content/migrations` are migration inputs, not browser content sources.

The offline fallback is a frozen copy of the client content in `src/content/clientFallback.js`. Missing CMS fields or failed requests use those original texts, prices and links. The client photographs fall back to the original local WebP files if a CMS image cannot load. Published CMS edits, empty fields and hidden packages take precedence. Builds also work from this fallback when CMS access or configuration is unavailable.

The current CMS photographs also have exact local WebP copies, indexed by immutable Sanity asset URL in `src/content/clientImages.json`. Known assets load locally in development and production, including CSS backgrounds; selecting a different image in Sanity still selects that new asset. To refresh the local image archive from a successful build, run `node scripts/cache-client-images.mjs`, then rebuild. Open the compiled site through `npm run preview` at `http://localhost:4173/`; port 5173 is the development server.
