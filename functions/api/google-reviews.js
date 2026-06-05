const jsonResponse = (payload, status = 200, headers = {}) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      ...headers,
    },
  });

const toPositiveLimit = (value) => {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return 9;
  return Math.max(3, Math.min(20, parsed));
};

const normalizeReview = (review) => ({
  author: review?.authorAttribution?.displayName || 'Guest',
  rating: Number.isFinite(review?.rating) ? review.rating : 5,
  text: review?.originalText?.text || review?.text?.text || '',
  dateLabel: review?.relativePublishTimeDescription || '',
});

export async function onRequestGet(context) {
  const { request, env } = context;
  const apiKey = env.GOOGLE_PLACES_API_KEY;
  const placeId = env.GOOGLE_PLACES_PLACE_ID;
  const maxItems = toPositiveLimit(new URL(request.url).searchParams.get('maxItems'));

  if (!apiKey || !placeId) {
    return jsonResponse({ reviews: [] }, 200, {
      'cache-control': 'no-store',
    });
  }

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'reviews',
      },
      cf: {
        cacheEverything: true,
        cacheTtl: 43200,
      },
    });

    if (!response.ok) {
      return jsonResponse({ reviews: [] }, 200, {
        'cache-control': 'no-store',
      });
    }

    const payload = await response.json();
    const reviews = (Array.isArray(payload?.reviews) ? payload.reviews : [])
      .slice(0, maxItems)
      .map(normalizeReview)
      .filter((review) => review.text);

    return jsonResponse({ reviews }, 200, {
      'cache-control': 'public, max-age=900, s-maxage=43200',
    });
  } catch {
    return jsonResponse({ reviews: [] }, 200, {
      'cache-control': 'no-store',
    });
  }
}
