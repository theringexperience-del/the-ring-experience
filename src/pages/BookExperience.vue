<template>
  <div class="bg-[#FAF7F1] text-(--color-darkbrown)">
    <header class="bg-(--color-panel) px-[6%] pb-14 pt-32 sm:pb-18 sm:pt-40">
      <div class="mx-auto max-w-6xl"><p class="text-xs uppercase tracking-[.22em] text-(--color-mutedbrown)">{{ hero.eyebrow }}</p><h1 class="mt-5 max-w-4xl font-display text-5xl leading-[1.08] sm:text-7xl">{{ hero.title }}</h1><p class="mt-6 max-w-2xl text-lg leading-relaxed text-(--color-mutedbrown)">{{ hero.description }}</p></div>
    </header>
    <div class="mx-auto grid max-w-6xl gap-8 px-[6%] py-12 lg:max-w-7xl lg:grid-cols-[.85fr_1.15fr] sm:py-18">
      <div class="self-start space-y-6">
        <aside class="border border-(--color-border) bg-(--color-panel) p-7 sm:p-9">
          <p class="text-xs uppercase tracking-[.18em] text-(--color-mutedbrown)">{{ section('planning').eyebrow }}</p><h2 class="mt-4 font-display text-3xl leading-tight">{{ section('planning').heading }}</h2>
          <ol class="mt-7 space-y-6 text-(--color-mutedbrown)"><li v-for="step in planningSteps" :key="step.key"><strong class="block text-(--color-darkbrown)">{{ step.heading }}</strong><CmsRichText :blocks="step.body" class="mt-2 leading-relaxed"/></li></ol>
          <RouterLink v-for="link in section('planning').links" :key="link.href" :to="link.href" class="mt-7 inline-block text-sm text-(--color-action) underline underline-offset-4">{{ link.label }}</RouterLink>
          <div class="mt-8 border-t border-(--color-border) pt-6 text-sm leading-relaxed text-(--color-mutedbrown)"><CmsRichText :blocks="section('location').body"/><a :href="publicLinks.googleMapsUrl" target="_blank" rel="noopener noreferrer" class="mt-3 inline-block text-(--color-action) underline underline-offset-4">{{ cmsBooking.locationLinkLabel }}</a></div>
        </aside>
        <section v-if="calendlyEmbedUrl" class="overflow-hidden border border-(--color-border) bg-white" aria-labelledby="calendar-heading">
          <div class="p-6"><h2 id="calendar-heading" class="font-display text-2xl">{{ cmsBooking.calendly?.heading }}</h2><p class="mt-3 text-sm leading-relaxed text-(--color-mutedbrown)">{{ cmsBooking.calendly?.description }}</p></div>
          <iframe :src="calendlyEmbedUrl" title="Workshop scheduling calendar" loading="lazy" class="h-[700px] w-full border-0"></iframe>
          <a :href="cmsBooking.calendly.link" target="_blank" rel="noopener noreferrer" class="m-6 inline-block text-sm underline">Open the calendar in a new tab ↗</a>
        </section>
      </div>
      <section class="border border-(--color-border) bg-white p-6 sm:p-9" aria-labelledby="request-heading">
        <h2 id="request-heading" class="font-display text-3xl sm:text-4xl">{{ section('request').heading }}</h2><CmsRichText :blocks="section('request').body?.slice(0,1)" class="mt-3 text-sm leading-relaxed text-(--color-mutedbrown)"/>
        <div v-if="designBrief" class="mt-6 border border-(--color-border) bg-[#FAF7F1] p-5"><h3 class="font-medium">Your design notes are included</h3><p class="mt-3 whitespace-pre-line break-words text-sm leading-relaxed text-(--color-mutedbrown)">{{ designBrief }}</p><button type="button" @click="removeDesignBrief" class="mt-3 text-sm underline underline-offset-4">Remove these notes</button></div>
        <form class="mt-7 grid gap-5" @submit.prevent="sendRequest">
          <label class="field">Workshop<select v-model="form.packageName" required class="control"><option v-for="pkg in packageOptions" :key="pkg">{{ pkg }}</option><option>Help me choose</option></select></label>
          <div class="grid gap-5 sm:grid-cols-2">
            <label class="field">Your name<input v-model.trim="form.name" required autocomplete="name" maxlength="120" class="control"></label>
            <label class="field">Email<input v-model.trim="form.email" required type="email" autocomplete="email" maxlength="254" class="control"></label>
          </div>
          <label class="field">Phone or WhatsApp with country code (optional)<input v-model.trim="form.phone" type="tel" autocomplete="tel" maxlength="40" placeholder="For example, +94…" class="control"></label>
          <div class="grid gap-5 sm:grid-cols-2">
            <label class="field">Preferred date (optional)<input v-model="form.preferredDate" type="date" :min="todayInColombo" class="control"></label>
            <label class="field">Number of makers<select v-model="form.makers" class="control"><option>1</option><option>2</option><option>3</option><option>4 or more — confirm space</option></select></label>
          </div>
          <label class="field">Ring ideas, metal or stone, budget range and deadline<textarea v-model.trim="form.message" rows="4" maxlength="2000" placeholder="What would you like to make? Silver, gold or a particular gem? Include a reference, budget range, proposal or flight date if relevant…" class="control py-3"></textarea></label>
          <label class="flex items-start gap-3 text-sm leading-relaxed text-(--color-mutedbrown)"><input v-model="form.newsletterConsent" type="checkbox" class="mt-1 h-4 w-4 accent-(--color-action)">{{ cmsForm.newsletterConsentLabel || 'Email me occasional workshop news and updates (optional).' }}</label>
          <button type="submit" :disabled="isSubmitting || submitState === 'success'" class="ui-button ui-button-solid min-h-12 px-6 py-3 disabled:cursor-wait disabled:opacity-60">{{ isSubmitting ? 'Sending your request…' : submitState === 'success' ? 'Request sent' : 'Send workshop request' }}</button>
          <p v-if="submitMessage" role="status" class="text-sm leading-relaxed" :class="submitState === 'error' ? 'text-red-800' : 'text-(--color-mutedbrown)'">{{ submitMessage }}</p>
          <button v-if="submitState === 'success'" type="button" @click="startNewRequest" class="justify-self-start text-sm underline underline-offset-4">Start a new request</button>
          <p class="text-xs leading-relaxed text-(--color-mutedbrown)">We use your contact details to reply to this inquiry. A request does not reserve a session until we confirm availability with you. <RouterLink to="/privacy-policy" class="underline">Privacy policy</RouterLink></p>
          <a :href="whatsappHref" target="_blank" rel="noopener noreferrer" class="ui-button ui-button-outline inline-flex min-h-12 items-center justify-center px-4 py-3">Prefer WhatsApp? Review &amp; send your request ↗</a>
          <p class="text-xs leading-relaxed text-(--color-mutedbrown)">WhatsApp opens a draft with your details. Review it and tap send in WhatsApp.</p>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup>
