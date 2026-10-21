<template>
  <div class="bg-[#FAF7F1] text-(--color-darkbrown)">
    <header class="bg-(--color-panel) px-[6%] pb-14 pt-32 sm:pb-18 sm:pt-40">
      <div class="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_.75fr]">
        <div><p class="text-xs uppercase tracking-[.22em] text-(--color-mutedbrown)">{{ section('hero').eyebrow }}</p>
        <h1 class="mt-5 max-w-4xl font-display text-5xl leading-[1.08] sm:text-7xl">{{ section('hero').heading }}</h1>
        <CmsRichText :blocks="section('hero').body" class="mt-6 max-w-2xl text-lg leading-relaxed text-(--color-mutedbrown)"/></div>
        <figure class="overflow-hidden"><img @error="useClientImage($event, fallbackHero.image)" :src="toWebImage(section('hero').image)" :alt="section('hero').imageAlt" width="998" height="1576" fetchpriority="high" decoding="async" class="h-72 w-full object-cover object-[center_60%] sm:h-96 lg:h-[32rem]"><figcaption class="bg-[#E1D3BD] px-4 py-3 text-sm italic text-(--color-mutedbrown)">{{ section('hero').caption }}</figcaption></figure>
      </div>
    </header>
    <div class="mx-auto grid max-w-6xl gap-8 px-[6%] py-12 lg:max-w-7xl lg:grid-cols-[minmax(0,1fr)_22rem] sm:py-18">
      <section aria-labelledby="choices-title">
        <p class="text-xs uppercase tracking-[.18em] text-(--color-mutedbrown)">{{ section('choices').eyebrow }}</p>
        <h2 id="choices-title" class="mt-3 font-display text-3xl sm:text-4xl">{{ section('choices').heading }}</h2>
        <CmsRichText :blocks="section('choices').body?.slice(0,1)" class="mt-4 leading-relaxed text-(--color-mutedbrown)"/>
        <div class="mt-8 grid gap-5 sm:grid-cols-2">
          <label v-for="field in choiceFields" :key="field.key" class="grid gap-2 text-sm font-medium">
            {{ field.label }}
            <select v-model="form[field.key]" class="border border-(--color-border) bg-white text-(--color-darkbrown) rounded-sm min-h-12 w-full px-3 text-base font-normal focus:outline-2 focus:outline-offset-2 focus:outline-(--color-action)">
              <option v-for="option in field.options" :key="option">{{ option }}</option>
            </select>
          </label>
          <label class="grid gap-2 text-sm font-medium">Ring size, if known
            <input v-model.trim="form.size" maxlength="40" placeholder="For example, UK L — or leave blank" class="border border-(--color-border) bg-white text-(--color-darkbrown) rounded-sm min-h-12 w-full px-3 text-base font-normal focus:outline-2 focus:outline-offset-2 focus:outline-(--color-action)">
          </label>
          <label class="grid gap-2 text-sm font-medium">Engraving idea, if any
            <input v-model.trim="form.engraving" maxlength="60" placeholder="Initials, a date or a short phrase" class="border border-(--color-border) bg-white text-(--color-darkbrown) rounded-sm min-h-12 w-full px-3 text-base font-normal focus:outline-2 focus:outline-offset-2 focus:outline-(--color-action)">
          </label>
        </div>
        <label class="mt-6 grid gap-2 text-sm font-medium">The story or details behind your ring
          <textarea v-model.trim="form.notes" maxlength="500" rows="4" placeholder="Tell us about the look you like, a reference photo you will send, or anything you want to ask." class="w-full border border-(--color-border) bg-white p-3 text-base font-normal focus:outline-2 focus:outline-offset-2 focus:outline-(--color-action)"></textarea>
        </label>
        <CmsRichText :blocks="section('choices').body?.slice(1)" class="mt-4 text-sm leading-relaxed text-(--color-mutedbrown)"/>
        <div class="mt-10 border-t border-(--color-border) pt-7">
          <h2 class="font-display text-2xl">{{ section('inspiration').heading }}</h2>
          <div class="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-(--color-action) underline underline-offset-4">
            <RouterLink v-for="link in section('inspiration').links?.slice(0,5)" :key="link.href" :to="link.href">{{ link.label }}</RouterLink>
          </div>
          <RouterLink v-if="section('inspiration').links?.[5]" :to="section('inspiration').links[5].href" class="mt-5 inline-block text-sm text-(--color-action) underline underline-offset-4">{{ section('inspiration').links[5].label }}</RouterLink>
        </div>
      </section>
      <aside class="self-start border border-(--color-border) bg-(--color-panel) p-6 lg:sticky lg:top-24 sm:p-8" aria-labelledby="brief-title">
        <p class="text-xs uppercase tracking-[.18em] text-(--color-mutedbrown)">{{ section('brief').eyebrow }}</p>
        <h2 id="brief-title" class="mt-4 font-display text-3xl">{{ section('brief').heading }}</h2>
        <dl class="mt-6 divide-y divide-(--color-border)">
          <div v-for="field in choiceFields" :key="field.key" class="py-3"><dt class="text-xs uppercase tracking-wide text-(--color-mutedbrown)">{{ field.label }}</dt><dd class="mt-1 text-sm">{{ form[field.key] }}</dd></div>
          <div v-if="form.size" class="py-3"><dt class="text-xs uppercase tracking-wide text-(--color-mutedbrown)">Ring size</dt><dd class="mt-1 text-sm">{{ form.size }}</dd></div>
          <div v-if="form.engraving" class="py-3"><dt class="text-xs uppercase tracking-wide text-(--color-mutedbrown)">Engraving</dt><dd class="mt-1 break-words text-sm">{{ form.engraving }}</dd></div>
          <div v-if="form.notes" class="py-3"><dt class="text-xs uppercase tracking-wide text-(--color-mutedbrown)">Your story</dt><dd class="mt-1 break-words text-sm leading-relaxed">{{ form.notes }}</dd></div>
        </dl>
        <button type="button" @click="carryToBooking" class="ui-button ui-button-solid mt-7 min-h-12 w-full px-5 py-3 focus:outline-2 focus:outline-offset-2 focus:outline-(--color-action)">Check workshop availability ↗</button>
        <a :href="whatsappHref" target="_blank" rel="noopener noreferrer" class="ui-button ui-button-outline mt-3 flex min-h-12 w-full items-center justify-center px-4 py-3">Discuss this design on WhatsApp ↗</a>
        <button type="button" @click="copyBrief" class="mt-4 text-sm underline underline-offset-4">Copy design notes</button>
        <p role="status" class="mt-2 text-sm">{{ copyMessage }}</p>
        <CmsRichText :blocks="section('brief').body" class="mt-5 text-xs leading-relaxed text-(--color-mutedbrown)"/>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { clientFallbacks } from '../content/clientFallback.js';
