<template>
  <main id="designYourRing" ref="pageRoot" class="w-full">
    <section data-reveal class="w-full pt-28 pb-12 sm:pt-32 sm:pb-14 lg:pt-36 lg:pb-16">
      <div class="mx-auto w-11/12 sm:w-10/12">
        <div class="mx-auto max-w-4xl text-center">
          <p class="text-xs tracking-[0.2em] text-(--color-mutedbrown) uppercase">The Ring Experience</p>
          <h1 class="mt-3 font-display text-6xl leading-[0.92] text-(--color-brown) sm:text-7xl lg:text-8xl">
            Design Your Ring
          </h1>
          <p class="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-(--color-brown) sm:text-lg" style="opacity: 0.85;">
            Create a luxury AI image prompt for 4 handcrafted ring sketch concepts, then develop the chosen concept into a final artisan sketch sheet.
          </p>
          <div class="mx-auto mt-8 h-px w-24 bg-(--color-noisette)"></div>
        </div>
      </div>
    </section>

    <section class="w-full pb-20 sm:pb-24 lg:pb-28">
      <div class="mx-auto w-11/12 sm:w-10/12">
        <div data-reveal class="step-track grid grid-cols-1 gap-3 md:grid-cols-4">
          <div
            v-for="(step, index) in steps"
            :key="step"
            class="step-pill"
            :class="{ active: index < activeStepCount }"
            :data-step="index + 1"
          >
            <span>{{ step }}</span>
          </div>
        </div>

        <section data-reveal class="builder-card mt-5">
          <p class="builder-title font-display text-3xl leading-tight text-(--color-brown) sm:text-4xl">Choose Your Experience</p>

          <div class="package-selector mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <button
              v-for="packageCard in packageCards"
              :key="packageCard.key"
              type="button"
              class="package-card"
              :class="{ active: selectedPackageKey === packageCard.key }"
              @click="selectedPackageKey = packageCard.key"
            >
              <span>{{ packageCard.label }}</span>
              <strong>{{ packageCard.title }}</strong>
              <small>{{ packageCard.description }}</small>
            </button>
          </div>

          <div class="package-dots" aria-label="Package selector">
            <button
              v-for="packageCard in packageCards"
              :key="`dot-${packageCard.key}`"
              type="button"
              class="package-dot"
              :class="{ active: selectedPackageKey === packageCard.key }"
              :aria-label="`Select ${packageCard.label} package`"
              @click="selectedPackageKey = packageCard.key"
            ></button>
          </div>

          <p class="mt-5 border border-[#2A1E17]/12 bg-[#F4EFE8] p-5 text-sm leading-relaxed text-(--color-mutedbrown)">
            {{ selectedRule.name }} - {{ selectedRule.info }}
          </p>

          <div class="form-grid mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
            <label class="field-label">
              <span>Who is this ring for?</span>
              <select v-model="form.recipient" class="field-control">
                <option v-for="recipient in recipients" :key="recipient">{{ recipient }}</option>
              </select>
            </label>

            <label class="field-label">
              <span>Ring Purpose</span>
              <select v-model="form.purpose" class="field-control">
                <option v-for="purpose in purposes" :key="purpose">{{ purpose }}</option>
              </select>
            </label>

            <label class="field-label">
              <span>Material</span>
              <select v-model="form.material" class="field-control">
                <option>925 Silver</option>
                <option>Gold</option>
              </select>
            </label>

            <label class="field-label">
              <span>Band Shape</span>
              <select v-model="form.shape" class="field-control">
                <option v-for="shape in selectedOptions.shapes" :key="shape">{{ shape }}</option>
              </select>
            </label>

            <label class="field-label">
              <span>Texture</span>
              <select v-model="form.texture" class="field-control">
                <option v-for="texture in selectedOptions.textures" :key="texture">{{ texture }}</option>
              </select>
            </label>

            <label class="field-label">
              <span>Stone / Birthstone</span>
              <select v-model="form.stone" class="field-control">
                <option v-for="stone in selectedOptions.stones" :key="stone">{{ stone }}</option>
              </select>
            </label>

            <label class="field-label">
              <span>Stone Setting</span>
              <select v-model="form.setting" class="field-control">
                <option v-for="setting in selectedOptions.settings" :key="setting">{{ setting }}</option>
              </select>
            </label>

            <label class="field-label">
              <span>Design Mood</span>
              <select v-model="form.mood" class="field-control">
                <option v-for="mood in selectedOptions.moods" :key="mood">{{ mood }}</option>
              </select>
            </label>
          </div>

          <label class="field-label mt-6">
            <span>Describe The Person</span>
            <textarea
              v-model="form.description"
              maxlength="600"
              rows="5"
              class="field-control person-description min-h-36 resize-y leading-relaxed"
              placeholder="Example: She loves travelling, the ocean, sunsets, meaningful experiences, and handmade things that feel personal rather than expensive."
            ></textarea>
          </label>

          <div class="story-bottom mt-3">
            <div class="story-chips" aria-label="Quick story ideas">
              <button
                v-for="chip in storyChips"
                :key="chip"
                type="button"
                class="story-chip"
                @click="addStoryChip(chip)"
              >
                {{ chip }}
              </button>
            </div>

            <div class="text-xs text-(--color-mutedbrown)">
              <span>{{ form.description.length }}</span>/600 characters
            </div>
          </div>

          <button type="button" class="main-action mt-6 sm:w-auto" @click="generatePrompt">
            Generate AI Image Prompt
          </button>

          <p v-if="errorMessage" class="mt-4 border border-[#D7A190] bg-[#FFF0EC] p-4 text-sm leading-relaxed text-[#8B2F1C]">
            {{ errorMessage }}
          </p>
        </section>

        <section v-if="isResultVisible" ref="resultSection" data-reveal class="builder-card mt-7 text-center">
          <p class="text-xs tracking-[0.2em] text-(--color-mutedbrown) uppercase">AI Image Prompt Ready</p>
          <h2 class="mt-3 font-display text-5xl leading-tight text-(--color-brown) sm:text-6xl">Copy Your Prompt</h2>

          <p class="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-(--color-mutedbrown)">
            Your personal ring design prompt is ready. Copy it and paste it into ChatGPT, Gemini, Midjourney, DALL-E, or another AI image generator to create your custom sketch concepts.
          </p>

          <div class="mx-auto mt-6 grid max-w-5xl grid-cols-3 gap-2 sm:gap-3 xl:grid-cols-4">
            <button type="button" class="main-action" @click="copyPrompt">Copy</button>
            <button type="button" class="secondary-action" @click="downloadPrompt">Download</button>
            <a
              v-if="whatsappHref"
              class="whatsapp-action"
              :href="whatsappHref"
              target="_blank"
              rel="noreferrer"
              @click="markSketchStep"
            >
              Send On WhatsApp
            </a>
          </div>

          <RouterLink class="mt-4 inline-flex" to="/bookexperience">
            <Button type="button">
              Book Your Ring Experience
            </Button>
          </RouterLink>

          <p v-if="copyMessage" class="mt-4 text-sm text-(--color-brown)">{{ copyMessage }}</p>
        </section>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '../components/Button.vue'