import CmsRichText from '../components/CmsRichText.vue';
import { useEditorialPage } from '../composables/useEditorialPage.js';
const { page: editorialPage, section } = useEditorialPage('/bookexperience');
const planningSteps = computed(() => editorialPage.value?.sections?.filter(item => /^planningStep/.test(item.key)) ?? []);
import { initialContent } from '../utils/sanity.js';
import { computed, onMounted, reactive, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useBusinessLinks } from '../composables/useBusinessLinks.js';
const publicLinks = useBusinessLinks();
import { clearRingBrief, readRingBrief } from '../utils/ringBrief.js'
import { currentWorkshopPackages } from '../content/workshopPackages.js'
import { submitLead } from '../utils/leads.js'
import { fetchBookingPageContentFromSanity, fetchContactFormContentFromSanity, fetchOffersPageContentFromSanity } from '../utils/sanity.js'
const route = useRoute()
const cmsBooking = ref(initialContent('BOOKING_PAGE_QUERY') ?? {}), cmsForm = ref(initialContent('CONTACT_FORM_QUERY') ?? {}), cmsOffers = ref(initialContent('OFFERS_PAGE_QUERY') ?? {})
const hero = computed(() => ({ eyebrow: cmsBooking.value.hero?.eyebrow || 'A private workshop in Negombo', title: cmsBooking.value.hero?.title || 'Make time to make something yours.', description: cmsBooking.value.hero?.description || 'Tell us when you are visiting and what you would love to create. We will help you choose a suitable ring-making session.' }))
const packageOptions = computed(() => currentWorkshopPackages(cmsOffers.value.packages).map(pkg => pkg.name))
const calendlyEmbedUrl = computed(() => { const cal = cmsBooking.value.calendly; if (cal?.enabled === false || !/^https:\/\/calendly\.com\/.+/i.test(cal?.link || '')) return ''; const url = new URL(cal.link); url.searchParams.set('embed_domain','www.theringexperience.lk'); url.searchParams.set('hide_event_type_details','1'); return url.href })
const isShortCalendar = computed(() => /\/30min(?:\/|$)/i.test(new URL(calendlyEmbedUrl.value || 'https://calendly.com/').pathname))
const form = reactive({ packageName:'Help me choose',name:'',email:'',phone:'',preferredDate:'',makers:'1',message:'',newsletterConsent:false })
const todayInColombo = new Date(Date.now() + 19800000).toISOString().slice(0,10)
const designBrief = ref(route.query.from === 'design' ? readRingBrief() : '')
const isSubmitting = ref(false), submitState = ref('idle'), submitMessage = ref('')
const inquiryMessage = computed(() => [`Number of makers: ${form.makers}`,form.message,designBrief.value].filter(Boolean).join('\n\n'))
const whatsappHref = computed(() => `${publicLinks.value.whatsappUrl}?text=${encodeURIComponent(['Hello The Ring Experience, I would like to plan a workshop.', `Workshop: ${form.packageName}`,`Number of makers: ${form.makers}`,form.name && `Name: ${form.name}`,form.email && `Email: ${form.email}`,form.phone && `Phone: ${form.phone}`,form.preferredDate && `Preferred date: ${form.preferredDate}`,form.message,designBrief.value].filter(Boolean).join('\n\n'))}`)
function removeDesignBrief() { designBrief.value = ''; clearRingBrief() }
function startNewRequest() { Object.assign(form,{packageName:'Help me choose',name:'',email:'',phone:'',preferredDate:'',makers:'1',message:'',newsletterConsent:false}); removeDesignBrief(); submitState.value = 'idle'; submitMessage.value = '' }
async function sendRequest() {
  if (isSubmitting.value || submitState.value === 'success') return
  if (form.preferredDate && form.preferredDate < todayInColombo) { submitState.value = 'error'; submitMessage.value = 'Please choose today or a future date.'; return }
  isSubmitting.value = true; submitState.value = 'idle'; submitMessage.value = ''
  try {
    const saved = await submitLead({ source:'book-experience', packageName:form.packageName, name:form.name, email:form.email, phone:form.phone, preferredDate:form.preferredDate, message:inquiryMessage.value, newsletterConsent:form.newsletterConsent })
    submitState.value = saved ? 'success' : 'error'
    submitMessage.value = saved ? 'Thank you — your request was delivered. We will reply to discuss availability and confirm the details. Your session is not reserved yet.' : 'We could not confirm delivery. Your details are still here; use the WhatsApp button below to contact the workshop.'
    if (saved) clearRingBrief()
  } finally { isSubmitting.value = false }
}
onMounted(async () => {
  const results = await Promise.allSettled([fetchBookingPageContentFromSanity(),fetchContactFormContentFromSanity(),fetchOffersPageContentFromSanity()])
  ;[cmsBooking,cmsForm,cmsOffers].forEach((target,i) => { if (results[i].status === 'fulfilled') target.value = results[i].value || {} })
  if (typeof route.query.package === 'string' && packageOptions.value.includes(route.query.package)) form.packageName = route.query.package
})
</script>
<style scoped>
.field { display:grid; gap:.5rem; font-size:.875rem; font-weight:500; }
.control { min-height:3rem; width:100%; min-width:0; border:1px solid var(--color-border); background:white; padding-left:.75rem; padding-right:.75rem; font-size:1rem; font-weight:400; border-radius:.125rem; }
.control:focus { outline:3px solid var(--color-noisette); outline-offset:2px; }
</style>
