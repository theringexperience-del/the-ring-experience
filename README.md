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
- `VITE_GOOGLE_PLACES_API_KEY` optional

Cloudflare Pages variables:

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
