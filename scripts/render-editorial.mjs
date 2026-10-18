import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { journalPosts } from '../src/content/journal.js';

const dist = new URL('../dist/', import.meta.url);
const template = await readFile(new URL('index.html', dist), 'utf8');
const siteUrl = 'https://www.theringexperience.lk';
const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);

const articleBody = (post) => `
<main style="max-width:780px;margin:7rem auto 5rem;padding:0 1.5rem;font:1.1rem/1.8 Georgia,serif;color:#38291f">
  <a href="/journal">← The Journal</a>
  <p>${escape(post.category)} · ${escape(post.readingTime)}</p>
  <h1 style="font-size:clamp(2.5rem,6vw,4.5rem);line-height:1.15">${escape(post.title)}</h1>
  <p>${escape(post.intro)}</p>
  ${post.sections.map((section) => `<section><h2>${escape(section.heading)}</h2>${section.paragraphs.map((paragraph) => `<p>${escape(paragraph)}</p>`).join('')}${section.source ? `<p><a href="${escape(section.source.href)}">Source: ${escape(section.source.label)}</a></p>` : ''}</section>`).join('')}
  <p><a href="/bookexperience">Check workshop availability</a> · <a href="/ring-making-guide">Visitor guide</a></p>
</main>`;

const indexBody = `<main style="max-width:1000px;margin:7rem auto 5rem;padding:0 1.5rem;font:1.1rem/1.8 Georgia,serif;color:#38291f">
  <h1 style="font-size:clamp(3rem,7vw,5rem)">The Journal</h1>
  <p>Practical notes on silver, gold and making jewellery in Sri Lanka.</p>
  ${journalPosts.map((post) => `<article><h2><a href="/journal/${escape(post.slug)}">${escape(post.title)}</a></h2><p>${escape(post.description)}</p></article>`).join('')}
</main>`;

const page = ({ title, description, path, body, schema }) => {
  const url = `${siteUrl}${path}`;
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escape(description)}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escape(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escape(description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escape(title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${escape(description)}" />`)
    .replace('<div id="app"></div>', `<div id="app">${body}</div>`)
    .replace('</head>', `<link rel="canonical" href="${url}" />${schema ? `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>` : ''}</head>`);
  return html;
};

const writeRoute = async (path, html) => {
  const dir = new URL(`.${path}/`, dist);
  await mkdir(dir, { recursive: true });
  await writeFile(new URL('index.html', dir), html);
};

await writeRoute('/journal', page({
  title: 'Jewellery Making Journal | The Ring Experience Sri Lanka',
  description: 'Practical guides to silver rings, gold choices and a hands-on jewellery-making experience in Negombo, Sri Lanka.',
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
