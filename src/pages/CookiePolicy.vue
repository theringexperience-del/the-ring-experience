<template>
  <main ref="cookieRoot" class="mx-auto w-10/12 max-w-4xl py-20">
    <p data-reveal class="text-xs tracking-[0.2em] text-(--color-mutedbrown) uppercase">Legal</p>
    <h1 data-reveal class="mt-3 font-display text-4xl leading-tight text-(--color-brown) sm:text-5xl">Cookie Policy</h1>
    <p data-reveal class="mt-4 text-sm text-(--color-brown)" style="opacity: 0.8;">Last updated: February 24, 2026</p>

    <section class="mt-8 space-y-7 text-(--color-brown)">
      <div data-reveal>
        <h2 class="font-medium">1. What Cookies Are</h2>
        <p class="mt-2 text-base leading-relaxed" style="opacity: 0.9;">
          Cookies are small text files stored on your device that allow websites to function, remember preferences, and
          collect information on interactions.
        </p>
      </div>

      <div data-reveal>
        <h2 class="font-medium">2. Cookie Categories Used</h2>
        <p class="mt-2 text-base leading-relaxed" style="opacity: 0.9;">
          We use:
          technical/strictly necessary cookies (site operation), preference cookies (saved choices), and
          analytics cookies (aggregate traffic/performance metrics) where consent is required.
        </p>
      </div>

      <div data-reveal>
        <h2 class="font-medium">3. First-Party and Third-Party Cookies</h2>
        <p class="mt-2 text-base leading-relaxed" style="opacity: 0.9;">
          Some cookies are set directly by this site (first-party) and others by external providers (third-party),
          such as booking or analytics services.
        </p>
      </div>

      <div data-reveal>
        <h2 class="font-medium">4. Duration</h2>
        <p class="mt-2 text-base leading-relaxed" style="opacity: 0.9;">
          Cookies may be session cookies (deleted when the browser closes) or persistent cookies (stored for a defined
          period). Duration depends on each cookie's function and provider settings.
        </p>
      </div>

      <div data-reveal>
        <h2 class="font-medium">5. Consent and Legal Basis</h2>
        <p class="mt-2 text-base leading-relaxed" style="opacity: 0.9;">
          Strictly necessary cookies are processed on the basis of legitimate interest in operating the website.
          Non-essential cookies are activated only after consent through the cookie banner.
        </p>
      </div>

      <div data-reveal>
        <h2 class="font-medium">6. Managing and Withdrawing Consent</h2>
        <p class="mt-2 text-base leading-relaxed" style="opacity: 0.9;">
          You can accept or reject non-essential cookies from the banner. You can also block or delete cookies from
          browser settings at any time. Blocking technical cookies may affect website functionality.
        </p>
      </div>

      <div data-reveal>
        <h2 class="font-medium">7. Data Controller and Contacts</h2>
        <p class="mt-2 text-base leading-relaxed" style="opacity: 0.9;">
          The controller for cookie-related processing is {{ LEGAL_NAME }}.
          For questions, contact
          <a :href="`mailto:${footerData.email}`" class="underline">{{ footerData.email }}</a>.
        </p>
      </div>

      <div data-reveal>
        <h2 class="font-medium">8. Policy Updates</h2>
        <p class="mt-2 text-base leading-relaxed" style="opacity: 0.9;">
          This Cookie Policy may be updated to reflect legal or technical changes. The current version is always
          published on this page.
        </p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import footerContent from '../../content/footer.json'
import { useRevealAnimations } from '../composables/useRevealAnimations'

const LEGAL_NAME = 'The Ring Experience'
const cookieRoot = ref(null)
const { setupRevealAnimations } = useRevealAnimations(cookieRoot, { start: 'top 92%', y: 24, duration: 0.65 })

const footerData = {
  email: 'hello@the-ring-experience.com',
  ...(footerContent ?? {}),
}

onMounted(() => {
  setupRevealAnimations()
})
</script>
