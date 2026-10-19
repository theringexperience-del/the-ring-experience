import { loadEnv } from 'vite';
import { mergeWorkshopFaqs } from '../src/content/workshopFaqs.js';
import * as queries from '../src/utils/sanityQueries.js';

export async function getCmsPages(escape) {
  const env = { ...loadEnv('production', process.cwd(), 'VITE_'), ...process.env };
  const project = env.VITE_SANITY_PROJECT_ID;
  const dataset = env.VITE_SANITY_DATASET;
  const get = async (key) => {
    if (!project || !dataset) throw new Error('CMS project and dataset are required to build public pages.');
    const url = `https://${project}.api.sanity.io/v2024-01-01/data/query/${dataset}?perspective=published&query=${encodeURIComponent(queries[key])}`;
    const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`Public CMS snapshot failed for ${key}: ${response.status}`);
    const { result } = await response.json();
    if (!result) throw new Error(`No published CMS content for ${key}`);
    return result;
  };
  const [offers, faq, stones, about, gallery] = await Promise.all([
    get('OFFERS_PAGE_QUERY'), get('FAQ_PAGE_QUERY'), get('GEMSTONES_PAGE_QUERY'),
    get('ABOUT_US_QUERY'), get('CLIENT_GALLERY_QUERY'),
  ]);
  const paragraphs = (value) => String(value || '').split(/\n\s*\n/).filter(Boolean).map(text => `<p>${escape(text)}</p>`).join('');
  const visible = (items) => (items || []).filter(item => item?.isVisible !== false);
  const faqItems = mergeWorkshopFaqs(faq.items);
  return [
    {
      path: '/ouroffers', title: 'Jewellery & Ring-Making Workshops in Negombo | The Ring Experience',
      description: 'Compare private ring-making workshops in Negombo, Sri Lanka. Choose a session for beginners, couples, wedding bands or a personal custom ring.',
      body: `<h1>${escape(offers.packagesSection?.heading || 'Ring-making workshops in Negombo')}</h1>${paragraphs(offers.packagesSection?.description)}${visible(offers.packages).map(pkg => `<section><p>${escape(pkg.tag || '')}</p><h2>${escape(pkg.name)}</h2><p>${escape(pkg.duration || '')}</p>${paragraphs(pkg.fullDescription || pkg.summary)}${pkg.idealFor ? `<p>Ideal for: ${escape(pkg.idealFor)}</p>` : ''}<ul>${(pkg.highlights || []).filter(Boolean).map(text => `<li>${escape(text)}</li>`).join('')}</ul><a href="/bookexperience?package=${encodeURIComponent(pkg.name)}">Check availability</a></section>`).join('')}<p>Confirm materials, gemstone options, extras and availability before booking. <a href="/design-your-ring">Plan your ring</a>.</p>`,
    },
    {
      path: '/faq', title: 'Jewellery Workshop FAQs: Rings, Gems & Booking | The Ring Experience',
      description: 'Answers about making silver and gold rings in Sri Lanka: beginners, wedding bands, engagement designs, gemstones, sizing, timing and booking in Negombo.',
      body: `<h1>${escape(faq.hero?.title || 'Ring-making workshop FAQs')}</h1>${paragraphs(faq.hero?.description)}${faqItems.map(item => `<details><summary>${escape(item.question)}</summary>${paragraphs(item.answer)}</details>`).join('')}<p><a href="/journal">Read our jewellery guides</a> · <a href="/bookexperience">Ask about a workshop</a></p>`,
    },
    {
      path: '/gemstones', title: 'Gemstones for Custom Rings in Sri Lanka | The Ring Experience',
      description: 'Explore gemstone ideas for a personal ring in Negombo. Ask about available stones, suitability, treatments, setting work and care before choosing your design.',
      body: `<h1>${escape(stones.intro?.heading || 'Gemstones for your ring')}</h1>${paragraphs(stones.intro?.description)}${visible(stones.gemstones).map(stone => `<section><h2>${escape(stone.name)}</h2><p>${escape(stone.origin || '')} · ${escape(stone.cut || '')}</p>${paragraphs(stone.description)}</section>`).join('')}<p><a href="/journal/sri-lankan-gemstones-for-rings">Choosing a gemstone for a ring</a> · <a href="/design-your-ring">Discuss your design</a></p>`,
    },
    {
      path: '/aboutus', title: 'Our Negombo Jewellery Workshop | The Ring Experience Sri Lanka',
      description: 'Discover The Ring Experience, a guided jewellery workshop in Negombo where visitors design and take part in making a personal ring with an artisan.',
      body: `<h1>${escape(about.hero?.title || 'Our workshop story')}</h1>${paragraphs(about.hero?.description)}${['approach', 'origin'].map(key => `<section><h2>${escape(about[key]?.title || '')}</h2>${paragraphs(about[key]?.paragraphOne)}${paragraphs(about[key]?.paragraphTwo)}</section>`).join('')}<p><a href="/ouroffers">Explore workshops</a> · <a href="/bookexperience">Plan a visit</a></p>`,
    },
    {
      path: '/gallery', title: 'Handmade Rings & Workshop Moments | The Ring Experience Negombo',
      description: 'Browse ring designs and workshop moments from The Ring Experience in Negombo, Sri Lanka. Bring your ideas to a guided jewellery-making session.',
      body: `<h1>${escape(gallery.intro?.heading || 'Rings and workshop moments')}</h1>${paragraphs(gallery.intro?.description)}${visible(gallery.photos).map(photo => `<figure>${photo.image ? `<img src="${escape(photo.image)}?auto=format&amp;w=800&amp;q=75" alt="${escape(photo.caption || 'A ring-making workshop moment')}" width="800" loading="lazy">` : ''}<figcaption>${escape(photo.caption || '')}</figcaption>${paragraphs(photo.story)}</figure>`).join('')}<p><a href="/design-your-ring">Plan your own ring</a></p>`,
    },
  ];
}
