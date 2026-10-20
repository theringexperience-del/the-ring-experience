<template>
  <div class="contact-pair fixed right-4 z-[45] flex items-center gap-2 md:hidden"
    :class="{ 'is-playing': isPlaying, 'is-scrolling': isScrolling }"
    :style="{ '--travel-x': `${travelX}px`, '--travel-y': `${travelY}px` }"
    aria-label="Contact The Ring Experience">
    <a :href="WORKSHOP_INSTAGRAM" target="_blank" rel="noopener noreferrer"
      class="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-[#38291F] text-white shadow-lg"
      aria-label="The Ring Experience on Instagram">
      <svg viewBox="0 0 24 24" aria-hidden="true" class="h-5 w-5 fill-none stroke-current" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" class="fill-current stroke-none"/></svg>
    </a>
    <a :href="WORKSHOP_WHATSAPP" target="_blank" rel="noopener noreferrer"
      class="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-[#276C4D] text-white shadow-lg"
      aria-label="Ask The Ring Experience on WhatsApp">
    <svg viewBox="0 0 24 24" aria-hidden="true" class="h-5 w-5 fill-current"><path d="M12.04 2a9.84 9.84 0 0 0-8.52 14.77L2 22l5.36-1.41A9.82 9.82 0 1 0 12.04 2Zm0 17.9a8.06 8.06 0 0 1-4.1-1.12l-.3-.18-3.18.84.85-3.1-.2-.32a8.1 8.1 0 1 1 6.93 3.88Zm4.49-6.08c-.25-.12-1.47-.72-1.7-.81-.23-.08-.4-.12-.56.13-.17.24-.64.8-.79.97-.15.16-.3.18-.55.06-.25-.13-1.04-.39-1.98-1.23-.74-.65-1.23-1.46-1.38-1.7-.14-.25-.01-.38.11-.5.11-.1.25-.28.37-.43.12-.14.16-.24.24-.4.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.77-1.84-.2-.48-.41-.42-.56-.43h-.47c-.17 0-.43.06-.65.3-.23.25-.86.84-.86 2.03s.88 2.34 1 2.5c.13.17 1.75 2.67 4.23 3.74.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.17-.47-.3Z"/></svg>
    </a>
    <span class="contact-spark pointer-events-none absolute left-1/2 top-0 text-lg text-[#E8C788]" aria-hidden="true">✦</span>
  </div>
</template>
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { WORKSHOP_INSTAGRAM, WORKSHOP_WHATSAPP } from '../utils/businessProfile.js'
const isPlaying = ref(false)
const isScrolling = ref(false)
const travelX = ref(0)
const travelY = ref(0)
let idleTimer
let playTimer

function onScroll() {
  isPlaying.value = false
  isScrolling.value = true
  clearTimeout(idleTimer)
  clearTimeout(playTimer)
  // Small, bounded movement keeps the links in reach without covering the page.
  travelX.value = Math.round(-6 + Math.sin(window.scrollY / 260) * 6)
  travelY.value = Math.round(Math.sin(window.scrollY / 150) * 28)
  idleTimer = setTimeout(() => {
    isScrolling.value = false
    isPlaying.value = true
    playTimer = setTimeout(() => { isPlaying.value = false }, 1900)
  }, 400)
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  clearTimeout(idleTimer)
  clearTimeout(playTimer)
})
</script>
<style scoped>
.contact-pair {
  bottom: calc(5.5rem + env(safe-area-inset-bottom));
  transform: translate3d(var(--travel-x, 0px), var(--travel-y, 0px), 0);
  transition: transform .12s ease-out;
}
.contact-pair a { transition: transform .18s ease-out; }
.is-scrolling a:first-child { transform: rotate(-7deg) translateY(-3px); }
.is-scrolling a:nth-child(2) { transform: rotate(7deg) translateY(3px); }
.contact-spark { opacity: 0; transform: translate(-50%, -60%) scale(.2); }
.is-playing a:first-child { animation: instagram-bump 1.8s ease-in-out 1; }
.is-playing a:nth-child(2) { animation: whatsapp-bump 1.8s ease-in-out 1; }
.is-playing .contact-spark { animation: contact-spark 1.8s ease-out 1; }
@keyframes instagram-bump {
  0%, 100% { transform: translate(0, 0) rotate(0); }
  18% { transform: translate(-7px, -12px) rotate(-18deg); }
  35% { transform: translate(13px, -3px) rotate(21deg); }
  55% { transform: translate(-12px, 7px) rotate(-17deg); }
  74% { transform: translate(7px, -9px) rotate(12deg); }
}
@keyframes whatsapp-bump {
  0%, 100% { transform: translate(0, 0) rotate(0); }
  18% { transform: translate(7px, 6px) rotate(16deg); }
  35% { transform: translate(-13px, -3px) rotate(-21deg); }
  55% { transform: translate(12px, -8px) rotate(17deg); }
  74% { transform: translate(-7px, 7px) rotate(-12deg); }
}
@keyframes contact-spark {
  0%, 28%, 100% { opacity: 0; transform: translate(-50%, -60%) scale(.2); }
  35%, 47% { opacity: 1; transform: translate(-50%, -170%) scale(1.4); }
}
@media (prefers-reduced-motion: reduce) {
  .contact-pair { transform: none; transition: none; }
  .is-scrolling a:first-child, .is-scrolling a:nth-child(2) { transform: none; }
  .is-playing a:first-child, .is-playing a:nth-child(2), .is-playing .contact-spark { animation: none; }
}
</style>
