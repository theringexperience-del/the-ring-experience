<template>
  <header
    class="fixed top-0 right-0 left-0 z-50 border-b transition-all duration-300"
    :class="isSolid
      ? 'border-[#2A1E17]/12 bg-(--color-lightbeige) text-[#2A1E17] backdrop-blur-md'
      : 'border-transparent bg-transparent text-[#F4EFE8]'"
  >
    <div class="mx-auto flex h-18 w-11/12 items-center justify-between sm:w-10/12">
     
      <RouterLink
        to="/"
        class="flex items-center justify-center font-display text-xl leading-none font-bold tracking-[0.01em] sm:text-[1.6rem]"
      > <img id="logo" :src="logoSrc" alt="" class="w-14">
        The Ring Experience
      </RouterLink>

      <nav class="hidden items-center gap-8 text-sm tracking-[0.12em] uppercase md:flex">
        <RouterLink
          v-for="link in primaryLinks"
          :key="link.to"
          :to="link.to"
          class="transition-all duration-200 hover:opacity-70 hover:italic"
          :class="route.path === link.to ? 'opacity-100' : 'opacity-85'"
        >
          {{ link.label }}
        </RouterLink>
        <RouterLink to="/bookexperience">
          <Button
            size="sm"
            :variant="isSolid ? 'nav' : 'navLight'"
            class="px-5 py-2 text-xs tracking-[0.14em]"
          >
            Book
          </Button>
        </RouterLink>
      </nav>

      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center md:hidden"
        :aria-expanded="isMobileOpen ? 'true' : 'false'"
        aria-label="Toggle menu"
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
        v-if="isMobileOpen"
        class="border-t border-[#2A1E17]/10 bg-[#F4EFE8]/98 md:hidden"
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
          <RouterLink
            to="/bookexperience"
            class="mt-4"
            @click="isMobileOpen = false"
          >
            <Button
              size="sm"
              variant="nav"
              class="w-full px-5 py-2 text-xs tracking-[0.14em]"
            >
              Book
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
import { fetchNavbarContentFromSanity } from '../utils/sanity'

const route = useRoute()
const isMobileOpen = ref(false)
const hasScrolled = ref(false)
const logoSrc = ref('/the-ring-experience-logo.svg')

const primaryLinks = [
  { label: 'Our Offers', to: '/ouroffers' },
  { label: 'About Us', to: '/aboutus' },
  { label: 'Gemstones', to: '/gemstones' },
  { label: 'Gallery', to: '/gallery' },
]

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
</style>