import { useRevealAnimations } from '../composables/useRevealAnimations'
import { fetchFooterContentFromSanity, fetchSocialContentFromSanity } from '../utils/sanity'

const pageRoot = ref(null)
const resultSection = ref(null)
const { setupRevealAnimations } = useRevealAnimations(pageRoot, {
  selectors: ['[data-reveal]', '.builder-card'],
  start: 'top 86%',
})

const selectedPackageKey = ref('essential')
const finalPrompt = ref('')
const isResultVisible = ref(false)
const hasCopiedPrompt = ref(false)
const hasStartedSketches = ref(false)
const errorMessage = ref('')
const copyMessage = ref('')
const socialContent = ref({})
const footerContent = ref({})

const steps = ['1. Package', '2. Personalize', '3. Copy Prompt', '4. Create Sketches']
const recipients = ['Wife', 'Husband', 'Girlfriend', 'Boyfriend', 'Partner', 'Self']
const purposes = ['Protection Ring', 'Love Ring', 'Promise Ring', 'Memory Ring', 'Anniversary Ring', 'Self-Love Ring', 'Birthday Ring']
const storyChips = ['Ocean and sunsets', 'Quiet luxury', 'Protective energy', 'Bold personality']
const birthstones = [
  'No Stone',
  'Moonstone',
  'Black Sapphire',
  'Blue Sapphire',
  'Diamond',
  'Ruby',
  'Emerald',
  'Pearl',
  'Opal',
  'Garnet',
  'Aquamarine',
  'Amethyst',
  'Onyx',
  'Tourmaline',
  'Tanzanite',
  'Citrine',
  'Topaz',
  'Turquoise',
]

