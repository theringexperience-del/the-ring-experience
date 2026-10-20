<template>
  <div class="bg-[#FAF7F1] text-[#38291F]">
    <header class="bg-[#EFE7DA] px-[6%] pb-14 pt-32 sm:pb-18 sm:pt-40">
      <div class="mx-auto max-w-6xl">
        <p class="text-xs uppercase tracking-[.22em] text-[#795B3C]">From an idea to the workbench</p>
        <h1 class="mt-5 max-w-4xl font-display text-5xl leading-[1.08] sm:text-7xl">A ring that feels like you.</h1>
        <p class="mt-6 max-w-2xl text-lg leading-relaxed text-[#604B39]">Choose a few details for your custom ring. Send your ideas to our Negombo workshop, or bring them into a booking request. You can leave anything undecided.</p>
      </div>
    </header>
    <div class="mx-auto grid max-w-6xl gap-8 px-[6%] py-12 lg:grid-cols-[minmax(0,1fr)_22rem] sm:py-18">
      <section aria-labelledby="choices-title">
        <p class="text-xs uppercase tracking-[.18em] text-[#795B3C]">01 · Your starting point</p>
        <h2 id="choices-title" class="mt-3 font-display text-3xl sm:text-4xl">What would you love to make?</h2>
        <p class="mt-4 leading-relaxed text-[#604B39]">These are ideas to discuss. We confirm suitable designs, materials, gemstone availability, price and timing with you before the session.</p>
        <div class="mt-8 grid gap-5 sm:grid-cols-2">
          <label v-for="field in choiceFields" :key="field.key" class="grid gap-2 text-sm font-medium">
            {{ field.label }}
            <select v-model="form[field.key]" class="min-h-12 w-full border border-[#B9A990] bg-white px-3 text-base font-normal focus:outline-2 focus:outline-offset-2 focus:outline-[#755024]">
              <option v-for="option in field.options" :key="option">{{ option }}</option>
            </select>
          </label>
          <label class="grid gap-2 text-sm font-medium">Ring size, if known
            <input v-model.trim="form.size" maxlength="40" placeholder="For example, UK L — or leave blank" class="min-h-12 w-full border border-[#B9A990] bg-white px-3 text-base font-normal focus:outline-2 focus:outline-offset-2 focus:outline-[#755024]">
          </label>
          <label class="grid gap-2 text-sm font-medium">Engraving idea, if any
            <input v-model.trim="form.engraving" maxlength="60" placeholder="Initials, a date or a short phrase" class="min-h-12 w-full border border-[#B9A990] bg-white px-3 text-base font-normal focus:outline-2 focus:outline-offset-2 focus:outline-[#755024]">
          </label>
        </div>
        <label class="mt-6 grid gap-2 text-sm font-medium">The story or details behind your ring
          <textarea v-model.trim="form.notes" maxlength="500" rows="4" placeholder="Tell us about the look you like, a reference photo you will send, or anything you want to ask." class="w-full border border-[#B9A990] bg-white p-3 text-base font-normal focus:outline-2 focus:outline-offset-2 focus:outline-[#755024]"></textarea>
        </label>
        <p class="mt-4 text-sm leading-relaxed text-[#604B39]">Stone setting, engraving and intricate designs can add time and cost. An artisan handles the technical stages that need specialist skills. Gold options are quoted on request.</p>
        <div class="mt-10 border-t border-[#CDBFA9] pt-7">
          <h2 class="font-display text-2xl">Need a little inspiration?</h2>
          <div class="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#755024] underline underline-offset-4">
            <RouterLink to="/gallery">Guest gallery</RouterLink>
            <RouterLink to="/journal/make-your-own-wedding-rings-sri-lanka">Wedding bands</RouterLink>
            <RouterLink to="/journal/engagement-ring-design-workshop-guide">Engagement rings</RouterLink>
            <RouterLink to="/gemstones">Gemstones</RouterLink>
            <RouterLink to="/custom-jewellery-sri-lanka">Custom jewellery guide</RouterLink>
          </div>
          <RouterLink to="/ring-sketch-prompt" class="mt-5 inline-block text-sm text-[#755024] underline underline-offset-4">Explore ideas with the optional AI sketch prompt tool ↗</RouterLink>
        </div>
      </section>
      <aside class="self-start border border-[#C8B79D] bg-[#EEE4D6] p-6 lg:sticky lg:top-24 sm:p-8" aria-labelledby="brief-title">
        <p class="text-xs uppercase tracking-[.18em] text-[#795B3C]">02 · Take your ideas with you</p>
        <h2 id="brief-title" class="mt-4 font-display text-3xl">Your design notes</h2>
        <dl class="mt-6 divide-y divide-[#CDBFA9]">
          <div v-for="field in choiceFields" :key="field.key" class="py-3"><dt class="text-xs uppercase tracking-wide text-[#795B3C]">{{ field.label }}</dt><dd class="mt-1 text-sm">{{ form[field.key] }}</dd></div>
          <div v-if="form.size" class="py-3"><dt class="text-xs uppercase tracking-wide text-[#795B3C]">Ring size</dt><dd class="mt-1 text-sm">{{ form.size }}</dd></div>
          <div v-if="form.engraving" class="py-3"><dt class="text-xs uppercase tracking-wide text-[#795B3C]">Engraving</dt><dd class="mt-1 break-words text-sm">{{ form.engraving }}</dd></div>
          <div v-if="form.notes" class="py-3"><dt class="text-xs uppercase tracking-wide text-[#795B3C]">Your story</dt><dd class="mt-1 break-words text-sm leading-relaxed">{{ form.notes }}</dd></div>
        </dl>
        <button type="button" @click="carryToBooking" class="mt-7 min-h-12 w-full bg-[#704D29] px-5 py-3 text-sm font-medium text-white hover:bg-[#4B341F] focus:outline-2 focus:outline-offset-2 focus:outline-[#755024]">Check workshop availability ↗</button>
        <a :href="whatsappHref" target="_blank" rel="noopener noreferrer" class="mt-3 flex min-h-12 w-full items-center justify-center border border-[#755024] px-4 py-3 text-center text-sm hover:bg-white">Discuss this design on WhatsApp ↗</a>
        <button type="button" @click="copyBrief" class="mt-4 text-sm underline underline-offset-4">Copy design notes</button>
        <p role="status" class="mt-2 text-sm">{{ copyMessage }}</p>
        <p class="mt-5 text-xs leading-relaxed text-[#604B39]">Opening WhatsApp creates a draft for you to review and send. A design brief is the start of a conversation; it does not reserve a session.</p>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { WORKSHOP_WHATSAPP } from '../utils/businessProfile.js'
