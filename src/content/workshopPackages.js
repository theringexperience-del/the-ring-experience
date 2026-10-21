// Current workshop offers. Keep the same details in the homepage, offers page,
// booking selectors and readable HTML, even while older CMS copy is being updated.
export const workshopPackages = [
  {
    key: 'essential',
    name: 'The Essential',
    tag: 'LKR 14,999 / person',
    duration: 'Approximately 1.5–2 hours',
    summary: 'Make your own silver ring. 4g of sterling silver and jeweller guidance included.',
    fullDescription: 'Make your very own silver ring from scratch. Our friendly jeweller will guide you through every step, from shaping to polishing.',
    idealFor: 'Make your own silver ring.',
    highlights: [
      '4g of sterling silver included.',
      'Create your own simple ring design with your favourite textures and finishes.',
      'Professional jeweller guidance, tools and hands-on making.',
      'Take home the ring you created.',
      'Extra silver: LKR 2,000 per gram.',
      'Gemstones and gemstone settings cost extra. We quote these before you agree.'
    ],
    buttonLabel: 'Make My Ring'
  },
  {
    key: 'signature',
    name: 'Signature Gem Discovery',
    tag: 'LKR 29,999 / person · Our flagship',
    duration: 'Approximately 3 hours',
    summary: 'Make your own gemstone ring. 6g of silver, LKR 5,000 toward one gemstone and a standard setting included.',
    fullDescription: 'Discover Sri Lanka’s beautiful gemstones, choose your favourite and create a ring around it. Our skilled jeweller will help turn your idea into something truly personal.',
    idealFor: 'Make your own gemstone ring with a gemstone allowance and standard setting included.',
    highlights: [
      '6g of sterling silver included.',
      'Create a simple or complex personalised design with a design consultation.',
      'Discover and choose from available natural gemstones.',
      'LKR 5,000 included toward one gemstone, plus one standard gemstone setting.',
      'Choose a gemstone costing LKR 5,000 or less and pay nothing extra for the stone. If it costs more, pay only the difference.',
      'Example: LKR 8,000 gemstone − LKR 5,000 included = LKR 3,000 extra.',
      'Unused gemstone allowance cannot be exchanged for cash or deducted from the package price.',
      'Approximately 3 hours of hands-on making with professional jeweller guidance. Take home the ring you created.',
      'Extra silver: LKR 2,000 per gram. More advanced settings may cost extra; we agree the price beforehand.'
    ],
    buttonLabel: 'Discover My Gemstone'
  },
  {
    key: 'ceremony',
    name: 'The Ceremony',
    tag: 'LKR 46,999 / person',
    duration: 'Approximately 4+ hours',
    summary: 'A longer private session for special moments. 8g of silver, LKR 8,000 toward one gemstone, a standard setting and engraving included.',
    fullDescription: 'Celebrate something special by creating a ring that tells your story. Perfect for proposals, anniversaries, wedding rings and meaningful moments.',
    idealFor: 'A longer, more personalised jewellery-making experience for a special occasion.',
    highlights: [
      '8g of sterling silver included.',
      'Advanced personalised ring design in a private session.',
      'Discover and choose from available natural gemstones.',
      'LKR 8,000 included toward one gemstone, plus one standard gemstone setting.',
      'If your chosen gemstone costs more than LKR 8,000, pay the difference. Unused allowance cannot be exchanged for cash or deducted from the package price.',
      'Personalised engraving and dedicated professional jeweller guidance.',
      'Approximately 4+ hours of hands-on making. Take home your special handmade ring.',
      'Extra silver: LKR 2,000 per gram. Premium stones, gold and advanced settings are quoted separately before you agree.'
    ],
    buttonLabel: 'Create My Special Ring'
  }
];

export const pricingExplanation = 'You’re not just buying a ring. You’re making one. Every experience includes real silver, professional tools, hands-on learning and guidance from a skilled local jeweller. Our prices reflect quality craftsmanship and fair compensation for our artisans.';

const packageKey = (pkg, index) => {
  const key = String(pkg?.key || '').toLowerCase();
  const name = String(pkg?.name || '').toLowerCase();
  return workshopPackages.find(item => item.key === key || name.includes(item.key))?.key ?? workshopPackages[index]?.key;
};

export function currentWorkshopPackages(cmsPackages) {
  if (!Array.isArray(cmsPackages) || !cmsPackages.length) return workshopPackages;
  return cmsPackages
    .filter(pkg => pkg?.isVisible !== false)
    .map((pkg, index) => {
      const current = workshopPackages.find(item => item.key === packageKey(pkg, index));
      return current ? { ...pkg, ...current } : null;
    })
    .filter(Boolean);
}
