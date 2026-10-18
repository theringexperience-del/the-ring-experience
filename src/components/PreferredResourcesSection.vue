<template>
  <section id="resources" aria-labelledby="resources-heading" class="bg-[#EFE7DA] py-20 sm:py-24">
    <div class="mx-auto w-11/12 sm:w-10/12">
      <div class="flex flex-col gap-5 border-b border-[#B9A990] pb-9 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="inline-flex items-center gap-2 border border-[#8C724F] px-3 py-1.5 text-[.65rem] font-medium tracking-[.16em] text-[#4B3827] uppercase">
            <span aria-hidden="true">✦</span> Preferred Resources
          </p>
          <h2 id="resources-heading" class="mt-5 max-w-2xl font-display text-4xl leading-tight text-[#38291F] sm:text-5xl">
            A little guidance before you make your ring.
          </h2>
        </div>
        <p class="max-w-sm text-base leading-relaxed text-[#5E4A38]">
          Explore the workshops, design ideas and practical details for your visit to our Negombo studio.
        </p>
      </div>

      <div class="grid gap-4 pt-8 md:grid-cols-2 xl:grid-cols-3">
        <RouterLink
          v-for="(item, index) in resources"
          :key="item.to"
          :to="item.to"
          class="group flex min-h-56 flex-col border border-[#CDBFA9] bg-[#FAF7F1] p-6 transition-colors hover:bg-white"
        >
          <span class="text-xs tracking-[.16em] text-[#86653A]">0{{ index + 1 }}</span>
          <h3 class="mt-8 font-display text-2xl leading-tight text-[#38291F]">{{ item.title }}</h3>
          <p class="mt-3 grow text-sm leading-relaxed text-[#5E4A38]">{{ item.description }}</p>
          <span class="mt-6 text-sm font-medium text-[#755024]">Read more <span aria-hidden="true">↗</span></span>
        </RouterLink>
      </div>

      <div class="mt-8 flex flex-wrap gap-4">
      <RouterLink to="/journal" class="inline-flex items-center gap-3 border border-[#B9A990] px-5 py-3 text-sm text-[#38291F] hover:bg-white">
        Read the jewellery journal <span aria-hidden="true">↗</span>
      </RouterLink>
      <a
        v-if="googleReviewsUrl"
        :href="googleReviewsUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-3 border border-[#B9A990] px-5 py-3 text-sm text-[#38291F] hover:bg-white"
      >
        Read guest reviews on Google <span aria-hidden="true">↗</span>
      </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  reviewsUrl: { type: String, default: '' }
})

const resources = [
  { to: '/ring-making-guide', title: 'Ring-making guide', description: 'Learn what happens at the workbench and how to prepare for your visit.' },
  { to: '/ouroffers', title: 'Compare workshops', description: 'Find the session length and inclusions that fit your visit.' },
  { to: '/design-your-ring', title: 'Explore ring ideas', description: 'Try out shapes, textures and details before coming to the workbench.' },
  { to: '/gemstones', title: 'Discover gemstones', description: 'See how a stone can add a personal detail to your design.' },
  { to: '/faq', title: 'Plan your visit', description: 'Get answers about beginners, booking and what to expect.' },
  { to: '/gallery', title: 'Guest gallery', description: 'See finished rings and moments from the workshop.' }
]

const googleReviewsUrl = computed(() => {
  try {
    const url = new URL(props.reviewsUrl)
    if (url.protocol !== 'https:') return ''
    const host = url.hostname.toLowerCase()
    return host === 'maps.app.goo.gl' || host === 'g.page' ||
      (/^(www\.)?google\.(com|lk|co\.uk|it)$/.test(host) && url.pathname.startsWith('/maps'))
      ? url.href
      : ''
  } catch {
    return ''
  }
})
</script>