const activeStepCount = computed(() => {
  if (hasStartedSketches.value) return 4
  if (hasCopiedPrompt.value) return 3
  if (isResultVisible.value) return 2
  return 1
})

const packageCards = [
  {
    key: 'essential',
    label: 'Essential',
    title: '2 Hour Ring',
    description: 'Minimal, clean, beginner-friendly.',
  },
  {
    key: 'signature',
    label: 'Signature',
    title: '3-4 Hour Ring',
    description: 'Refined, detailed, and premium.',
  },
  {
    key: 'ceremony',
    label: 'Ceremony',
    title: 'Symbolic Ring',
    description: 'Meaningful, emotional, and ceremonial.',
  },
]

const options = {
  essential: {
    shapes: ['Minimal Thin Band', 'Rounded Comfort Band', 'Simple Organic Handmade Band'],
    textures: ['Clean Polished Finish', 'Soft Hammered Texture', 'Very Light Raw Forged Texture', 'Matte Brushed Finish'],
    stones: birthstones,
    settings: ['No Stone', 'Tiny Flush Set Stone', 'Very Simple Low Bezel'],
    moods: ['Quiet Luxury', 'Romantic Minimal', 'Ancient Handcrafted'],
  },
  signature: {
    shapes: ['Organic Handmade Band', 'Minimal Thin Band', 'Rounded Comfort Band', 'Wide Signet Ring'],
    textures: ['Raw Forged Texture', 'Hammered Texture', 'Matte Brushed Finish', 'Clean Polished Finish', 'Oxidized Antique Finish'],
    stones: birthstones,
    settings: ['Bezel Set Center Stone', 'Flush Set Stone', 'Simple Prong Set Stone', 'Three Small Stones', 'Hidden Inner Stone'],
    moods: ['Quiet Luxury', 'Bold Artistic', 'Ancient Handcrafted', 'Romantic Minimal'],
  },
  ceremony: {
    shapes: ['Organic Handmade Band', 'Wide Signet Ring', 'Minimal Thin Band', 'Rounded Comfort Band', 'Ceremonial Forged Band'],
    textures: ['Raw Forged Texture', 'Hammered Texture', 'Matte Brushed Finish', 'Clean Polished Finish', 'Oxidized Antique Finish'],
    stones: birthstones,
    settings: ['Bezel Set Center Stone', 'Raised Handmade Bezel', 'Protective Stone Frame', 'Simple Prong Set Stone', 'Three Small Stones', 'Hidden Inner Stone'],
    moods: ['Quiet Luxury', 'Bold Artistic', 'Ancient Handcrafted', 'Romantic Minimal', 'Ceremonial Symbolic'],
  },
}

