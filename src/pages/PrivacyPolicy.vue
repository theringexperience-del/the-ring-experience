<template>
  <main ref="privacyRoot" class="mx-auto w-10/12 max-w-4xl py-20">
    <p data-reveal class="text-xs tracking-[0.2em] text-(--color-mutedbrown) uppercase">Legal</p>
    <h1 data-reveal class="mt-3 font-display text-4xl leading-tight text-(--color-brown) sm:text-5xl">Privacy Policy</h1>
    <p data-reveal class="mt-4 text-sm text-(--color-brown)" style="opacity: 0.8;">Last updated: February 24, 2026</p>

    <section class="mt-8 space-y-7 text-(--color-brown)">
      <div data-reveal>
        <h2 class="font-medium">1. Data Controller</h2>
        <p class="mt-2 text-base leading-relaxed" style="opacity: 0.9;">
          The data controller is {{ LEGAL_NAME }} ({{ LEGAL_ADDRESS }}). For privacy requests, contact:
          <a :href="`mailto:${footerData.email}`" class="underline">{{ footerData.email }}</a>.
        </p>
      </div>

      <div data-reveal>
        <h2 class="font-medium">2. Categories of Personal Data</h2>
        <p class="mt-2 text-base leading-relaxed" style="opacity: 0.9;">
          We may process identification and contact data (for example name, email, phone), booking details,
          communication content, and technical usage data (device/browser, IP-related diagnostics, consent preferences).
        </p>
      </div>

      <div data-reveal>
        <h2 class="font-medium">3. Purposes and Legal Bases</h2>
        <p class="mt-2 text-base leading-relaxed" style="opacity: 0.9;">
          We process personal data to respond to requests and bookings, deliver services, manage legal obligations,
          protect platform security, and improve website performance. Legal bases include contract performance,
          legal obligations, legitimate interests, and consent where required (for example analytics cookies).
        </p>
      </div>

      <div data-reveal>
        <h2 class="font-medium">4. Recipients and Third-Party Services</h2>
        <p class="mt-2 text-base leading-relaxed" style="opacity: 0.9;">
          Data may be shared with selected service providers (for example scheduling, hosting, analytics, and technical
          support providers) strictly for operational purposes and under contractual safeguards.
        </p>
      </div>

      <div data-reveal>
        <h2 class="font-medium">5. International Data Transfers</h2>
        <p class="mt-2 text-base leading-relaxed" style="opacity: 0.9;">
          If a provider processes data outside your country, we apply appropriate safeguards as required by applicable
          law (for example contractual protections and provider compliance measures).
        </p>
      </div>

      <div data-reveal>
        <h2 class="font-medium">6. Data Retention</h2>
        <p class="mt-2 text-base leading-relaxed" style="opacity: 0.9;">
          We retain personal data only for the time necessary to provide services, handle legal/accounting obligations,
          and protect legitimate business interests. Retention periods vary by data category and purpose.
        </p>
      </div>

      <div data-reveal>
        <h2 class="font-medium">7. Data Subject Rights</h2>
        <p class="mt-2 text-base leading-relaxed" style="opacity: 0.9;">
          Depending on applicable law, you can request access, rectification, deletion, restriction, portability,
          objection to processing, and withdrawal of consent where consent is the legal basis. You may also lodge a
          complaint with a competent supervisory authority.
        </p>
      </div>

      <div data-reveal>
        <h2 class="font-medium">8. How to Exercise Rights</h2>
        <p class="mt-2 text-base leading-relaxed" style="opacity: 0.9;">
          Send your request to
          <a :href="`mailto:${footerData.email}`" class="underline">{{ footerData.email }}</a>.
          We may request verification details before processing requests.
        </p>
      </div>

      <div data-reveal>
        <h2 class="font-medium">9. Policy Updates</h2>
        <p class="mt-2 text-base leading-relaxed" style="opacity: 0.9;">
          We may update this policy from time to time. The latest version is always available on this page with the
          updated date.
        </p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRevealAnimations } from '../composables/useRevealAnimations'

const LEGAL_NAME = 'The Ring Experience'
const LEGAL_ADDRESS = 'Sri Lanka (full legal address to be added)'
const privacyRoot = ref(null)
const { setupRevealAnimations } = useRevealAnimations(privacyRoot, { start: 'top 92%', y: 24, duration: 0.65 })

const footerData = {
  email: 'hello@the-ring-experience.com',
}

onMounted(() => {
  setupRevealAnimations()
})
</script>
