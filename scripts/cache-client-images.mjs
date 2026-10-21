import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { clientFallbacks } from '../src/content/clientFallback.js';

// Sanity asset URLs are immutable: cache each exact photo, never a substitute.
const snapshot = JSON.parse(await readFile('dist/cms-snapshot.json', 'utf8'));
const urls = [...new Set(JSON.stringify([snapshot, clientFallbacks]).match(/https:\/\/cdn\.sanity\.io\/images\/[^"\s]+/g))];
const originals = new Map();
for (const name of await readdir('public/uploads')) {
  if (!name.endsWith('.webp')) continue;
  const bytes = await readFile(`public/uploads/${name}`);
  originals.set(createHash('sha1').update(bytes).digest('hex'), `/uploads/${name}`);
}
await mkdir('public/uploads/cms-fallback', { recursive: true });
const images = {};
for (const source of urls) {
  const url = new URL(source);
  const hash = url.pathname.split('/').at(-1).split('-')[0];
  const key = `${url.origin}${url.pathname}`;
  if (originals.has(hash)) {
    images[key] = originals.get(hash);
    continue;
  }
  const local = `/uploads/cms-fallback/${hash}.webp`;
  url.search = '?fm=webp&fit=max&w=1600&q=80';
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw Error(`Image download failed: ${response.status} ${key}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WEBP') throw Error(`Not a WebP: ${key}`);
  await writeFile(`public${local}`, bytes);
  images[key] = local;
}
await writeFile('src/content/clientImages.json', JSON.stringify(images, null, 2) + '\n');
console.log(`Cached ${Object.keys(images).length} exact CMS photographs as local WebP assets.`);
