<template>
  <a v-if="showContact" :href="WORKSHOP_WHATSAPP" target="_blank" rel="noopener noreferrer"
    class="fixed right-4 z-[45] inline-flex min-h-12 items-center gap-2.5 rounded-full border border-white/25 bg-[#38291F] px-4 py-3 text-xs tracking-wide text-[#FAF7F1] shadow-lg md:hidden"
    style="bottom:calc(1rem + env(safe-area-inset-bottom))" aria-label="Ask The Ring Experience on WhatsApp">
    <svg viewBox="0 0 24 24" aria-hidden="true" class="h-5 w-5 fill-current"><path d="M12.04 2a9.84 9.84 0 0 0-8.52 14.77L2 22l5.36-1.41A9.82 9.82 0 1 0 12.04 2Zm0 17.9a8.06 8.06 0 0 1-4.1-1.12l-.3-.18-3.18.84.85-3.1-.2-.32a8.1 8.1 0 1 1 6.93 3.88Zm4.49-6.08c-.25-.12-1.47-.72-1.7-.81-.23-.08-.4-.12-.56.13-.17.24-.64.8-.79.97-.15.16-.3.18-.55.06-.25-.13-1.04-.39-1.98-1.23-.74-.65-1.23-1.46-1.38-1.7-.14-.25-.01-.38.11-.5.11-.1.25-.28.37-.43.12-.14.16-.24.24-.4.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.77-1.84-.2-.48-.41-.42-.56-.43h-.47c-.17 0-.43.06-.65.3-.23.25-.86.84-.86 2.03s.88 2.34 1 2.5c.13.17 1.75 2.67 4.23 3.74.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.17-.47-.3Z"/></svg>
    Ask us
  </a>
</template>
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { WORKSHOP_WHATSAPP } from '../utils/businessProfile.js'
const route = useRoute()
const showContact = computed(() => !/^\/(bookexperience|design-your-ring)\/?$/.test(route.path))
</script>
