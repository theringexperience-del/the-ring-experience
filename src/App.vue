<template>
  <a href="#main-content" class="skip-link">Skip to content</a>
  <GlobalBackground />
  <Navbar />
  <main id="main-content" tabindex="-1" class="relative z-10">
    <router-view v-slot="{ Component }">
      <transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <Footer />
  <MobileContactCta />
  <AnalyticsManager />
  <GoogleMerchantWidget />
  <CookieBanner />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import AnalyticsManager from './components/AnalyticsManager.vue'
import CookieBanner from './components/CookieBanner.vue'
import Footer from './components/Footer.vue'
import GlobalBackground from './components/GlobalBackground.vue'
import GoogleMerchantWidget from './components/GoogleMerchantWidget.vue'
import MobileContactCta from './components/MobileContactCta.vue'
import Navbar from './components/Navbar.vue'
import { getJournalPost } from './content/journal.js'

const route = useRoute()
const siteUrl = 'https://www.theringexperience.lk'
const defaultOgImage = `${siteUrl}/uploads/whatsapp-image-2026-02-24-at-10.43.29-1-.jpeg`

const defaultTitle = 'The Ring Experience - Sri Lanka'
const defaultDescription =
  'Create your own sterling silver ring in Sri Lanka with natural gemstones and local craftsmanship.'

const article = computed(() => route.name === 'journalArticle' ? getJournalPost(route.params.slug) : null)
const seo = computed(() => article.value ? {
  title: `${article.value.title} | The Ring Experience`,
  description: article.value.description,
} : (route.meta?.seo ?? {}))
const canonicalPath = computed(() => (route.path === '/' ? '' : route.path))
const canonicalUrl = computed(() => `${siteUrl}${canonicalPath.value}`)
const ogImage = computed(() => seo.value.image || defaultOgImage)
const jsonLd = computed(() =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'The Ring Experience',
    url: siteUrl,
    logo: `${siteUrl}/the-ring-experience-logo.svg`,
    image: ogImage.value,
    description: 'Guided ring-making and jewellery workshops in Negombo, Sri Lanka.',
    telephone: '+94 76 901 2344',
    email: 'theringexperience@gmail.com',
    address: { '@type': 'PostalAddress', addressLocality: 'Negombo', addressCountry: 'LK' },
  })
)
const articleLd = computed(() => article.value ? JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: article.value.title,
  description: article.value.description,
  datePublished: article.value.published,
  author: { '@type': 'Organization', name: 'The Ring Experience', url: siteUrl },
  publisher: { '@type': 'Organization', name: 'The Ring Experience', url: siteUrl },
  mainEntityOfPage: canonicalUrl.value,
}) : null)

useHead(() => ({
  title: seo.value.title || defaultTitle,
  meta: [
    { name: 'description', content: seo.value.description || defaultDescription },
    { name: 'robots', content: route.name === 'journalArticle' && !article.value ? 'noindex' : 'index, follow' },
    { property: 'og:site_name', content: 'The Ring Experience' },
    { property: 'og:type', content: article.value ? 'article' : 'website' },
    { property: 'og:title', content: seo.value.title || defaultTitle },
    {
      property: 'og:description',
      content: seo.value.description || defaultDescription,
    },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:url', content: canonicalUrl.value },
    { property: 'og:image', content: ogImage.value },
    {
      property: 'og:image:alt',
      content: 'Sterling silver ring-making experience in Sri Lanka',
    },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: seo.value.title || defaultTitle },
    {
      name: 'twitter:description',
      content: seo.value.description || defaultDescription,
    },
    { name: 'twitter:image', content: ogImage.value },
  ],
  link: [
    { rel: 'canonical', href: canonicalUrl.value },
    { rel: 'alternate', hreflang: 'en', href: canonicalUrl.value },
  ],
  script: [
    {
      key: 'organization-jsonld',
      type: 'application/ld+json',
      children: jsonLd.value,
    },
    ...(articleLd.value ? [{ key: 'article-jsonld', type: 'application/ld+json', children: articleLd.value }] : []),
  ],
}))
</script>

<style scoped>
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 767px) {
  .page-fade-enter-active,
  .page-fade-leave-active {
    transition: none;
  }

  .page-fade-enter-from,
  .page-fade-leave-to {
    opacity: 1;
    transform: none;
  }
}
</style>
