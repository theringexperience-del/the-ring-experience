<template>
  <header
    class="fixed top-0 right-0 left-0 z-50 border-b transition-all duration-300"
    :class="isSolid
      ? 'border-[#2A1E17]/12 bg-(--color-lightbeige) text-[#2A1E17] backdrop-blur-md'
      : 'border-transparent bg-transparent text-(--color-lightbeige)'"
  >
    <div class="mx-auto flex h-18 w-11/12 items-center justify-between sm:w-10/12">
     
      <RouterLink
        to="/"
        class="brand-link flex items-center gap-2 font-display text-lg leading-none font-medium sm:text-[1.35rem]" aria-label="The Ring Experience home"
      > <img id="logo" :src="logoSrc" alt="" width="56" height="56" decoding="async" class="w-11 sm:w-12">
        The Ring Experience
      </RouterLink>

      <nav class="hidden items-center gap-6 text-xs tracking-[0.1em] uppercase xl:flex">
        <RouterLink
          v-for="link in primaryLinks"
          :key="link.to"
          :to="link.to"
          class="nav-link transition-colors duration-200"
          :aria-current="route.path === link.to ? 'page' : undefined"
        >
          {{ link.label }}
        </RouterLink>
        <RouterLink :to="cmsNavbar.bookingLink || '/bookexperience'" class="booking-link">
          <Button
            as="span" size="sm"
            :variant="isSolid ? 'nav' : 'navLight'"
            class="px-5 py-2 text-xs tracking-[0.14em]"
          >
            {{ cmsNavbar.bookingLabel }}
          </Button>
        </RouterLink>
      </nav>

      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center xl:hidden"
        :aria-expanded="isMobileOpen ? 'true' : 'false'"
        aria-label="Toggle menu" aria-controls="mobile-navigation"
        @click="isMobileOpen = !isMobileOpen"
      >
        <span class="sr-only">Open menu</span>
        <span class="relative block h-4 w-5">
          <span
            class="absolute top-0 left-0 h-0.5 w-full bg-current transition-transform duration-300"
            :class="isMobileOpen ? 'translate-y-1.75 rotate-45' : ''"
          ></span>
          <span
            class="absolute top-1.75 left-0 h-0.5 w-full bg-current transition-opacity duration-300"
            :class="isMobileOpen ? 'opacity-0' : 'opacity-100'"
          ></span>
          <span
            class="absolute top-3.5 left-0 h-0.5 w-full bg-current transition-transform duration-300"
            :class="isMobileOpen ? '-translate-y-1.75 -rotate-45' : ''"
          ></span>
        </span>
      </button>
    </div>

    <transition name="nav-fade">
      <div
        v-if="isMobileOpen" id="mobile-navigation"
        class="max-h-[calc(100svh-4.5rem)] overflow-y-auto border-t border-[#2A1E17]/10 bg-(--color-lightbeige)/98 text-[#2A1E17] xl:hidden"
      >
        <nav class="mx-auto flex w-11/12 flex-col py-5 text-sm tracking-[0.12em] uppercase sm:w-10/12">
          <RouterLink
            v-for="link in primaryLinks"
            :key="`mobile-${link.to}`"
            :to="link.to"
            class="border-b border-[#2A1E17]/10 py-3 transition-all duration-200 hover:italic"
            @click="isMobileOpen = false"
          >
            {{ link.label }}
          </RouterLink>
          <div class="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-xs text-[#6F5644]">
            <RouterLink v-for="link in studioLinks" :key="link.to" :to="link.to" @click="isMobileOpen = false">{{ link.label }}</RouterLink>
          </div>
          <RouterLink
            :to="cmsNavbar.bookingLink || '/bookexperience'"
            class="mt-4"
            @click="isMobileOpen = false"
          >
            <Button
              as="span" size="sm"
              variant="nav"
              class="w-full px-5 py-2 text-xs tracking-[0.14em]"
            >
              {{ cmsNavbar.bookingLabel }}
            </Button>
          </RouterLink>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Button from './Button.vue'
import { fetchNavbarContentFromSanity, initialContent } from '../utils/sanity'

const route = useRoute()
const cmsNavbar = ref(initialContent('NAVBAR_QUERY') ?? {})
const isMobileOpen = ref(false)
const hasScrolled = ref(false)
const logoSrc = ref('/the-ring-experience-logo.svg')

const primaryLinks = computed(() => cmsNavbar.value.primaryLinks ?? [])
const studioLinks = computed(() => cmsNavbar.value.studioLinks ?? [])

const isSolid = computed(() => route.path !== '/' || hasScrolled.value || isMobileOpen.value)

const onScroll = () => {
  hasScrolled.value = window.scrollY > 20
}

watch(
  () => route.fullPath,
  () => {
    isMobileOpen.value = false
  },
)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  fetchNavbarContentFromSanity().then((navbarContent) => {
    if (navbarContent) cmsNavbar.value = navbarContent
    if (navbarContent?.logoSvgUrl) {
      logoSrc.value = navbarContent.logoSvgUrl
    }
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.nav-fade-enter-active,
.nav-fade-leave-active {
  transition: opacity 0.2s ease;
}

.nav-fade-enter-from,
.nav-fade-leave-to {
  opacity: 0;
}
.nav-link { padding-block: 1rem; border-bottom: 1px solid transparent; }
.nav-link:hover, .nav-link[aria-current="page"] { border-color: currentColor; }
header :is(a, button):focus-visible { outline: none; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: .35em; }
header a:focus-visible :deep(.ui-button) { text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: .35em; }
header button:focus-visible { border-bottom: 2px solid currentColor; }
.brand-link { flex-shrink: 0; }
@media (max-width: 359px) { .brand-link { font-size: 1rem; gap: .25rem; } }
</style>
