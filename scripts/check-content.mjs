import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { withClientFallback } from '../src/utils/contentFallback.js';
import { clientFallbacks } from '../src/content/clientFallback.js';
import clientImages from '../src/content/clientImages.json' with { type: 'json' };
import { readFile } from 'node:fs/promises';
const edited={packages:[{key:'essential',tag:'New CMS price',isVisible:false}],pricingExplanation:''};
const resolved=withClientFallback('OFFERS_PAGE_QUERY',edited);
assert.deepEqual(resolved.packages,edited.packages,'CMS package changes and visibility take precedence');
assert.equal(resolved.pricingExplanation,'','An intentionally empty CMS field stays empty');
assert.equal(withClientFallback('HOMEPAGE_QUERY',{hero:{image:null}}).hero.image,'/uploads/negombo-workshop-hero.webp','Missing CMS photos use the original local client photo');
assert.equal(withClientFallback('OFFERS_PAGE_QUERY',null).packages[0].tag,clientFallbacks.OFFERS_PAGE_QUERY.packages[0].tag);

const server = await createServer({ configFile: false, envFile: false, optimizeDeps: { noDiscovery: true, entries: [] }, server: { middlewareMode: true } });
const originalFetch = globalThis.fetch;
try {
  const content = await server.ssrLoadModule('/src/utils/sanity.js');
  assert.equal(content.sanity, null, 'Missing CMS configuration must not crash startup');
  assert.equal(content.toWebImage('/uploads/photo.jpeg'), '/uploads/photo.webp');
  for (const [source, local] of Object.entries(clientImages)) {
    assert.equal(content.toWebImage(source), local, 'Known CMS photos use their exact local copy');
    assert.equal(content.toImageSrcSet(source, [480, 900]), '', 'Local copies do not request remote srcsets');
    const bytes = await readFile(`public${local}`);
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
  }
  const image = new URL(content.toWebImage('https://cdn.sanity.io/images/project/production/photo.jpg?auto=format&w=400', { width: 900 }));
  assert.equal(image.searchParams.get('fm'), 'webp');
  assert.equal(image.searchParams.get('w'), '900');
  assert.equal(image.searchParams.has('auto'), false);
  assert.equal(content.toWebImage('https://example.com/logo.svg'), 'https://example.com/logo.svg');
  let requests = 0;
  globalThis.fetch = async () => { requests++; return Response.json({ result: { heading: 'Workshop' } }); };
  const results = await Promise.all([content.fetchHomepageContentFromSanity(), content.fetchHomepageContentFromSanity()]);
  assert.equal(requests, 1, 'Shared CMS requests must be deduplicated');
  assert.deepEqual(results.map(result=>result.heading),['Workshop','Workshop']);
  globalThis.fetch = async () => new Response('<!doctype html>', { headers: { 'content-type': 'text/html' } });
  assert.deepEqual(await content.fetchSocialContentFromSanity(),clientFallbacks.SOCIAL_QUERY,'CMS failure keeps the original client content');
  globalThis.fetch = async () => Response.json({ result: { heading: 'Recovered' } });
  assert.equal((await content.fetchSocialContentFromSanity()).heading,'Recovered','CMS content recovers after a failed request');
  console.log('Content checks passed: CMS precedence, original client fallback, local WebP photos, request deduplication and recovery.');
} finally {
  globalThis.fetch = originalFetch;
  await server.close();
}
