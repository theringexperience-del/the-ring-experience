import { createClient } from '@sanity/client';

export const sanity = createClient({
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: import.meta.env.VITE_SANITY_DATASET,
    apiVersion: '2024-01-01',
    useCdn: true
});

export function toWebImage(url, options = {}) {
    if (!url || typeof url !== 'string') return '';

    const width = Number.isFinite(options.width) ? options.width : 1600;
    const quality = Number.isFinite(options.quality) ? options.quality : 80;
    const separator = url.includes('?') ? '&' : '?';

    return `${url}${separator}auto=format&fit=max&w=${width}&q=${quality}`;
}

const HOMEPAGE_QUERY = `
*[_type == "homepage"][0]{
  hero{
    headline,
    subheadline,
    buttonLabel,
    buttonLink,
    secondaryButtonLabel,
    secondaryButtonLink,
    mediaType,
    "image": image.asset->url,
    "video": video.asset->url
  },
  aMoment{
    eyebrow,
    title,
    paragraphOne,
    paragraphTwo,
    "image": image.asset->url
  },
  theExperience{
    eyebrow,
    title
  },
  experienceCards[]{
    key,
    title,
    lineOne,
    lineTwo,
    "image": image.asset->url
  },
  packagesPreview{
    enabled,
    eyebrow,
    heading,
    description,
    ctaLabel,
    ctaLink
  },
  values{
    heading,
    "backgroundImage": backgroundImage.asset->url,
    items[]{
      title,
      text
    }
  },
  reviews{
    enabled,
    eyebrow,
    heading,
    description,
    sourceLabel,
    sourceUrl,
    embedUrl,
    sourceType,
    googlePlaceId,
    maxItems,
    items[]{
      author,
      rating,
      text,
      dateLabel
    }
  }
}
`;

const SOCIAL_QUERY = `
*[_type == "social"][0]{
  eyebrow,
  heading,
  description,
  "backgroundImage": backgroundImage.asset->url,
  links[]{
    label,
    href
  }
}
`;

const ABOUT_US_QUERY = `
*[_type == "aboutUs"][0]{
  hero{
    eyebrow,
    title,
    description,
    "backgroundImage": backgroundImage.asset->url
  },
  approach{
    eyebrow,
    title,
    paragraphOne,
    paragraphTwo,
    "image": image.asset->url
  },
  origin{
    eyebrow,
    title,
    paragraphOne,
    paragraphTwo,
    "image": image.asset->url
  },
  packagesSection{
    eyebrow,
    heading,
    description,
    ctaLabel
  },
  packages[]{
    tag,
    name,
    duration,
    description,
    price
  }
}
`;

const OFFERS_PAGE_QUERY = `
*[_type == "offersPage"][0]{
  hero{
    eyebrow,
    title,
    description,
    "backgroundImage": backgroundImage.asset->url
  },
  packagesSection{
    eyebrow,
    heading,
    description
  },
  packages[]{
    key,
    isVisible,
    tag,
    name,
    duration,
    summary,
    fullDescription,
    idealFor,
    highlights[],
    buttonLabel
  },
  gemstonesLink{
    enabled,
    eyebrow,
    heading,
    description,
    buttonLabel,
    buttonLink
  }
}
`;

const GEMSTONES_PAGE_QUERY = `
*[_type == "gemstonesPage"][0]{
  hero{
    eyebrow,
    title,
    description,
    "backgroundImage": backgroundImage.asset->url
  },
  intro{
    eyebrow,
    heading,
    description
  },
  gemstones[]{
    key,
    name,
    isVisible,
    origin,
    tone,
    cut,
    description,
    "image": image.asset->url
  }
}
`;

const CLIENT_GALLERY_QUERY = `
*[_type == "clientGallery"][0]{
  hero{
    eyebrow,
    title,
    description,
    "backgroundImage": backgroundImage.asset->url
  },
  intro{
    eyebrow,
    heading,
    description
  },
  photos[]{
    "image": image.asset->url,
    isVisible,
    displaySize,
    caption,
    story,
    dateLabel
  }
}
`;

const BOOKING_PAGE_QUERY = `
*[_type == "bookingPage"][0]{
  hero{
    eyebrow,
    title,
    description,
    "backgroundImage": backgroundImage.asset->url
  },
  calendly{
    enabled,
    eyebrow,
    heading,
    description,
    link
  }
}
`;

const CONTACT_FORM_QUERY = `
*[_type == "contactForm"][0]{
  enabled,
  eyebrow,
  heading,
  description,
  recipientEmail,
  sheetWebhookUrl,
  subjectPrefix,
  submitLabel,
  privacyNote,
  newsletterConsentLabel
}
`;

const PAGE_CTA_QUERY = `
*[_type == "pageCta"][0]{
  home{
    enabled,
    showInquiryForm,
    eyebrow,
    heading,
    description,
    buttonLabel,
    buttonLink,
    "backgroundImage": backgroundImage.asset->url
  },
  about{
    enabled,
    showInquiryForm,
    eyebrow,
    heading,
    description,
    buttonLabel,
    buttonLink,
    "backgroundImage": backgroundImage.asset->url
  },
  gemstones{
    enabled,
    showInquiryForm,
    eyebrow,
    heading,
    description,
    buttonLabel,
    buttonLink,
    "backgroundImage": backgroundImage.asset->url
  },
  gallery{
    enabled,
    showInquiryForm,
    eyebrow,
    heading,
    description,
    buttonLabel,
    buttonLink,
    "backgroundImage": backgroundImage.asset->url
  },
  offers{
    enabled,
    showInquiryForm,
    eyebrow,
    heading,
    description,
    buttonLabel,
    buttonLink,
    "backgroundImage": backgroundImage.asset->url
  },
  book{
    enabled,
    showInquiryForm,
    eyebrow,
    heading,
    description,
    buttonLabel,
    buttonLink,
    "backgroundImage": backgroundImage.asset->url
  }
}
`;

