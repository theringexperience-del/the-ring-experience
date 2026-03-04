import { access, readFile, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const studioRoot = path.resolve(scriptDir, '..');
const studioIndex = path.join(studioRoot, 'dist', 'index.html');

try {
    await access(studioIndex, constants.F_OK);
} catch {
    throw new Error(`Sanity Studio build output not found: ${studioIndex}`);
}

const html = await readFile(studioIndex, 'utf8');
const normalizedHtml = html
    .replaceAll('src="/static/', 'src="/admin/static/')
    .replaceAll('href="/static/', 'href="/admin/static/');

await writeFile(studioIndex, normalizedHtml, 'utf8');

if (normalizedHtml.includes('src="/static/') || normalizedHtml.includes('href="/static/')) {
    throw new Error('Sanity Studio base path patch failed: found remaining /static/ asset paths.');
}

if (!normalizedHtml.includes('/admin/static/')) {
    throw new Error('Sanity Studio base path patch failed: /admin/static/ was not found.');
}
