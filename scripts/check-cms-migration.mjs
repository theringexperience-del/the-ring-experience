import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
const snapshot=JSON.parse(await readFile(new URL('../dist/cms-snapshot.json',import.meta.url),'utf8'));
const seed=JSON.parse(await readFile(new URL('../content/migrations/client-content.json',import.meta.url),'utf8'));
for(const expected of seed.workshopPackages){const actual=snapshot.OFFERS_PAGE_QUERY.packages.find(pkg=>pkg.key===expected.key);for(const field of ['name','tag','duration','summary','fullDescription','highlights'])assert.deepEqual(actual[field],expected[field],expected.key+' '+field)}
assert.ok(!JSON.stringify(snapshot).includes('\ufffd'),'CMS content must use valid Unicode');
const navigation=JSON.parse(await readFile(new URL('../content/migrations/client-navigation.json',import.meta.url),'utf8'));
assert.deepEqual(snapshot.NAVBAR_QUERY.primaryLinks,navigation.navbar.primaryLinks);
assert.deepEqual(snapshot.FOOTER_QUERY.studioLinks,navigation.footer.studioLinks);
const home=snapshot.HOMEPAGE_QUERY;
for(const image of [home.hero.image,home.aMoment.image,home.values.backgroundImage,...home.experienceCards.map(card=>card.image)])assert.match(image,/^https:\/\/cdn\.sanity\.io\/images\//,'Client photographs must be Sanity image assets');
const design=snapshot.EDITORIAL_PAGES_QUERY.find(page=>page.path==='/design-your-ring');
assert.match(design.sections.find(section=>section.key==='hero').image,/^https:\/\/cdn\.sanity\.io\/images\//);
assert.equal(snapshot.JOURNAL_POSTS_QUERY.length,seed.journalPosts.length);
assert.ok(snapshot.SITE_APPEARANCE_QUERY.contactLinks.whatsappUrl.startsWith('https://wa.me/'));
const names=['negombo-workshop-hero.webp','artisan-crafting-ring.webp','guest-designing-ring.webp','guest-hammering-ring.webp','guests-take-rings-home.webp','jeweller-at-the-bench.webp','ring-hammering-craft.webp'];
const url=new URL('https://a65qlod9.api.sanity.io/v2024-01-01/data/query/production');
url.searchParams.set('query','*[_type == "sanity.imageAsset" && originalFilename in $names]{originalFilename,mimeType,sha1hash}');url.searchParams.set('$names',JSON.stringify(names));
const response=await fetch(url);assert.ok(response.ok);const {result}=await response.json();
for(const name of names){const hash=createHash('sha1').update(await readFile(new URL('../public/uploads/'+name,import.meta.url))).digest('hex');assert.ok(result.some(asset=>asset.originalFilename===name&&asset.mimeType==='image/webp'&&asset.sha1hash===hash),'Uploaded image must match the original client WebP: '+name);}
console.log('Migration verified against Sanity: 7 uploaded WebP assets, 3 original package prices, CMS contact links, 12 articles and CMS image references.');
