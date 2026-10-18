import * as queries from '../../src/utils/sanityQueries.js';

export async function onRequestGet({ request }) {
  const type = new URL(request.url).searchParams.get('type');
  const query = Object.hasOwn(queries, type) ? queries[type] : null;
  if (!query) return new Response('Unknown content type', { status: 400 });

  const endpoint = new URL('https://a65qlod9.apicdn.sanity.io/v2026-02-26/data/query/production');
  endpoint.searchParams.set('query', query);
  endpoint.searchParams.set('returnQuery', 'false');

  try {
    const upstream = await fetch(endpoint, { cf: { cacheEverything: true, cacheTtl: 300 } });
    if (!upstream.ok) return new Response('Content temporarily unavailable', { status: 502 });
    const payload = await upstream.json();
    return new Response(JSON.stringify({ result: payload.result ?? null }), {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=60, s-maxage=300',
      },
    });
  } catch {
    return new Response('Content temporarily unavailable', { status: 502 });
  }
}
