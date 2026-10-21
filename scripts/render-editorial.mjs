import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { loadEnv, createServer } from 'vite';
import { createSSRApp } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { createHead, renderSSRHead } from '@unhead/vue/server';
import { withClientFallback } from '../src/utils/contentFallback.js';
import * as queries from '../src/utils/sanityQueries.js';
const env = { ...loadEnv('production',process.cwd(),'VITE_'), ...process.env };

const snapshot=Object.fromEntries(await Promise.all(Object.entries(queries).map(async([key,query])=>{
 try {
  if(!env.VITE_SANITY_PROJECT_ID || !env.VITE_SANITY_DATASET) throw Error('CMS environment is missing');
  const url=new URL(`https://${env.VITE_SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${env.VITE_SANITY_DATASET}`);
  url.searchParams.set('query',query);url.searchParams.set('perspective','published');
  const response=await fetch(url,{signal:AbortSignal.timeout(30000)});
  if(!response.ok)throw Error('CMS response '+response.status);
  return [key,withClientFallback(key,(await response.json()).result)];
 } catch(error) {
  console.warn('[cms] '+key+': '+error.message+'. Using original client fallback content.');
  return [key,withClientFallback(key,null)];
 }
})));
const posts=snapshot.JOURNAL_POSTS_QUERY;
if(!Array.isArray(posts)||!posts.length)throw Error('Publish journal articles in Sanity before building.');
const dist=new URL('../dist/',import.meta.url);
await writeFile(new URL('cms-snapshot.json',dist),JSON.stringify(snapshot));
globalThis.__CMS_CONTENT__=snapshot;
const template=await readFile(new URL('index.html',dist),'utf8');
const manifest=JSON.parse(await readFile(new URL('.vite/ssr-manifest.json',dist),'utf8'));
const server=await createServer({server:{middlewareMode:true},appType:'custom',optimizeDeps:{noDiscovery:true,entries:[]}});
const siteUrl='https://www.theringexperience.lk';
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
try {
 const {default:App}=await server.ssrLoadModule('/src/App.vue');
 const {default:router}=await server.ssrLoadModule('/src/router.js');
 const routes=[...router.getRoutes().map(r=>r.path).filter(p=>!p.includes(':')),...posts.map(p=>'/journal/'+p.slug)];
 for(const route of routes){
  await router.push(route);await router.isReady();
  const app=createSSRApp(App),head=createHead();app.use(router);app.use(head);
  const context={};let body=await renderToString(app,context);
  for (const [id, files] of Object.entries(manifest)) {
    if (!id.startsWith('src/assets/')) continue;
    const extension=id.slice(id.lastIndexOf('.'));
    const asset=files.find(file=>file.endsWith(extension));
    if(asset) body=body.replaceAll('/'+id,asset);
  }
  const {headTags}=await renderSSRHead(head);
  const css=new Set([...context.modules||[]].flatMap(id=>manifest[id]||[]).filter(file=>file.endsWith('.css')));
  const html=template.replace(/<title>[^<]*<\/title>/g,'').replace(/<meta\s+(?:name="(?:description|robots|twitter:[^"]+)"|property="og:[^"]+")[^>]*>/g,'')
   .replace('<div id="app"></div>',`<div id="app">${body}</div>`)
   .replace('</head>',`${headTags.replace(/<(meta|link|script)\b/g,'<$1 data-prerender-seo')}\n${[...css].map(file=>`<link rel="stylesheet" href="${file.startsWith('/')?file:'/'+file}">`).join('')}\n<script id="cms-bootstrap" type="application/json">${JSON.stringify(snapshot).replace(/</g,'\\u003c')}</script></head>`);
  const dir=route==='/'?dist:new URL('.'+route+'/',dist);await mkdir(dir,{recursive:true});await writeFile(new URL('index.html',dir),html);
 }
 await writeFile(new URL('sitemap.xml',dist),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(p=>`<url><loc>${siteUrl}${escape(p)}</loc></url>`).join('')}</urlset>`);
 await mkdir(new URL('journal/',dist),{recursive:true});
 await writeFile(new URL('journal/feed.xml',dist),`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>The Ring Experience Journal</title><link>${siteUrl}/journal</link><description>Jewellery-making guides from Negombo, Sri Lanka</description><language>en</language>${posts.map(post=>`<item><title>${escape(post.title)}</title><link>${siteUrl}/journal/${escape(post.slug)}</link><guid>${siteUrl}/journal/${escape(post.slug)}</guid><description>${escape(post.description)}</description><pubDate>${new Date(post.published+'T12:00:00+05:30').toUTCString()}</pubDate></item>`).join('')}</channel></rss>`);
 console.log(`Rendered ${routes.length} pages from Vue templates and published CMS content.`);
} finally {await server.close();delete globalThis.__CMS_CONTENT__;}