const packageRules = {
  essential: {
    name: 'Essential Package',
    time: 'Simple 2 hour handmade ring experience',
    info: 'Minimal, clean, beginner-friendly rings. Best for simple bands, light texture, and very simple stone work.',
    complexity: 'simple, minimal, clean, beginner-friendly, realistic to handmake within 2 hours',
    allowed: `
- minimal thin bands
- rounded comfort bands
- clean polished bands
- simple organic handmade bands
- soft hammered texture
- very light raw forged texture
- one tiny flush-set stone only if needed
- no-stone designs are preferred`,
    settings: `
- No Stone is preferred
- Tiny Flush Set Stone is acceptable
- Very Simple Low Bezel is acceptable only if minimal
- Avoid prongs
- Avoid large stones
- Avoid three-stone designs
- Avoid hidden inner stones unless shown only as a tiny symbolic mark`,
    directions: `
Concept 1: Minimal refined band, clean luxury, very simple profile.
Concept 2: Soft organic handmade band, light artisan irregularity.
Concept 3: Simple symbolic ring, subtle line or hidden engraving idea.
Concept 4: Clean polished quiet luxury ring, elegant and minimal.`,
    limits: `
Keep every design extremely simple.
Keep every design wearable and realistic.
Do not create sculptural rings.
Do not create large stone rings.
Do not create advanced jewellery structures.`,
  },
  signature: {
    name: 'Signature Package',
    time: 'Refined 3-4 hour handmade ring experience',
    info: 'Refined artisan rings with stronger form, better texture, and one realistic premium stone setting.',
    complexity: 'refined, handcrafted, elegant, premium, realistic to handmake within 3-4 hours',
    allowed: `
- organic handmade bands
- refined forged texture
- hammered texture
- matte brushed finish
- clean polished finish
- single stone focus
- simple bezel-set center stone
- small flush-set accent stone
- basic prong setting only if realistic
- light asymmetry
- quiet luxury proportions`,
    settings: `
- Bezel Set Center Stone is preferred
- Flush Set Stone is acceptable
- Simple Prong Set Stone is acceptable only if not too delicate
- Three Small Stones only if small and realistic
- Hidden Inner Stone only as a subtle premium detail
- No pave
- No channel setting
- No invisible setting
- No complex gallery work`,
    directions: `
Concept 1: Minimal refined luxury, elegant proportions, quiet luxury.
Concept 2: Organic handmade artisan, forged texture, ancient jewellery feeling.
Concept 3: Stone-focused refined ring, one gemstone as the hero.
Concept 4: Artistic handmade form, controlled asymmetry, wearable and realistic.`,
    limits: `
The design may feel premium, but it must still be possible in a 3-4 hour handmade workshop.
No casting-only forms.
No extreme sculptural jewellery.`,
  },
  ceremony: {
    name: 'Ceremony Package',
    time: 'Premium symbolic handmade ceremony ring experience',
    info: 'Emotional, symbolic, and premium rings with ceremonial meaning while remaining traditionally handmade.',
    complexity: 'premium, symbolic, ceremonial, emotional, handcrafted, realistic through traditional jewellery techniques',
    allowed: `
- meaningful protection rings
- love rings
- promise rings
- memory rings
- organic forged bands
- symbolic silhouettes
- refined gemstone framing
- raised handmade bezel
- protective stone frame
- personal engraving
- ceremonial marks
- texture storytelling
- premium artisan composition`,
    settings: `
- Bezel Set Center Stone is strongly preferred
- Raised Handmade Bezel is acceptable
- Protective Stone Frame is acceptable
- Simple Prong Set Stone is acceptable only if realistic
- Hidden Inner Stone is acceptable as a symbolic detail
- Three Small Stones only if balanced and handmade
- No casting-only construction
- No pave
- No invisible setting
- No advanced gallery construction`,
    directions: `
Concept 1: Refined symbolic luxury, emotional but restrained.
Concept 2: Ancient ceremonial artisan, raw forged texture, spiritual character.
Concept 3: Stone-protection composition, gemstone framed as the emotional center.
Concept 4: Bold ceremonial sculpture, strong silhouette, handmade but not impossible.`,
    limits: `
The design can feel premium and ceremonial.
It must still be realistic for hand-forging, filing, soldering, bezel work, polishing, and hand finishing.
No fantasy jewellery.
No casting designs.
No impossible sculptural architecture.`,
  },
}

