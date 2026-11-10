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
  <CookieBanner />
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import AnalyticsManager from './components/AnalyticsManager.vue'
import CookieBanner from './components/CookieBanner.vue'
import Footer from './components/Footer.vue'
import GlobalBackground from './components/GlobalBackground.vue'
import MobileContactCta from './components/MobileContactCta.vue'
import Navbar from './components/Navbar.vue'
import { getJournalPost, loadJournal } from './content/journal.js'
import { BUSINESS_SCHEMA } from './utils/businessProfile.js'

loadJournal();
const route = useRoute()
const siteUrl = 'https://www.theringexperience.lk'
const defaultOgImage = `${siteUrl}/uploads/whatsapp-image-2026-02-24-at-10.43.29-1-.webp`

const defaultTitle = 'The Ring Experience - Sri Lanka'
const defaultDescription =
  'Create your own sterling silver ring in Sri Lanka with natural gemstones and local craftsmanship.'

// Concise search snippets for published guides; visible article headings remain editorial.
const journalSeoTitles = {
  "buying-ceylon-sapphire-sri-lanka": "Buying Ceylon Sapphires | The Ring Experience",
  "care-for-silver-gold-and-gemstone-rings": "How to Care for Gemstone Rings | The Ring Experience",
  "commission-custom-jewellery-sri-lanka-travel": "Custom Jewellery on Your Trip | The Ring Experience",
  "creative-things-to-do-in-negombo-ring-making": "Creative Things to Do in Negombo | The Ring Experience",
  "creative-things-to-do-in-sri-lanka": "Creative Things to Do in Sri Lanka | The Ring Experience",
  "engagement-ring-design-workshop-guide": "Engagement Ring Design Guide | The Ring Experience",
  "make-a-silver-ring-in-negombo": "Make a Silver Ring in Negombo | The Ring Experience",
  "make-your-own-wedding-rings-sri-lanka": "Make Wedding Rings in Sri Lanka | The Ring Experience",
  "ring-size-and-fit-for-a-handmade-ring": "Handmade Ring Sizing Guide | The Ring Experience",
  "silver-or-gold-for-a-handmade-ring": "Silver vs Gold Rings | The Ring Experience",
  "sri-lankan-gemstones-for-rings": "Sri Lankan Gemstones for Rings | The Ring Experience",
  "sri-lankan-jewellery-making-experience": "Jewellery Making in Sri Lanka | The Ring Experience"
}
const article = computed(() => route.name === 'journalArticle' ? getJournalPost(route.params.slug) : null)
const seo = computed(() => article.value ? {
  title: journalSeoTitles[route.params.slug] || `${article.value.title} | The Ring Experience`,
  description: article.value.description,
} : (route.meta?.seo ?? {}))
// Cloudflare Pages serves prerendered /page/index.html at /page/.
// Keep the canonical URL aligned with that public directory URL.
const canonicalPath = computed(() => route.path === '/' ? '/' : `${route.path.replace(/\/+$/, '')}/`)
const canonicalUrl = computed(() => `${siteUrl}${canonicalPath.value}`)
const ogImage = computed(() => seo.value.image || defaultOgImage)
const jsonLd = computed(() => JSON.stringify({ ...BUSINESS_SCHEMA, image: ogImage.value }))
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

// Static HTML exposes article data before JavaScript; Unhead owns the live tag after hydration.
onMounted(() => document.querySelectorAll('#prerender-article-jsonld, #prerender-page-jsonld, [data-prerender-seo]').forEach(tag => tag.remove()))

useHead(() => ({
  title: seo.value.title || defaultTitle,
  meta: [
    { name: 'description', content: seo.value.description || defaultDescription },
    { name: 'robots', content: (route.name === 'notFound' || (route.name === 'journalArticle' && !article.value)) ? 'noindex' : 'index, follow, max-image-preview:large' },
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
    { rel: 'alternate', type: 'application/rss+xml', title: 'The Ring Experience Journal', href: `${siteUrl}/journal/feed.xml` },
  ],
  script: [
    {
      key: 'organization-jsonld',
      type: 'application/ld+json',
      textContent: jsonLd.value,
    },
    ...(articleLd.value ? [{ key: 'article-jsonld', type: 'application/ld+json', textContent: articleLd.value }] : []),
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
