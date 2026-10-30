import { clientFallbacks } from '../content/clientFallback.js';
import { currentWorkshopPackages } from '../content/workshopPackages.js';
import { mergeWorkshopFaqs } from '../content/workshopFaqs.js';
function fillMissing(fallback, value) {
  if (value === null || value === undefined) return fallback;
  if (fallback && value && typeof fallback === 'object' && typeof value === 'object' && !Array.isArray(fallback) && !Array.isArray(value)) {
    return Object.fromEntries([...new Set([...Object.keys(fallback), ...Object.keys(value)])].map(key => [key, fillMissing(fallback[key], value[key])]));
  }
  return value;
}
export const withClientFallback = (type, value) => {
  const content = fillMissing(clientFallbacks[type], value);
  if (type === 'OFFERS_PAGE_QUERY' && content) return { ...content, packages: currentWorkshopPackages(content.packages) };
  if (type === 'FAQ_PAGE_QUERY' && content) return { ...content, items: mergeWorkshopFaqs(content.items) };
  return content ?? null;
};
export function useClientImage(event, fallback) {
  const image = event.target;
  if (!fallback || !image) return;
  const url = new URL(fallback, image.ownerDocument.baseURI).href;
  if (image.src === url) return;
  image.removeAttribute('srcset');
  image.src = url;
}