const form = reactive({
  recipient: 'Wife',
  purpose: 'Protection Ring',
  material: '925 Silver',
  shape: '',
  texture: '',
  stone: '',
  setting: '',
  mood: '',
  description: '',
})

const selectedOptions = computed(() => options[selectedPackageKey.value])
const selectedRule = computed(() => packageRules[selectedPackageKey.value])

const resetPackageChoices = () => {
  form.shape = selectedOptions.value.shapes[0]
  form.texture = selectedOptions.value.textures[0]
  form.stone = selectedOptions.value.stones[0]
  form.setting = selectedOptions.value.settings[0]
  form.mood = selectedOptions.value.moods[0]
}

watch(selectedPackageKey, resetPackageChoices, { immediate: true })

const addStoryChip = (chip) => {
  const current = form.description.trim()
  const next = current ? `${current}, ${chip}` : chip
  form.description = next.slice(0, 600)
}

const findLinkByLabel = (links, matcher) => {
  return links.find((link) => matcher.test(String(link?.label || '').trim()))
}

const toWhatsappUrl = (phoneNumber) => {
  const normalized = String(phoneNumber || '').replace(/\D/g, '')
  return normalized ? `https://wa.me/${normalized}` : ''
}

const whatsappBaseHref = computed(() => {
  const links = Array.isArray(socialContent.value?.links) ? socialContent.value.links : []
  return (
    socialContent.value?.whatsappDmUrl ||
    findLinkByLabel(links, /whats\s*app|whatsapp/i)?.href ||
    toWhatsappUrl(footerContent.value?.phone)
  )
})

const whatsappHref = computed(() => {
  const base = whatsappBaseHref.value
  if (!base) return ''

  const separator = base.includes('?') ? '&' : '?'
  const message = encodeURIComponent('Hi, I created a ring sketch prompt on The Ring Experience website. I would like to discuss my ring design.')
  return `${base}${separator}text=${message}`
})

const buildPersonalizationBrief = (description) => {
  const cleanDescription = description.trim()

  if (!cleanDescription) {
    return `The customer did not add a detailed person description.
Create a meaningful but restrained design using the selected recipient, purpose, material, stone, texture, setting, and mood.
Avoid generic decoration. The ring should still feel personal, intimate, handmade, and emotionally valuable.`
  }

  return `Use the customer's own words as the emotional design brief:
"${cleanDescription}"

Translate this description into visual jewellery decisions:
- choose ring proportions that match the personality described
- choose softness, sharpness, symmetry, asymmetry, weight, and silhouette from the emotional tone
- turn repeated themes, places, memories, values, or natural references into subtle handmade details
- if the person feels calm, create quieter proportions and softer texture
- if the person feels bold, create stronger silhouette and more sculptural but still realistic form
- if the person feels romantic, create elegant curves, warm symbolic details, and refined softness
- if the person feels mysterious, create deeper shadows, antique texture, protected stone placement, or hidden engraving
- if the person loves nature, translate that into organic line, texture, or stone placement without making literal fantasy motifs
- if the person loves the ocean, sunset, travel, memory, spirituality, protection, family, or ceremony, turn that into subtle design language
- do not write the description on the ring
- do not make obvious icons unless they are extremely subtle
- the final ring must feel like it was designed specifically for this person`
}

