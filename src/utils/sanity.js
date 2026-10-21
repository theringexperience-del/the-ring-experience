import { createClient } from '@sanity/client';
import { withClientFallback } from './contentFallback.js';
import clientImages from '../content/clientImages.json';
import * as contentQueries from './sanityQueries.js';
import { HOMEPAGE_QUERY, SOCIAL_QUERY, ABOUT_US_QUERY, OFFERS_PAGE_QUERY, GEMSTONES_PAGE_QUERY, CLIENT_GALLERY_QUERY, BOOKING_PAGE_QUERY, FAQ_PAGE_QUERY, CONTACT_FORM_QUERY, PAGE_CTA_QUERY, FOOTER_QUERY, NAVBAR_QUERY, SITE_APPEARANCE_QUERY } from './sanityQueries.js';

const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID;
const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET;
const SANITY_API_VERSION = import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01';
const SANITY_USE_CDN = String(import.meta.env.VITE_SANITY_USE_CDN || 'false').toLowerCase() === 'true';

export const sanity = SANITY_PROJECT_ID && SANITY_DATASET ? createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    apiVersion: SANITY_API_VERSION,
    useCdn: SANITY_USE_CDN
}) : null;

export function toWebImage(url, options = {}) {
    if (!url || typeof url !== 'string') return '';

    const width = Number.isFinite(options.width) ? options.width : 1600;
    const quality = Number.isFinite(options.quality) ? options.quality : 80;
    if (!/^https?:\/\//i.test(url)) return url.replace(/\.(?:png|jpe?g)(?=[?#]|$)/i, '.webp');
    const image = new URL(url);
    const localImage = clientImages[`${image.origin}${image.pathname}`];
    if (localImage) return localImage;
    if (image.hostname !== 'cdn.sanity.io' || /\.svg$/i.test(image.pathname)) return url;
    image.searchParams.delete('auto');
    image.searchParams.set('fm', 'webp');
    image.searchParams.set('fit', 'max');
    image.searchParams.set('w', width);
    image.searchParams.set('q', quality);
    return image.href;
}

export function optimizeImageSource(url, options = {}) {
    if (!url || typeof url !== 'string') return '';
    return toWebImage(url, options);
}

export function toImageSrcSet(url, widths = [], options = {}) {
    if (!url || typeof url !== 'string' || !/^https?:\/\//i.test(url)) return '';
    if (toWebImage(url, options).startsWith('/uploads/')) return '';

    return widths
        .filter((width) => Number.isFinite(width) && width > 0)
        .map((width) => `${toWebImage(url, { ...options, width })} ${width}w`)
        .join(', ');
}

const contentRequests = new Map();
let bootstrap;
export function initialContent(type) {
    if (typeof document === 'undefined') return withClientFallback(type, globalThis.__CMS_CONTENT__?.[type]);
    if (!bootstrap) {
        try { bootstrap = JSON.parse(document.getElementById('cms-bootstrap')?.textContent || '{}'); }
        catch { bootstrap = {}; }
    }
    return withClientFallback(type, bootstrap[type]);
}
export function fetchContentByType(type) {
    if (!Object.hasOwn(contentQueries, type)) throw new Error('Unknown content type');
    return fetchFromSanity(contentQueries[type]);
}
function fetchFromSanity(query) {
    const type = Object.entries(contentQueries).find(([, value]) => value === query)?.[0];
    if (!contentRequests.has(query)) {
        contentRequests.set(query, loadContent(query).then(result => {
            if (result === null) contentRequests.delete(query);
            return withClientFallback(type, result);
        }));
    }
    return contentRequests.get(query);
}

async function loadContent(query) {
    try {
        const type = Object.entries(contentQueries).find(([, value]) => value === query)?.[0];
        if (type) {
            try {
                const response = await fetch(`/api/content?type=${encodeURIComponent(type)}`, { signal: AbortSignal.timeout(5000) });
                if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
                    return (await response.json()).result ?? null;
                }
            } catch {
                // Local previews and static hosts do not serve Pages Functions.
            }
        }
        // Vite development does not serve Pages Functions.
        return sanity ? await sanity.fetch(query, {}, { signal: AbortSignal.timeout(8000) }) : null;
    } catch (error) {
        const message = error?.message || String(error);
        console.warn(`[sanity] Fetch failed (${SANITY_PROJECT_ID}/${SANITY_DATASET}): ${message}`);
        return null;
    }
}

export async function fetchGooglePlaceReviews(config = {}) {
    const sourceType = config.sourceType === 'google' ? 'google' : 'manual';
    if (sourceType !== 'google') return [];

    const maxItems = Number.isFinite(config.maxItems) ? Math.max(3, Math.min(20, config.maxItems)) : 9;

    try {
        const response = await fetch(`/api/google-reviews?maxItems=${encodeURIComponent(maxItems)}`);

        if (!response.ok) return [];
        const payload = await response.json();
        const reviews = Array.isArray(payload?.reviews) ? payload.reviews : [];

        return reviews
            .slice(0, maxItems)
            .filter((item) => item.text);
    } catch {
        return [];
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

export async function fetchFaqPageContentFromSanity() {
    return fetchFromSanity(FAQ_PAGE_QUERY);
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

