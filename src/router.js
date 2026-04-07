import { createRouter, createWebHistory } from 'vue-router'

const Homepage = () => import('./pages/Homepage.vue')
const AboutUs = () => import('./pages/AboutUs.vue')
const OurOffers = () => import('./pages/OurOffers.vue')
const Gemstones = () => import('./pages/Gemstones.vue')
const Gallery = () => import('./pages/Gallery.vue')
const BookExperience = () => import('./pages/BookExperience.vue')
const PrivacyPolicy = () => import('./pages/PrivacyPolicy.vue')
const CookiePolicy = () => import('./pages/CookiePolicy.vue')

const routes = [
  {
    path: '/',
    component: Homepage,
    meta: {
      seo: {
        title: 'The Ring Experience | Craft Your Ring in Sri Lanka',
        description:
          'Join a hands-on ring-making experience in Sri Lanka with sterling silver and natural local gemstones.',
      },
    },
  },
  {
    path: '/ouroffers',
    component: OurOffers,
    meta: {
      seo: {
        title: 'Our Offers | The Ring Experience Sri Lanka',
        description:
          'Explore all available packages and choose the ring-making format that fits your trip in Sri Lanka.',
      },
    },
  },
  {
    path: '/aboutus',
    component: AboutUs,
    meta: {
      seo: {
        title: 'About Us | The Ring Experience Sri Lanka',
        description:
          'Learn how The Ring Experience was created to turn travel moments into meaningful handcrafted memories.',
      },
    },
  },
  {
    path: '/gemstones',
    component: Gemstones,
    meta: {
      seo: {
        title: 'Gemstones | The Ring Experience Sri Lanka',
        description:
          'Discover our latest curated gemstones available for handcrafted ring experiences in Sri Lanka.',
      },
    },
  },
  {
    path: '/gallery',
    component: Gallery,
    meta: {
      seo: {
        title: 'Client Gallery | The Ring Experience Sri Lanka',
        description:
          'Explore real moments and handcrafted rings created by our guests during The Ring Experience.',
      },
    },
  },
  {
    path: '/bookexperience',
    component: BookExperience,
    meta: {
      seo: {
        title: 'Book The Experience | The Ring Experience Sri Lanka',
        description:
          'Book your sterling silver ring-making session in Sri Lanka and leave with a personal symbol of your trip.',
      },
    },
  },
  {
    path: '/privacy-policy',
    component: PrivacyPolicy,
    meta: {
      seo: {
        title: 'Privacy Policy | The Ring Experience Sri Lanka',
        description:
          'Read how The Ring Experience collects and manages personal data for bookings and website use.',
      },
    },
  },
  {
    path: '/cookie-policy',
    component: CookiePolicy,
    meta: {
      seo: {
        title: 'Cookie Policy | The Ring Experience Sri Lanka',
        description:
          'Learn how cookies are used on The Ring Experience website and how to manage your consent.',
      },
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
