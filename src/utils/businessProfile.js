// Public Google Business Profile link supplied by the business owner.
export const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/DgFSXxdyEZRAjRqV7?g_st=ic'
export const WORKSHOP_WHATSAPP = 'https://wa.me/94769012344'
export const WORKSHOP_INSTAGRAM = 'https://www.instagram.com/theringexperience.lk/'
export const BUSINESS_SCHEMA = {
  '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'The Ring Experience',
  url: 'https://www.theringexperience.lk',
  logo: 'https://www.theringexperience.lk/the-ring-experience-logo.svg',
  description: 'Guided ring-making and jewellery workshops in Negombo, Sri Lanka.',
  telephone: '+94 76 901 2344', email: 'theringexperience@gmail.com',
  address: { '@type': 'PostalAddress', streetAddress: '63/1 Porutota Rd', addressLocality: 'Negombo', postalCode: '11500', addressCountry: 'LK' },
  hasMap: GOOGLE_MAPS_URL, sameAs: [GOOGLE_MAPS_URL],
}
