import { createRouter, createWebHistory } from 'vue-router'

const Homepage = () => import('./pages/Homepage.vue')
const AboutUs = () => import('./pages/AboutUs.vue')
const OurOffers = () => import('./pages/OurOffers.vue')
const DesignYourRing = () => import('./pages/DesignYourRing.vue')
const RingSketchPrompt = () => import('./pages/RingSketchPrompt.vue')
const Gemstones = () => import('./pages/Gemstones.vue')
const Gallery = () => import('./pages/Gallery.vue')
const Furnace = () => import('./pages/Furnace.vue')
const BookExperience = () => import('./pages/BookExperience.vue')
const FaqPage = () => import('./pages/FaqPage.vue')
const PrivacyPolicy = () => import('./pages/PrivacyPolicy.vue')
const CookiePolicy = () => import('./pages/CookiePolicy.vue')
const RingMakingGuide = () => import('./pages/RingMakingGuide.vue')
const Journal = () => import('./pages/Journal.vue')
const JournalArticle = () => import('./pages/JournalArticle.vue')

const NotFound = () => import('./pages/NotFound.vue')

const routes = [
  {
    path: '/',
    component: Homepage,
    meta: {
      seo: {
        title: 'Ring-Making Workshop in Negombo | The Ring Experience',
        description:
          'Make your own ring in a guided jewellery workshop in Negombo, Sri Lanka. Explore private sessions, silver designs and gemstone options.',
      },
    },
  },
  {
    path: '/ouroffers',
    component: OurOffers,
    meta: {
      seo: {
        title: 'Jewellery & Ring-Making Workshops in Negombo | The Ring Experience',
        description:
          'Compare private ring-making workshops in Negombo, Sri Lanka. Choose a session for beginners, couples, wedding bands or a personal custom ring.',
      },
    },
  },
  {
    path: '/ring-making-guide',
    component: RingMakingGuide,
    meta: {
      seo: {
        title: 'Make Your Own Ring in Negombo, Sri Lanka | Visitor Guide',
        description:
          'How a guided ring-making workshop in Negombo works, what beginners can expect, and how to choose a jewellery experience for your Sri Lanka visit.',
      },
    },
  },
  {
    path: '/journal',
    component: Journal,
    meta: { seo: {
      title: 'Jewellery Making Journal | The Ring Experience Sri Lanka',
      description: 'Guides to silver, gold, gemstones, wedding and engagement rings, and hands-on jewellery making in Negombo, Sri Lanka.'
    } },
  },
  {
    path: '/journal/:slug',
    name: 'journalArticle',
    component: JournalArticle,
  },
  {
    path: '/design-your-ring',
    component: DesignYourRing,
    meta: {
      seo: {
        title: 'Design Your Ring | The Ring Experience Sri Lanka',
        description:
          'Plan a custom ring with our Negombo workshop. Choose metal, finish, gemstone ideas and personal details, then send your design notes to an artisan.',
      },
    },
  },
  {
    path: '/ring-sketch-prompt',
    component: RingSketchPrompt,
    meta: { seo: { title: 'AI Ring Sketch Prompt Tool | The Ring Experience', description: 'Create an optional AI image prompt to explore ring concepts before discussing a design with an artisan.' } },
  },
  {
    path: '/aboutus',
    component: AboutUs,
    meta: {
      seo: {
        title: 'Our Negombo Jewellery Workshop | The Ring Experience Sri Lanka',
        description:
          'Discover The Ring Experience, a guided jewellery workshop in Negombo where visitors design and take part in making a personal ring with an artisan.',
      },
    },
  },
  {
    path: '/gemstones',
    component: Gemstones,
    meta: {
      seo: {
        title: 'Gemstones for Custom Rings in Sri Lanka | The Ring Experience',
        description:
          'Explore gemstone ideas for a personal ring in Negombo. Ask about available stones, suitability, treatments, setting work and care before choosing your design.',
      },
    },
  },
  {
    path: '/gallery',
    component: Gallery,
    meta: {
      seo: {
        title: 'Handmade Rings & Workshop Moments | The Ring Experience Negombo',
        description:
          'Browse ring designs and workshop moments from The Ring Experience in Negombo, Sri Lanka. Bring your ideas to a guided jewellery-making session.',
      },
    },
  },
  {
    path: '/furnace',
    component: Furnace,
    meta: {
      seo: {
        title: 'The Furnace | The Ring Experience Sri Lanka',
        description:
          'Build a precious-metal recipe, estimate the metal price, and bring your alloy idea to The Ring Experience.',
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
          'Request a private ring-making workshop in Negombo, Sri Lanka. Share your date, number of makers and custom ring ideas, then confirm details with our artisan.',
      },
    },
  },
  {
    path: '/faq',
    component: FaqPage,
    meta: {
      seo: {
        title: 'Jewellery Workshop FAQs: Rings, Gems & Booking | The Ring Experience',
        description:
          'Answers about making silver and gold rings in Sri Lanka: beginners, wedding bands, engagement designs, gemstones, sizing, timing and booking in Negombo.',
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
  { path: '/:pathMatch(.*)*', name: 'notFound', component: NotFound, meta: { seo: { title: 'Page not found | The Ring Experience', description: 'Find your way back to our jewellery workshops and custom ring design tools in Negombo.' } } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 96 }
    return { top: 0 }
  },
})

export default router
