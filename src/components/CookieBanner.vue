<template>
  <transition name="cookie-fade">
    <section
      v-if="isVisible"
      class="fixed inset-x-0 bottom-0 z-50 max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-[#2A1E17]/15 bg-(--color-lightbeige) p-4 shadow-[0_-6px_20px_rgba(42,30,23,0.12)] sm:p-5"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div class="mx-auto flex w-full max-w-6xl flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div class="max-w-3xl space-y-2">
          <p class="text-sm leading-relaxed text-[#2A1E17]">
            We use cookies to run the site and, only with your consent, to measure performance.
          </p>
          <p class="text-xs leading-relaxed text-[#2A1E17]/85">
            Accept = analytics/performance cookies. Reject = only strictly necessary cookies.
          </p>
          <p class="text-xs leading-relaxed text-[#2A1E17]/85">
            Read details in
            <router-link class="underline" to="/privacy-policy">Privacy Policy</router-link>
            and
            <router-link class="underline" to="/cookie-policy">Cookie Policy</router-link>.
          </p>
        </div>

        <div class="flex w-full shrink-0 flex-row items-center gap-2 sm:w-auto">
          <button
            type="button"
            class="ui-button ui-button-outline w-full px-4 py-2 sm:w-auto"
            @click="rejectCookies"
          >
            Reject
          </button>
          <button
            type="button"
            class="ui-button ui-button-solid w-full px-4 py-2 sm:w-auto"
            @click="acceptCookies"
          >
            Accept
          </button>
        </div>
      </div>
    </section>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
import { COOKIE_CONSENT_KEY, getCookieConsent, setCookieConsent } from '../utils/consentState'

const getInitialVisibility = () => {
  if (typeof window === 'undefined') return false

  const query = new URLSearchParams(window.location.search)

  if (query.get('resetCookieConsent') === '1') {
    window.localStorage.removeItem(COOKIE_CONSENT_KEY)
  }

  if (query.get('showCookieBanner') === '1') {
    return true
  }

  return !getCookieConsent()
}

const isVisible = ref(getInitialVisibility())

const hideBanner = () => {
  isVisible.value = false
}

const acceptCookies = () => {
  setCookieConsent('accepted')
  hideBanner()
}

const rejectCookies = () => {
  setCookieConsent('rejected')
  hideBanner()
}
</script>

<style scoped>
.cookie-fade-enter-active,
.cookie-fade-leave-active {
  transition: opacity 0.2s ease;
}

.cookie-fade-enter-from,
.cookie-fade-leave-to {
  opacity: 0;
}
</style>