import { useClientImage } from '../utils/contentFallback.js';
const fallbackHero = clientFallbacks.EDITORIAL_PAGES_QUERY.find(page => page.path === '/design-your-ring').sections.find(section => section.key === 'hero');
import CmsRichText from '../components/CmsRichText.vue';
import { useEditorialPage } from '../composables/useEditorialPage.js';
import { toWebImage } from '../utils/sanity.js';
const { page, section } = useEditorialPage('/design-your-ring');
import { computed, reactive, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useBusinessLinks } from '../composables/useBusinessLinks.js';
const publicLinks = useBusinessLinks();
import { saveRingBrief } from '../utils/ringBrief.js'

const router = useRouter()
const choiceFields = computed(() => page.value?.choices ?? []);
const form = reactive(Object.fromEntries([...choiceFields.value.map(f => [f.key, f.options[0]]), ['size',''], ['engraving',''], ['notes','']]))
watch(choiceFields, fields => { for (const field of fields) if (!form[field.key]) form[field.key] = field.options?.[0] ?? ''; }, { immediate: true });
const brief = computed(() => ['My ring design ideas', ...choiceFields.value.map(f => `${f.label}: ${form[f.key]}`), form.size && `Ring size: ${form.size}`, form.engraving && `Engraving idea: ${form.engraving}`, form.notes && `Notes: ${form.notes}`].filter(Boolean).join('\n'))
const whatsappHref = computed(() => `${publicLinks.value.whatsappUrl}?text=${encodeURIComponent(`Hello The Ring Experience, I would like to discuss a workshop in Negombo.\n\n${brief.value}`)}`)
const copyMessage = ref('')
function carryToBooking() { saveRingBrief(brief.value); router.push('/bookexperience?from=design') }
async function copyBrief() {
  try { await navigator.clipboard.writeText(brief.value); copyMessage.value = 'Design notes copied.' }
  catch { copyMessage.value = 'Copy is unavailable in this browser. You can send the notes through WhatsApp or the booking request.' }
}
</script>
