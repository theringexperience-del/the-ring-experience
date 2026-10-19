<template>
  <div class="bg-[#FAF7F1] text-[#38291F]">
    <header class="bg-[#EFE7DA] px-[6%] pb-14 pt-32 sm:pb-18 sm:pt-40">
      <div class="mx-auto max-w-6xl"><p class="text-xs uppercase tracking-[.22em] text-[#795B3C]">{{ hero.eyebrow }}</p><h1 class="mt-5 max-w-4xl font-display text-5xl leading-[1.08] sm:text-7xl">{{ hero.title }}</h1><p class="mt-6 max-w-2xl text-lg leading-relaxed text-[#604B39]">{{ hero.description }}</p></div>
    </header>
    <div class="mx-auto grid max-w-6xl gap-8 px-[6%] py-12 lg:grid-cols-[.85fr_1.15fr] sm:py-18">
      <div class="self-start space-y-6">
        <aside class="border border-[#CDBFA9] bg-[#EFE7DA] p-7 sm:p-9">
          <p class="text-xs uppercase tracking-[.18em] text-[#795B3C]">Your time at the workbench</p>
          <h2 class="mt-4 font-display text-3xl leading-tight">A little planning. A personal piece.</h2>
          <ol class="mt-7 space-y-6 text-[#604B39]">
            <li><strong class="block text-[#38291F]">01 · Tell us your dates</strong><p class="mt-2 leading-relaxed">Choose a workshop or ask for guidance. Let us know how many people will make a ring.</p></li>
            <li><strong class="block text-[#38291F]">02 · Share your ideas</strong><p class="mt-2 leading-relaxed">A simple band, a gemstone or a meaningful inscription — we will discuss what suits your session.</p></li>
            <li><strong class="block text-[#38291F]">03 · Confirm together</strong><p class="mt-2 leading-relaxed">We reply with availability, materials, timing and costs. Your booking is confirmed once we agree the details with you.</p></li>
          </ol>
          <RouterLink to="/design-your-ring" class="mt-7 inline-block text-sm text-[#755024] underline underline-offset-4">Build your ring design notes ↗</RouterLink>
          <div class="mt-8 border-t border-[#CDBFA9] pt-6 text-sm leading-relaxed text-[#604B39]">
            <p class="font-medium text-[#38291F]">The Ring Experience · Negombo</p><p>63/1 Porutota Road, Negombo 11500, Sri Lanka</p>
            <a :href="GOOGLE_MAPS_URL" target="_blank" rel="noopener noreferrer" class="mt-3 inline-block text-[#755024] underline underline-offset-4">Google Maps &amp; directions ↗</a>
            <p class="mt-4">Have a flight or onward journey? Tell us before booking so we can advise on timing.</p>
          </div>
        </aside>
        <section v-if="calendlyEmbedUrl" class="overflow-hidden border border-[#CDBFA9] bg-white" aria-labelledby="calendar-heading">
          <div class="p-6"><h2 id="calendar-heading" class="font-display text-2xl">{{ cmsBooking.calendly?.heading || 'Explore session times' }}</h2><p v-if="cmsBooking.calendly?.description" class="mt-3 text-sm leading-relaxed text-[#604B39]">{{ cmsBooking.calendly.description }}</p></div>
          <iframe :src="calendlyEmbedUrl" title="Workshop scheduling calendar" loading="lazy" class="h-[700px] w-full border-0"></iframe>
          <a :href="cmsBooking.calendly.link" target="_blank" rel="noopener noreferrer" class="m-6 inline-block text-sm underline">Open the calendar in a new tab ↗</a>
        </section>
      </div>
      <section class="border border-[#CDBFA9] bg-white p-6 sm:p-9" aria-labelledby="request-heading">
        <h2 id="request-heading" class="font-display text-3xl sm:text-4xl">Plan your workshop</h2><p class="mt-3 text-sm leading-relaxed text-[#604B39]">Send your preferred date and ring ideas. No payment is taken through this form.</p>
        <div v-if="designBrief" class="mt-6 border border-[#CDBFA9] bg-[#FAF7F1] p-5"><h3 class="font-medium">Your design notes are included</h3><p class="mt-3 whitespace-pre-line break-words text-sm leading-relaxed text-[#604B39]">{{ designBrief }}</p><button type="button" @click="removeDesignBrief" class="mt-3 text-sm underline underline-offset-4">Remove these notes</button></div>
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
          <label class="field">Ring ideas or questions<textarea v-model.trim="form.message" rows="4" maxlength="2000" placeholder="Preferred time, designs, gemstones or travel plans…" class="control py-3"></textarea></label>
          <label class="flex items-start gap-3 text-sm leading-relaxed text-[#604B39]"><input v-model="form.newsletterConsent" type="checkbox" class="mt-1 h-4 w-4 accent-[#755024]">{{ cmsForm.newsletterConsentLabel || 'Email me occasional workshop news and updates (optional).' }}</label>
          <button type="submit" :disabled="isSubmitting || submitState === 'success'" class="min-h-12 bg-[#704D29] px-6 py-3 text-sm font-medium text-white hover:bg-[#4B341F] disabled:cursor-wait disabled:opacity-60">{{ isSubmitting ? 'Sending your request…' : submitState === 'success' ? 'Request sent' : 'Send workshop request' }}</button>
          <p v-if="submitMessage" role="status" class="text-sm leading-relaxed" :class="submitState === 'error' ? 'text-red-800' : 'text-[#604B39]'">{{ submitMessage }}</p>
          <button v-if="submitState === 'success'" type="button" @click="startNewRequest" class="justify-self-start text-sm underline underline-offset-4">Start a new request</button>
          <p class="text-xs leading-relaxed text-[#604B39]">We use your contact details to reply to this inquiry. A request does not reserve a session until we confirm availability with you. <RouterLink to="/privacy-policy" class="underline">Privacy policy</RouterLink></p>
          <a :href="whatsappHref" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-12 items-center justify-center border border-[#755024] px-4 py-3 text-center text-sm text-[#604B39] hover:bg-[#EFE7DA]">Prefer WhatsApp? Review &amp; send your request ↗</a>
          <p class="text-xs leading-relaxed text-[#604B39]">WhatsApp opens a draft with your details. Review it and tap send in WhatsApp.</p>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { GOOGLE_MAPS_URL, WORKSHOP_WHATSAPP } from '../utils/businessProfile.js'
import { clearRingBrief, readRingBrief } from '../utils/ringBrief.js'
import { submitLead } from '../utils/leads.js'
import { fetchBookingPageContentFromSanity, fetchContactFormContentFromSanity, fetchOffersPageContentFromSanity } from '../utils/sanity.js'
const route = useRoute()
const cmsBooking = ref({}), cmsForm = ref({}), cmsOffers = ref({})
const hero = computed(() => ({ eyebrow: cmsBooking.value.hero?.eyebrow || 'A private workshop in Negombo', title: cmsBooking.value.hero?.title || 'Make time to make something yours.', description: cmsBooking.value.hero?.description || 'Tell us when you are visiting and what you would love to create. We will help you choose a suitable ring-making session.' }))
const packageOptions = computed(() => { const names = (cmsOffers.value.packages || []).filter(p => p.isVisible !== false).map(p => p.name).filter(Boolean); return names.length ? names : ['The Essential','The Signature','The Ceremony'] })
const calendlyEmbedUrl = computed(() => { const cal = cmsBooking.value.calendly; if (cal?.enabled === false || !/^https:\/\/calendly\.com\/.+/i.test(cal?.link || '')) return ''; const url = new URL(cal.link); url.searchParams.set('embed_domain','www.theringexperience.lk'); url.searchParams.set('hide_event_type_details','1'); return url.href })
const form = reactive({ packageName:'Help me choose',name:'',email:'',phone:'',preferredDate:'',makers:'1',message:'',newsletterConsent:false })
const todayInColombo = new Date(Date.now() + 19800000).toISOString().slice(0,10)
const designBrief = ref(route.query.from === 'design' ? readRingBrief() : '')
const isSubmitting = ref(false), submitState = ref('idle'), submitMessage = ref('')
const inquiryMessage = computed(() => [`Number of makers: ${form.makers}`,form.message,designBrief.value].filter(Boolean).join('\n\n'))
const whatsappHref = computed(() => `${WORKSHOP_WHATSAPP}?text=${encodeURIComponent(['Hello The Ring Experience, I would like to plan a workshop.', `Workshop: ${form.packageName}`,`Number of makers: ${form.makers}`,form.name && `Name: ${form.name}`,form.email && `Email: ${form.email}`,form.phone && `Phone: ${form.phone}`,form.preferredDate && `Preferred date: ${form.preferredDate}`,form.message,designBrief.value].filter(Boolean).join('\n\n'))}`)
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
.control { min-height:3rem; width:100%; min-width:0; border:1px solid #B9A990; background:white; padding-left:.75rem; padding-right:.75rem; font-size:1rem; font-weight:400; border-radius:0; }
.control:focus { outline:2px solid #755024; outline-offset:2px; }
</style>
