import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { journalPosts } from '../src/content/journal.js';
import { getCmsPages } from './render-cms-pages.mjs';
import { sitePages } from '../src/content/sitePages.js';
import { BUSINESS_SCHEMA, GOOGLE_MAPS_URL } from '../src/utils/businessProfile.js';

const dist = new URL('../dist/', import.meta.url);
const template = await readFile(new URL('index.html', dist), 'utf8');
const siteUrl = 'https://www.theringexperience.lk';
const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);

const cmsPages = await getCmsPages(escape);
const allPages = [...sitePages, ...cmsPages];

const articleBody = (post) => `
<main style="max-width:780px;margin:7rem auto 5rem;padding:0 1.5rem;font:1.1rem/1.8 Georgia,serif;color:#38291f">
  <a href="/journal">← The Journal</a>
  <p>${escape(post.category)} · ${escape(post.readingTime)}</p><p>By The Ring Experience · Published ${escape(post.published)}</p>
  <h1 style="font-size:clamp(2.5rem,6vw,4.5rem);line-height:1.15">${escape(post.title)}</h1>
  <p>${escape(post.intro)}</p>
  ${post.sections.map((section) => `<section><h2>${escape(section.heading)}</h2>${section.paragraphs.map((paragraph) => `<p>${escape(paragraph)}</p>`).join('')}${section.source ? `<p><a href="${escape(section.source.href)}">Source: ${escape(section.source.label)}</a></p>` : ''}</section>`).join('')}
  <p><a href="/bookexperience">Check workshop availability</a> · <a href="/ring-making-guide">Visitor guide</a></p>
</main>`;

const indexBody = `<main style="max-width:1000px;margin:7rem auto 5rem;padding:0 1.5rem;font:1.1rem/1.8 Georgia,serif;color:#38291f">
  <h1 style="font-size:clamp(3rem,7vw,5rem)">The Journal</h1>
  <p>Clear answers about silver, gold, gemstones, wedding and engagement rings, and making jewellery in Sri Lanka.</p>
  ${journalPosts.map((post) => `<article><h2><a href="/journal/${escape(post.slug)}">${escape(post.title)}</a></h2><p>${escape(post.description)}</p></article>`).join('')}
</main>`;

const page = ({ title, description, path, body, schema }) => {
  const url = `${siteUrl}${path}`;
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escape(description)}" />`)
    .replace(/<meta property="og:type" content="[^"]*"\s*\/>/, `<meta property="og:type" content="${schema?.['@type'] === 'BlogPosting' ? 'article' : 'website'}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escape(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escape(description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escape(title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${escape(description)}" />`)
    .replace('<div id="app"></div>', `<div id="app">${body}</div>`)
    .replace(/<meta (?=(?:name="(?:description|robots|twitter:[^"]+)"|property="og:[^"]+"))/g, '<meta data-prerender-seo ')
    .replace('</head>', `<link data-prerender-seo rel="canonical" href="${url}" /><link data-prerender-seo rel="alternate" type="application/rss+xml" title="The Ring Experience Journal" href="${siteUrl}/journal/feed.xml" />${schema ? `<script id="prerender-page-jsonld" type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>` : ''}</head>`);
  return html;
};

const writeRoute = async (path, html) => {
  const dir = path === '/' ? dist : new URL(`.${path}/`, dist);
  await mkdir(dir, { recursive: true });
  await writeFile(new URL('index.html', dir), html);
};

await writeRoute('/journal', page({
  title: 'Jewellery Making Journal | The Ring Experience Sri Lanka',
  description: 'Guides to silver, gold, gemstones, wedding and engagement rings, and hands-on jewellery making in Negombo, Sri Lanka.',
  path: '/journal', body: indexBody,
}));

for (const post of journalPosts) {
  const path = `/journal/${post.slug}`;
  await writeRoute(path, page({
    title: `${post.title} | The Ring Experience`, description: post.description, path,
    body: articleBody(post),
    schema: {
      '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title,
      description: post.description, datePublished: post.published,
      author: { '@type': 'Organization', name: 'The Ring Experience', url: siteUrl },
      publisher: { '@type': 'Organization', name: 'The Ring Experience', url: siteUrl },
      mainEntityOfPage: `${siteUrl}${path}`,
    },
  }));
}

for (const entry of allPages) {
  const body = `<main style="max-width:1000px;margin:5rem auto;padding:0 1.5rem;font:1.1rem/1.8 Georgia,serif;color:#38291f"><nav><a href="/">The Ring Experience</a> · <a href="/ouroffers">Workshops</a> · <a href="/design-your-ring">Customise</a> · <a href="/journal">Journal</a></nav>${entry.body}<footer><p>The Ring Experience · 63/1 Porutota Road, Negombo 11500, Sri Lanka</p><p><a href="${GOOGLE_MAPS_URL}">Google Maps, reviews and directions</a> · <a href="tel:+94769012344">+94 76 901 2344</a></p></footer></main>`;
  await writeRoute(entry.path, page({ ...entry, body, schema: BUSINESS_SCHEMA }));
}

// Derive discovery files from the pages actually emitted by this build.
const urls = [...allPages.map(entry => entry.path), '/journal', ...journalPosts.map(post => `/journal/${post.slug}`)];
await writeFile(new URL('sitemap.xml', dist), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(path => `<url><loc>${siteUrl}${escape(path)}</loc></url>`).join('')}</urlset>`);
await writeFile(new URL('journal/feed.xml', dist), `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title>The Ring Experience Journal</title><link>${siteUrl}/journal</link><description>Jewellery-making guides from Negombo, Sri Lanka</description><language>en</language>${journalPosts.map(post => `<item><title>${escape(post.title)}</title><link>${siteUrl}/journal/${post.slug}</link><guid>${siteUrl}/journal/${post.slug}</guid><description>${escape(post.description)}</description><pubDate>${new Date(post.published + 'T12:00:00+05:30').toUTCString()}</pubDate></item>`).join('')}</channel></rss>`);
console.log(`Published ${urls.length} readable pages and ${journalPosts.length} journal entries.`);