import { saveRingBrief } from '../utils/ringBrief.js'

const router = useRouter()
const choiceFields = [
  { key: 'purpose', label: 'The occasion', options: ['A ring for myself', 'Wedding bands', 'An engagement ring', 'Anniversary or meaningful gift', 'Help me choose'] },
  { key: 'metal', label: 'Metal', options: ['Sterling silver', 'Gold — request a quote', 'Help me choose'] },
  { key: 'shape', label: 'Band shape', options: ['Soft rounded band', 'Flat band', 'Organic band', 'Help me choose'] },
  { key: 'finish', label: 'Finish', options: ['Polished', 'Brushed / matte', 'Hammered texture', 'Help me choose'] },
  { key: 'stone', label: 'Gemstone', options: ['No gemstone', 'Explore gemstone options', 'I have a stone to discuss'] },
  { key: 'making', label: 'At the workbench', options: ['I would like to do as much as possible', 'I am happy with shared making', 'Help me choose a suitable project'] },
]
const form = reactive(Object.fromEntries([...choiceFields.map(f => [f.key, f.options[0]]), ['size',''], ['engraving',''], ['notes','']]))
const brief = computed(() => ['My ring design ideas', ...choiceFields.map(f => `${f.label}: ${form[f.key]}`), form.size && `Ring size: ${form.size}`, form.engraving && `Engraving idea: ${form.engraving}`, form.notes && `Notes: ${form.notes}`].filter(Boolean).join('\n'))
const whatsappHref = computed(() => `${WORKSHOP_WHATSAPP}?text=${encodeURIComponent(`Hello The Ring Experience, I would like to discuss a workshop in Negombo.\n\n${brief.value}`)}`)
const copyMessage = ref('')
function carryToBooking() { saveRingBrief(brief.value); router.push('/bookexperience?from=design') }
async function copyBrief() {
  try { await navigator.clipboard.writeText(brief.value); copyMessage.value = 'Design notes copied.' }
  catch { copyMessage.value = 'Copy is unavailable in this browser. You can send the notes through WhatsApp or the booking request.' }
}
</script>
