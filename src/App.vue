<template>
  <GlobalBackground />
  <Navbar />
  <main class="relative z-10">
    <router-view v-slot="{ Component }">
      <transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <Footer />
  <AnalyticsManager />
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
import Navbar from './components/Navbar.vue'

const route = useRoute()
const siteUrl = 'https://the-ring-experience.com'

const defaultTitle = 'The Ring Experience - Sri Lanka'
const defaultDescription =
  'Esperienze autentiche in Sri Lanka: crea un anello in argento sterling con pietre naturali, un ricordo significativo oltre il solito souvenir.'

const seo = computed(() => route.meta?.seo ?? {})
const canonicalPath = computed(() => (route.path === '/' ? '' : route.path))
const canonicalUrl = computed(() => `${siteUrl}${canonicalPath.value}`)

useHead(() => ({
  title: seo.value.title || defaultTitle,
  meta: [
    { name: 'description', content: seo.value.description || defaultDescription },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:site_name', content: 'The Ring Experience' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: seo.value.title || defaultTitle },
    {
      property: 'og:description',
      content: seo.value.description || defaultDescription,
    },
    { property: 'og:url', content: canonicalUrl.value },
    { property: 'og:image', content: `${siteUrl}/social/og-facebook.svg` },
    { property: 'og:image', content: `${siteUrl}/social/og-whatsapp.svg` },
    { property: 'og:image', content: `${siteUrl}/social/og-instagram.svg` },
    {
      property: 'og:image:alt',
      content: 'Esperienza di creazione anello in argento sterling in Sri Lanka',
    },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: seo.value.title || defaultTitle },
    {
      name: 'twitter:description',
      content: seo.value.description || defaultDescription,
    },
    { name: 'twitter:image', content: `${siteUrl}/social/og-twitter.svg` },
  ],
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
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
</style>
