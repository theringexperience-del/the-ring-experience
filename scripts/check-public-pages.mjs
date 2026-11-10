import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const dist = new URL('../dist/', import.meta.url);
const { JOURNAL_POSTS_QUERY: journalPosts } = JSON.parse(await readFile(new URL('cms-snapshot.json', dist), 'utf8'));
const sitemap = await readFile(new URL('sitemap.xml', dist), 'utf8');
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.equal(new Set(locations).size, locations.length, 'Sitemap must not repeat URLs');
const seenTitles = new Map();
for (const location of locations) {
  const { pathname } = new URL(location);
  const file = new URL(pathname === '/' ? 'index.html' : `.${pathname}index.html`, dist);
  const html = await readFile(file, 'utf8');
  const pageTitle = html.match(/<title[^>]*>([^<]+)<\/title>/)?.[1] ?? '';
  assert.ok(!seenTitles.has(pageTitle), `${pathname} repeats the SEO title of ${seenTitles.get(pageTitle)}`);
  seenTitles.set(pageTitle, pathname);
  assert.ok(pageTitle.length > 0 && pageTitle.length <= 60, `${pathname} title must be descriptive and no longer than 60 characters (got ${pageTitle.length})`);
  if (['/gallery/', '/gemstones/', '/furnace/'].includes(pathname)) {
    const headingLevels = [...html.matchAll(/<h([1-6])(?:\s|>)/g)].map(match => Number(match[1]));
    assert.ok(!headingLevels.some((level, index) => index > 0 && level > headingLevels[index - 1] + 1), `${pathname} must not skip heading levels`);
  }
  assert.ok(!html.includes('/src/assets/'), `${pathname} must use built asset URLs`);
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${pathname} needs one initial H1`);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, `${pathname} needs one canonical`);
  assert.ok(html.includes(`href="${location}"`), `${pathname} canonical should match sitemap`);
  assert.ok(/<meta[^>]*name="description" content="[^"]+"/.test(html), `${pathname} needs a description`);
  for (const match of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) JSON.parse(match[1]);
}
const missing = await readFile(new URL('404.html', dist), 'utf8');
assert.ok(missing.includes('name="robots" content="noindex, follow"'), 'Missing pages must be noindex');
assert.ok(missing.includes('Explore ring-making workshops'), '404 must help visitors find real pages');
const home = await readFile(new URL('index.html', dist), 'utf8');
assert.ok(home.includes('Make Your Own Ring in Negombo, Sri Lanka'), 'Homepage must expose its descriptive H1 in static HTML');
// Google must be able to discover important workshop pages through real HTML links, not only the sitemap.
for (const path of ['/ring-making-guide/', '/gemstones/', '/design-your-ring/', '/custom-jewellery-sri-lanka/', '/faq/', '/gallery/']) {
  assert.ok(home.includes(`href="${path}"`), `Homepage must link to ${path} in its static HTML`);
}
const offersPage = await readFile(new URL('ouroffers/index.html', dist), 'utf8');
assert.ok(offersPage.includes('Make your own ring in Negombo, Sri Lanka'), 'Offers page must expose location-specific workshop text');
assert.ok(offersPage.includes('href="/ring-making-guide"'), 'Offers page must link to the beginner guide');
for (const pathname of ['/ring-making-guide', '/things-to-do-in-negombo', '/bookexperience']) {
  assert.ok(locations.some(location => new URL(location).pathname === `${pathname}/`), pathname + ' must appear in the sitemap');
}
const faq = await readFile(new URL('faq/index.html', dist), 'utf8');
assert.ok(faq.includes('wedding rings or marriage bands'), 'Wedding questions need to exist before JavaScript');
assert.ok(faq.includes('63/1 Porutota Road'), 'Visit answers need the studio address');
const offers = await readFile(new URL('ouroffers/index.html', dist), 'utf8');
assert.ok(offers.includes('The Essential') && offers.includes('Signature Gem Discovery') && offers.includes('The Ceremony'), 'All current workshop options must be readable');
const feed = await readFile(new URL('journal/feed.xml', dist), 'utf8');
assert.equal((feed.match(/<item>/g) || []).length, journalPosts.length, 'Feed should include every journal article');
for (const post of journalPosts) {
  assert.ok(post.sections.length && post.description && post.published, `${post.slug} must be complete`);
  for (const related of post.related || []) assert.ok(journalPosts.some(candidate => candidate.slug === related), `${post.slug} has a broken related article`);
}
console.log(`SEO checks passed: ${locations.length} pages, ${journalPosts.length} articles, canonical URLs, JSON-LD and journal feed.`);
