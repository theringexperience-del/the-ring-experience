<template>
  <div v-if="ctaLinks.length" class="fixed right-4 bottom-4 z-[45] md:hidden">
    <a
      v-for="cta in ctaLinks"
      :key="cta.key"
      :href="cta.href"
      target="_blank"
      rel="noopener noreferrer"
      class="mt-3 flex h-15 w-15 items-center justify-center rounded-full text-white shadow-[0_14px_30px_rgba(42,30,23,0.22)] transition-transform duration-200 hover:-translate-y-0.5 first:mt-0"
      :class="cta.className"
      :aria-label="cta.ariaLabel"
    >
      <svg v-if="cta.key === 'whatsapp'" viewBox="0 0 24 24" aria-hidden="true" class="h-7 w-7 fill-current">
        <path
          d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.62 2 2.2 6.4 2.2 11.82c0 1.73.45 3.42 1.3 4.91L2 22l5.43-1.42a9.81 9.81 0 0 0 4.59 1.17h.01c5.41 0 9.82-4.4 9.82-9.82 0-2.62-1.02-5.08-2.8-6.99ZM12.03 20.1h-.01a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-3.22.84.86-3.14-.2-.32a8.1 8.1 0 0 1-1.24-4.34 8.25 8.25 0 0 1 14.08-5.84 8.19 8.19 0 0 1 2.41 5.84 8.26 8.26 0 0 1-8.24 8.27Zm4.53-6.16c-.25-.12-1.49-.74-1.72-.82-.23-.09-.4-.12-.57.12-.17.25-.66.82-.81.98-.15.17-.3.19-.56.06-.25-.12-1.07-.39-2.03-1.24-.75-.67-1.26-1.49-1.41-1.74-.15-.25-.02-.38.11-.5.11-.11.25-.3.37-.45.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.57-1.37-.78-1.88-.21-.5-.42-.43-.57-.44h-.49c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.17 1.71 2.61 4.15 3.66.58.25 1.03.4 1.38.52.58.18 1.1.16 1.52.1.46-.07 1.49-.61 1.7-1.19.21-.58.21-1.08.15-1.19-.07-.11-.24-.18-.5-.31Z"
        />
      </svg>
      <svg v-else viewBox="0 0 24 24" aria-hidden="true" class="h-7 w-7 fill-current">
        <path
          d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.9 1.55a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 6.85A5.15 5.15 0 1 1 6.85 12 5.16 5.16 0 0 1 12 6.85Zm0 1.8A3.35 3.35 0 1 0 15.35 12 3.36 3.36 0 0 0 12 8.65Z"
        />
      </svg>
    </a>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { fetchFooterContentFromSanity, fetchSocialContentFromSanity } from '../utils/sanity'

const socialContent = ref({})
const footerContent = ref({})

function findLinkByLabel(links, matcher) {
  return links.find((link) => matcher.test(String(link?.label || '').trim()))
}

function toWhatsappUrl(phoneNumber) {
  const normalized = String(phoneNumber || '').replace(/\D/g, '')
  return normalized ? `https://wa.me/${normalized}` : ''
}

const ctaLinks = computed(() => {
  const links = Array.isArray(socialContent.value?.links) ? socialContent.value.links : []
  const whatsappFallback =
    socialContent.value?.whatsappDmUrl ||
    findLinkByLabel(links, /whats\s*app|whatsapp/i)?.href ||
    toWhatsappUrl(footerContent.value?.phone)
  const instagramFallback = findLinkByLabel(links, /instagram|insta/i)?.href || ''
  const whatsappHref = whatsappFallback
  const instagramHref = socialContent.value?.instagramDmUrl || instagramFallback
  const items = []

  if (whatsappHref) {
    items.push({
      key: 'whatsapp',
      href: whatsappHref,
      className: 'bg-[#25D366]',
      ariaLabel: 'Chat on WhatsApp'
    })
  }

  if (instagramHref) {
    items.push({
      key: 'instagram',
      href: instagramHref,
      className: 'bg-[linear-gradient(135deg,#F58529_0%,#FEDA77_18%,#DD2A7B_52%,#8134AF_76%,#515BD4_100%)]',
      ariaLabel: 'Open Instagram'
    })
  }

  return items
})

onMounted(async () => {
  const [social, footer] = await Promise.all([
    fetchSocialContentFromSanity(),
    fetchFooterContentFromSanity()
  ])

  socialContent.value = social ?? {}
  footerContent.value = footer ?? {}
})
</script>
