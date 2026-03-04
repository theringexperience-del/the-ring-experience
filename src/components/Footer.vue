<template>
  <footer class="relative mt-0 overflow-hidden bg-[#171210] text-[#F4EFE8]">
    <div class="pointer-events-none absolute inset-0 opacity-40">
      <div
        class="absolute -top-20 -left-12 h-52 w-52 rounded-full"
        style="background: color-mix(in srgb, var(--color-noisette) 35%, transparent); filter: blur(36px);"
      ></div>
      <div
        class="absolute -right-14 bottom-0 h-56 w-56 rounded-full"
        style="background: color-mix(in srgb, var(--color-lightbeige) 24%, transparent); filter: blur(36px);"
      ></div>
    </div>

    <div class="relative mx-auto w-11/12 py-16 sm:w-10/12 sm:py-16">
      <div class="flex flex-col gap-10 sm:gap-10">
        <div class="max-w-2xl">
          <p class="text-xs tracking-[0.2em] uppercase text-[#CFC7BB]">{{ footerData.subtitle }}</p>
          <h2 class="mt-4 font-display text-4xl leading-tight sm:text-5xl">{{ footerData.title }}</h2>
          <p class="mt-5 max-w-xl text-sm text-[#E6DDD1]/85 sm:text-base">
            {{ footerData.text }}
          </p>
        </div>

        <Credits :footer-data="footerData" />
      </div>
    </div>
  </footer>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Credits from './Credits.vue'
import footerContent from '../../content/footer.json'
import { fetchFooterContentFromSanity } from '../utils/sanity'

const footerFallback = {
  subtitle: 'Sri Lanka',
  title: 'The Ring Experience',
  text: 'Handcrafted memories, sterling silver, and stories you carry forever.',
  phone: '+94-00-000-0000',
  phoneLabel: '+94 00 000 0000',
  email: 'hello@the-ring-experience.com',
  ...(footerContent ?? {}),
}

const footerData = ref(footerFallback)

onMounted(async () => {
  const sanityFooter = await fetchFooterContentFromSanity()
  if (sanityFooter) {
    footerData.value = {
      ...footerFallback,
      ...sanityFooter,
    }
  }
})
</script>
