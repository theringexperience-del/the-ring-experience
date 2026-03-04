import { access, cp, mkdir, readFile, rm } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';

const rootDist = path.resolve('dist');
const studioDist = path.resolve('studio', 'dist');
const adminDist = path.resolve('dist', 'admin');
const studioIndex = path.join(studioDist, 'index.html');
const adminIndex = path.join(adminDist, 'index.html');

async function exists(targetPath) {
    try {
        await access(targetPath, constants.F_OK);
        return true;
    } catch {
        return false;
    }
}

if (!(await exists(studioDist))) {
    throw new Error(`Sanity Studio build folder not found: ${studioDist}`);
}

if (!(await exists(studioIndex))) {
    throw new Error(`Sanity Studio build is missing index.html: ${studioIndex}`);
}

const studioIndexHtml = await readFile(studioIndex, 'utf8');
if (studioIndexHtml.includes('src="/static/') || studioIndexHtml.includes('href="/static/')) {
    throw new Error('Sanity Studio build has invalid absolute /static paths. Expected /admin/static/ paths.');
}
if (!studioIndexHtml.includes('/admin/static/')) {
    throw new Error('Sanity Studio build does not include /admin/static/ asset paths.');
}

await mkdir(rootDist, { recursive: true });
await rm(adminDist, { recursive: true, force: true });
await mkdir(adminDist, { recursive: true });
await cp(studioDist, adminDist, { recursive: true, force: true });

if (!(await exists(adminIndex))) {
    throw new Error(`Copy failed: missing ${adminIndex}`);
}
