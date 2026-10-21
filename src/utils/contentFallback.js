import { clientFallbacks } from '../content/clientFallback.js';
function fillMissing(fallback, value) {
  if (value === null || value === undefined) return fallback;
  if (fallback && value && typeof fallback === 'object' && typeof value === 'object' && !Array.isArray(fallback) && !Array.isArray(value)) {
    return Object.fromEntries([...new Set([...Object.keys(fallback), ...Object.keys(value)])].map(key => [key, fillMissing(fallback[key], value[key])]));
  }
  return value;
}
export const withClientFallback = (type, value) => fillMissing(clientFallbacks[type], value) ?? null;
export function useClientImage(event, fallback) {
  const image = event.target;
  if (!fallback || !image) return;
  const url = new URL(fallback, image.ownerDocument.baseURI).href;
  if (image.src === url) return;
  image.removeAttribute('srcset');
  image.src = url;
}