const generatePrompt = async () => {
  errorMessage.value = ''
  copyMessage.value = ''
  hasCopiedPrompt.value = false
  hasStartedSketches.value = false
  const rule = selectedRule.value
  const personDescription = form.description.trim() || 'Meaningful, personal, emotionally valuable'
  const personalizationBrief = buildPersonalizationBrief(form.description)

  finalPrompt.value = `IMPORTANT:
This is an AI IMAGE GENERATION task.
Do NOT answer with text explanations.
Do NOT describe the concepts only in writing.
Generate visual jewellery sketch images.

BRAND:
THE RING EXPERIENCE

TASK:
Create ONE image containing 4 separate handcrafted luxury jewellery sketch concepts for a custom ${form.material} ring for ${form.recipient}.

SELECTED PACKAGE:
${rule.name}

PACKAGE TIME FRAME:
${rule.time}

PACKAGE COMPLEXITY LIMIT:
${rule.complexity}

CUSTOMER INFORMATION:
Ring for: ${form.recipient}
Person description: ${personDescription}
Ring purpose: ${form.purpose}
Material: ${form.material}
Preferred band shape: ${form.shape}
Preferred texture: ${form.texture}
Preferred stone: ${form.stone}
Preferred stone setting: ${form.setting}
Preferred mood: ${form.mood}

PERSONALIZATION BRIEF:
${personalizationBrief}

PERSONALIZATION REQUIREMENT:
The person's description must visibly influence every concept.
Do not only use the package and dropdown choices.
Each of the 4 concepts must interpret the customer description in a different way:
- one concept should translate the emotional tone into the overall silhouette
- one concept should translate the description into texture and surface finish
- one concept should translate the description into stone placement or stone protection
- one concept should translate the description into a subtle symbolic detail, engraving, mark, or proportion

PACKAGE DESIGN RULES:
${rule.allowed}

STONE SETTING RULES:
${rule.settings}

PACKAGE LIMITS:
${rule.limits}

If the selected band shape, texture, stone, stone setting, or mood is too complex for the selected package, simplify it intelligently while keeping the emotional meaning.

IMAGE 1 REQUIREMENT:
Generate ONE professional jewellery concept board image with 4 clearly separated panels.

The board must be arranged like this:
- Panel 1: Concept 1
- Panel 2: Concept 2
- Panel 3: Concept 3
- Panel 4: Concept 4

Each panel must show a different ring sketch.

The 4 visual directions are:
${rule.directions}

Each panel must include:
- one ring concept sketch
- top view
- side profile
- small stone-setting detail if applicable
- small texture detail if applicable
- short handwritten label
- subtle technical annotation lines
- realistic graphite pencil shading
- warm white paper background
- luxury artisan jewellery sketch feeling

The 4 concepts must be visually different:
- different silhouette
- different structure
- different proportions
- different stone placement
- different visual balance
- different handmade character
- different artistic direction

The image must look like:
- a professional jewellery designer sketch board
- realistic pencil sketch on warm white paper
- quiet luxury
- mature
- refined
- handmade
- artisan
- premium
- possible to make by hand

At the top of the image, write elegantly:
THE RING EXPERIENCE

VERY IMPORTANT:
Only generate the 4-panel visual sketch board first.
Do NOT generate the final detailed sketch sheet yet.
Do NOT give a written explanation.
Do NOT create a text-only answer.

After generating the 4-panel image, stop and ask only this:

"Choose concept 1, 2, 3, or 4 to develop into the final detailed artisan jewellery sketch."

WAIT for the user to choose one concept.

AFTER THE USER CHOOSES ONE CONCEPT:

Generate ONE final detailed jewellery sketch image based only on:
- the chosen concept
- the selected package
- the customer information
- the handmade production limits
- the same visual identity

FINAL IMAGE REQUIREMENT:
Create ONE professional artisan jewellery production sketch sheet.

The final sketch sheet must include:
- one large hero ring sketch
- top view
- side profile
- stone-setting close-up if applicable
- texture close-up
- hidden engraving suggestion
- material notes
- stone notes if applicable
- ring proportions
- technical annotation lines
- handwritten craftsmanship notes
- realistic handcrafted texture
- graphite shading
- warm white paper background
- THE RING EXPERIENCE written elegantly at the top

The final image must feel:
- emotionally meaningful
- handcrafted
- refined
- premium
- quiet luxury
- technically realistic
- ready to send to a real artisan jeweller

NEGATIVE PROMPT:
No text-only response.
No written concept explanation only.
No cartoon.
No fantasy ring.
No cheap jewellery.
No colorful background.
No plastic render.
No CGI look.
No fake 3D render.
No CAD render.
No casting design.
No futuristic sci-fi jewellery.
No impossible handmade structure.
No generic jewellery catalogue style.
No mass-produced jewellery.
No overly decorative fantasy elements.
No unrealistic gemstones.
No complex pave.
No invisible setting.
No tension setting.
No advanced gallery construction.`

  isResultVisible.value = true
  await nextTick()
  setupRevealAnimations()
  resultSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const copyPrompt = async () => {
  if (!finalPrompt.value) {
    errorMessage.value = 'Generate the prompt first.'
    return
  }

  try {
    await navigator.clipboard.writeText(finalPrompt.value)
    copyMessage.value = 'AI image prompt copied.'
    errorMessage.value = ''
    hasCopiedPrompt.value = true
  } catch {
    errorMessage.value = 'Copy failed. Open the prompt and copy it manually.'
  }
}

const downloadPrompt = () => {
  if (!finalPrompt.value) {
    errorMessage.value = 'Generate the prompt first.'
    return
  }

  const blob = new Blob([finalPrompt.value], { type: 'text/plain' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'the-ring-experience-ai-sketch-prompt.txt'
  link.click()
  URL.revokeObjectURL(link.href)
}

const markSketchStep = () => {
  hasStartedSketches.value = true
}

onMounted(async () => {
  const [social, footer] = await Promise.all([
    fetchSocialContentFromSanity(),
    fetchFooterContentFromSanity(),
  ])

  socialContent.value = social ?? {}
  footerContent.value = footer ?? {}
  await nextTick()
  setupRevealAnimations()
})
</script>

<style scoped>
.step-pill {
  border: 1px solid color-mix(in srgb, var(--color-darkbrown) 14%, transparent);
  background: color-mix(in srgb, var(--color-lightbeige) 82%, white);
  color: var(--color-mutedbrown);
  padding: 0.85rem 1rem;
  text-align: center;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.step-pill.active {
  border-color: var(--color-darkbrown);
  background: var(--color-darkbrown);
  color: var(--color-lightbeige);
}

.step-pill::before {
  content: none;
}

.builder-card {
  border: 1px solid color-mix(in srgb, var(--color-darkbrown) 16%, transparent);
  background: color-mix(in srgb, var(--color-lightbeige) 86%, white);
  padding: clamp(1.5rem, 4vw, 2.25rem);
  box-shadow: 0 24px 70px rgba(35, 28, 20, 0.08);
}

.package-card {
  cursor: pointer;
  border: 1px solid color-mix(in srgb, var(--color-darkbrown) 14%, transparent);
  background: rgba(255, 255, 255, 0.76);
  padding: 1.25rem;
  text-align: left;
  transition: border-color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
}

.package-card:hover,
.package-card.active {
  border-color: var(--color-darkbrown);
  background: #f7efe4;
  transform: translateY(-1px);
}

.package-card span {
  display: block;
  margin-bottom: 0.6rem;
  color: var(--color-mutedbrown);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.package-card strong {
  display: block;
  margin-bottom: 0.45rem;
  color: var(--color-brown);
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 400;
}

.package-card small {
  color: var(--color-mutedbrown);
  line-height: 1.5;
}

.package-dots {
  display: none;
}

.field-label {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  color: var(--color-brown);
  font-size: 0.9rem;
}

.field-label > span {
  font-weight: 600;
}

.field-control {
  width: 100%;
  border: 1px solid rgba(123, 98, 72, 0.45);
  background: white;
  padding: 0.95rem 1rem;
  color: var(--color-darkbrown);
  font-size: 0.95rem;
  font-weight: 400;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.field-control:focus {
  border-color: var(--color-noisette);
  box-shadow: 0 0 0 3px rgba(176, 137, 66, 0.2);
}

.story-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.story-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.story-chip {
  cursor: pointer;
  border: 1px solid color-mix(in srgb, var(--color-darkbrown) 14%, transparent);
  background: #f7efe4;
  padding: 0.62rem 0.8rem;
  color: var(--color-mutedbrown);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  line-height: 1.2;
  text-transform: uppercase;
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.story-chip:hover {
  border-color: var(--color-darkbrown);
  color: var(--color-darkbrown);
  transform: translateY(-1px);
}

.main-action,
.secondary-action,
.whatsapp-action {
  display: inline-flex;
  min-height: 3.25rem;
  width: 100%;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 0;
  padding: 1rem 1.35rem;
  text-align: center;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  line-height: 1.25;
  text-decoration: none;
  text-transform: uppercase;
  transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease, filter 0.2s ease, transform 0.2s ease;
}

.main-action {
  background: var(--color-noisette);
  color: white;
}

.secondary-action {
  border-color: var(--color-noisette);
  background: transparent;
  color: var(--color-noisette);
}

.whatsapp-action {
  border-color: #1f7a4d;
  background: #1f7a4d;
  color: white;
}

.main-action:hover,
.secondary-action:hover,
.whatsapp-action:hover {
  transform: translateY(-1px);
}

.main-action:hover {
  filter: brightness(1.05);
}

.secondary-action:hover {
  background: var(--color-noisette);
  color: white;
}

@media (max-width: 420px) {
  .main-action,
  .secondary-action,
  .whatsapp-action {
    min-height: 2.85rem;
    padding-inline: 0.55rem;
    font-size: 0.68rem;
  }
}

@media (max-width: 767px) {
  .step-track {
    position: relative;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .step-track::before {
    position: absolute;
    top: 50%;
    left: calc(50% - 5.25rem);
    width: 10.5rem;
    height: 1px;
    background: color-mix(in srgb, var(--color-darkbrown) 18%, transparent);
    content: '';
    transform: translateY(-50%);
  }

  .step-pill {
    position: relative;
    z-index: 1;
    display: inline-flex;
    width: 2.25rem;
    height: 2.25rem;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    padding: 0;
    background: var(--color-lightbeige);
    font-size: 0;
  }

  .step-pill span {
    display: none;
  }

  .step-pill::before {
    content: attr(data-step);
    font-size: 0.78rem;
    letter-spacing: 0;
  }

  .builder-title {
    font-size: 1.65rem;
  }

  .builder-card {
    padding: 1.25rem;
  }

  .form-grid {
    gap: 0.75rem;
    margin-top: 1rem;
  }

  .field-label {
    gap: 0.32rem;
    font-size: 0.8rem;
  }

  .field-control {
    padding: 0.58rem 0.7rem;
    font-size: 0.84rem;
  }

  select.field-control {
    min-height: 2.55rem;
  }

  .person-description {
    min-height: 7rem;
  }

  .story-bottom {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.75rem;
  }

  .story-chip {
    padding: 0.5rem 0.62rem;
    font-size: 0.6rem;
  }

  .package-selector {
    display: flex;
    overflow-x: auto;
    padding: 0.35rem 0;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
  }

  .package-selector::-webkit-scrollbar {
    display: none;
  }

  .package-card {
    flex: 0 0 9.75rem;
    min-height: 5.75rem;
    border-color: transparent;
    padding: 0.8rem;
    scroll-snap-align: start;
  }

  .package-card:hover,
  .package-card.active {
    border-color: var(--color-darkbrown);
  }

  .package-card span {
    margin-bottom: 0.35rem;
    font-size: 0.56rem;
    letter-spacing: 0.14em;
  }

  .package-card strong {
    margin-bottom: 0;
    font-size: 1.12rem;
    line-height: 1.12;
  }

  .package-card small {
    display: none;
  }

  .package-dots {
    display: flex;
    justify-content: center;
    gap: 0.55rem;
    margin-top: 0.8rem;
  }

  .package-dot {
    width: 0.42rem;
    height: 0.42rem;
    border: 0;
    border-radius: 9999px;
    background: color-mix(in srgb, var(--color-darkbrown) 24%, transparent);
    padding: 0;
    transition: background-color 0.2s ease, transform 0.2s ease, width 0.2s ease;
  }

  .package-dot.active {
    width: 1.25rem;
    background: var(--color-darkbrown);
  }
}
</style>
