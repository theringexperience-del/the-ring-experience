<template></template>
<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import {
  COOKIE_CONSENT_EVENT,
  getCookieConsent,
  hasAnalyticsConsent,
} from '../utils/consentState'

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID
const GA_DISABLE_FLAG = `ga-disable-${GA_ID}`
const GA_SCRIPT_ID = 'tre-ga-script'

const loadAnalytics = () => {
  if (!GA_ID) return

  if (document.getElementById(GA_SCRIPT_ID)) {
    window[GA_DISABLE_FLAG] = false
    return
  }

  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments)
  }

  const script = document.createElement('script')
  script.id = GA_SCRIPT_ID
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.gtag('js', new Date())
  window.gtag('config', GA_ID, { anonymize_ip: true })
}

const handleConsentChange = (event) => {
  const consent = event?.detail ?? getCookieConsent()

  if (consent === 'accepted') {
    window[GA_DISABLE_FLAG] = false
    loadAnalytics()
    return
  }

  if (GA_ID) {
    window[GA_DISABLE_FLAG] = true
  }
}

onMounted(() => {
  if (hasAnalyticsConsent()) {
    loadAnalytics()
  }

  handleConsentChange()
  window.addEventListener(COOKIE_CONSENT_EVENT, handleConsentChange)
})

onBeforeUnmount(() => {
  window.removeEventListener(COOKIE_CONSENT_EVENT, handleConsentChange)
})
</script>
