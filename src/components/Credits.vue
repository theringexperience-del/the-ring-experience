<template>
  <div class="border-t border-[#F4EFE8]/20 pt-6 text-xs tracking-[0.08em] uppercase text-[#CFC7BB]">
    <div class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <p>&copy; {{ year }} The Ring Experience</p>
      <div class="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2">
        <a class="transition-opacity hover:opacity-70" :href="`tel:${footerData.phone}`">
          {{ footerData.phoneLabel || footerData.phone }}
        </a>
        <a class="transition-opacity hover:opacity-70" :href="`mailto:${footerData.email}`">
          {{ footerData.email }}
        </a>
        <RouterLink class="transition-opacity hover:opacity-70" to="/privacy-policy">
          Privacy Policy
        </RouterLink>
        <RouterLink class="transition-opacity hover:opacity-70" to="/cookie-policy">
          Cookie Policy
        </RouterLink>
      </div>
    </div>

    <div class="mt-5 border-t border-[#F4EFE8]/12 pt-5 normal-case sm:mt-5">
      <p>
        Designer and developer:
        <a
          class="underline underline-offset-2 transition-opacity hover:opacity-70"
          href="https://www.klyk.studio"
          target="_blank"
          rel="noopener noreferrer"
        >
          klyk.studio
        </a>
        - Thank you
      </p>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'

const year = new Date().getFullYear()
const props = defineProps({
  footerData: {
    type: Object,
    default: () => ({})
  }
})

const fallbackData = {
  phone: '+94-00-000-0000',
  phoneLabel: '+94 00 000 0000',
  email: 'hello@the-ring-experience.com',
}

const footerData = computed(() => ({
  ...fallbackData,
  ...(props.footerData ?? {})
}))
</script>