const FOOTER_QUERY = `
*[_type == "footer"][0]{
  subtitle,
  title,
  text,
  phone,
  phoneLabel,
  email
}
`;

const NAVBAR_QUERY = `
*[_type == "navbar"][0]{
  "logoSvgUrl": logoSvg.asset->url
}
`;

const SITE_APPEARANCE_QUERY = `
*[_type == "siteAppearance"][0]{
  "globalBackgroundImage": globalBackgroundImage.asset->url
}
`;

const GOOGLE_PLACES_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

async function fetchFromSanity(query) {
    if (!import.meta.env.VITE_SANITY_PROJECT_ID || !import.meta.env.VITE_SANITY_DATASET) return null;

    try {
        return await sanity.fetch(query);
    } catch {
        return null;
    }
}

function extractPlaceIdFromUrl(url) {
    if (!url || typeof url !== 'string') return '';

    const decodedUrl = decodeURIComponent(url);
    const placeIdParam = decodedUrl.match(/[?&]place_id=([^&]+)/i)?.[1];
    if (placeIdParam) return placeIdParam.trim();

    const bangFormat = decodedUrl.match(/!1s(ChI[^!]+)/);
    if (bangFormat?.[1]) return bangFormat[1].trim();

    return '';
}

async function resolvePlaceIdFromGoogleUrl(sourceUrl) {
    if (!sourceUrl || !GOOGLE_PLACES_API_KEY) return '';

    const fromUrl = extractPlaceIdFromUrl(sourceUrl);
    if (fromUrl) return fromUrl;

    try {
        const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
                'X-Goog-FieldMask': 'places.id'
            },
            body: JSON.stringify({
                textQuery: sourceUrl
            })
        });

        if (!response.ok) return '';

        const payload = await response.json();
        return payload?.places?.[0]?.id || '';
    } catch {
        return '';
    }
}

export async function fetchGooglePlaceReviews(config = {}) {
    const sourceType = config.sourceType === 'google' ? 'google' : 'manual';
    if (sourceType !== 'google' || !GOOGLE_PLACES_API_KEY) return [];

    const fallbackManual = Array.isArray(config.items) ? config.items : [];
    const maxItems = Number.isFinite(config.maxItems) ? Math.max(3, Math.min(20, config.maxItems)) : 9;

    const placeId = (config.googlePlaceId && config.googlePlaceId.trim())
        ? config.googlePlaceId.trim()
        : await resolvePlaceIdFromGoogleUrl(config.sourceUrl);

    if (!placeId) return fallbackManual;

    try {
        const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
            method: 'GET',
            headers: {
                'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
                'X-Goog-FieldMask': 'reviews'
            }
        });

        if (!response.ok) return fallbackManual;
        const payload = await response.json();
        const reviews = Array.isArray(payload?.reviews) ? payload.reviews : [];

        return reviews
            .slice(0, maxItems)
            .map((review) => ({
                author: review?.authorAttribution?.displayName || 'Guest',
                rating: Number.isFinite(review?.rating) ? review.rating : 5,
                text: review?.originalText?.text || review?.text?.text || '',
                dateLabel: review?.relativePublishTimeDescription || ''
            }))
            .filter((item) => item.text);
    } catch {
        return fallbackManual;
    }
}

export async function fetchHomepageContentFromSanity() {
    return fetchFromSanity(HOMEPAGE_QUERY);
}

export async function fetchFooterContentFromSanity() {
    return fetchFromSanity(FOOTER_QUERY);
}

export async function fetchSocialContentFromSanity() {
    return fetchFromSanity(SOCIAL_QUERY);
}

export async function fetchAboutUsContentFromSanity() {
    return fetchFromSanity(ABOUT_US_QUERY);
}

export async function fetchOffersPageContentFromSanity() {
    return fetchFromSanity(OFFERS_PAGE_QUERY);
}

export async function fetchGemstonesPageContentFromSanity() {
    return fetchFromSanity(GEMSTONES_PAGE_QUERY);
}

export async function fetchClientGalleryContentFromSanity() {
    return fetchFromSanity(CLIENT_GALLERY_QUERY);
}

export async function fetchBookingPageContentFromSanity() {
    return fetchFromSanity(BOOKING_PAGE_QUERY);
}

export async function fetchContactFormContentFromSanity() {
    return fetchFromSanity(CONTACT_FORM_QUERY);
}

export async function fetchPageCtaContentFromSanity() {
    return fetchFromSanity(PAGE_CTA_QUERY);
}

export async function fetchNavbarContentFromSanity() {
    return fetchFromSanity(NAVBAR_QUERY);
}

export async function fetchSiteAppearanceContentFromSanity() {
    return fetchFromSanity(SITE_APPEARANCE_QUERY);
}
