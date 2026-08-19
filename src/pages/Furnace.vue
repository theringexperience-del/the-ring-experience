<template>
  <main ref="pageRoot" class="w-full overflow-hidden bg-[#171210] text-[#F4EFE8]">
    <section data-reveal class="w-full bg-(--color-lightbeige) pt-28 pb-20 text-(--color-brown) sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28">
      <div class="mx-auto w-11/12 text-center sm:w-10/12">
        <p class="text-xs tracking-[0.2em] text-(--color-mutedbrown) uppercase">Negombo - Sri Lanka</p>
        <h1 class="mt-3 font-display text-5xl leading-tight sm:text-6xl">The Furnace</h1>
        <p class="mx-auto mt-4 max-w-2xl text-base leading-relaxed sm:text-lg" style="opacity: 0.85;">
          Pour casting grain into the tray, balance your alloy, then fire the furnace to discover what you have created and what it costs.
        </p>
        <div class="mx-auto mt-8 h-px w-24 bg-(--color-noisette)"></div>
      </div>
    </section>

    <section data-reveal class="mx-auto w-11/12 py-10 sm:w-10/12">
      <div class="section-title"><span></span>Raw Stock<span></span></div>
      <div class="mx-auto mt-9 grid max-w-3xl grid-cols-3 gap-2 sm:gap-8">
        <article v-for="metal in metals" :key="metal.key" class="text-center">
          <button type="button" class="jar mx-auto" :aria-label="`Pour 1 gram of ${metal.name}`" @click="add(metal.key)">
            <span class="jar-lid"></span>
            <span class="jar-glass">
              <i
                v-for="grain in 14"
                :key="grain"
                :style="{ background: metal.color, left: `${11 + (grain * 31) % 72}%`, top: `${20 + (grain * 47) % 67}%` }"
              ></i>
            </span>
          </button>
          <h3 class="mt-2 font-display text-lg tracking-[0.12em] uppercase">{{ metal.name }}</h3>
          <p class="mt-1 text-[0.62rem] tracking-[0.14em] text-(--color-noisette) uppercase">Purity {{ metal.purity }}</p>
          <p class="mt-1 text-[0.62rem] tracking-[0.14em] text-[#9E8D80] uppercase">{{ metal.symbol }} - melts {{ metal.melt }}</p>
          <div class="mt-4 flex items-center justify-center gap-3">
            <button type="button" class="counter-button" @click="remove(metal.key)">-</button>
            <b class="min-w-12 text-xs font-normal text-[#CFC7BB]">{{ mix[metal.key].toFixed(1) }}g</b>
            <button type="button" class="counter-button" @click="add(metal.key)">+</button>
          </div>
        </article>
      </div>
      <p class="mt-8 text-center text-xs tracking-[0.08em] text-[#8C8277]">Tap a jar to pour 1 gram. Use + and - to fine-tune your recipe.</p>
    </section>

    <section data-reveal class="mx-auto grid w-11/12 max-w-6xl pb-14 sm:w-10/12 lg:grid-cols-[1.25fr_0.75fr]">
      <div class="tray" :class="{ firing: isFiring }">
        <div class="tray-back"></div>
        <div class="grain-bed">
          <i
            v-for="grain in grains"
            :key="grain.id"
            class="grain"
            :style="{
              '--grain': grain.color,
              '--x': grain.x,
              '--y': grain.y,
              '--r': grain.rotation,
              '--d': grain.delay,
            }"
          ></i>
          <p v-if="!total">Your casting tray is empty</p>
        </div>
        <div class="tray-front"></div>
        <div v-if="isFiring" class="flame"><i></i><i></i><i></i></div>
      </div>

      <aside class="border border-[#604837] bg-[#241711] p-6 lg:border-l-0 lg:p-8">
        <div class="flex justify-between border-b border-[#513C30] pb-5 text-xs tracking-[0.12em] text-[#AD9B8E] uppercase">
          <span>On the scale</span>
          <b class="text-sm text-[#E3D7CF]">{{ total.toFixed(1) }}g <small class="text-[#8C8277]">/ 250g max</small></b>
        </div>

        <div class="min-h-24 py-4">
          <div v-for="metal in activeMetals" :key="metal.key" class="flex justify-between py-1 text-sm text-[#CFC7BB]">
            <span><i class="mr-2 inline-block h-2 w-2 rounded-full" :style="{ background: metal.color }"></i>{{ metal.name }}</span>
            <b class="font-normal">{{ mix[metal.key].toFixed(2) }} g</b>
          </div>
        </div>

        <div class="border-t border-[#513C30] py-5">
          <small class="text-xs tracking-[0.15em] text-[#AD9B8E] uppercase">Your metal price</small>
          <strong class="mt-1 block font-display text-5xl text-(--color-noisette)">{{ money.format(price) }}</strong>
          <div class="mt-3 grid gap-1 text-xs text-[#AD9B8E]">
            <p class="flex justify-between gap-4">
              <span>Gold live</span>
              <span>{{ usd.format(metalPricesUsd.gold) }} / g</span>
            </p>
            <p class="flex justify-between gap-4 text-[#8C8277]">
              <span>Gold extra</span>
              <span>LKR 1,000 / g</span>
            </p>
            <p class="flex justify-between gap-4 text-[#8C8277]">
              <span>Silver</span>
              <span>LKR 2,000 / g</span>
            </p>
            <p class="flex justify-between gap-4 text-[#8C8277]">
              <span>Copper</span>
              <span>LKR 500 / g</span>
            </p>
          </div>
        </div>

        <button type="button" class="w-full cursor-pointer bg-(--color-noisette) px-5 py-4 text-sm tracking-[0.18em] uppercase text-white disabled:cursor-not-allowed disabled:opacity-35" :disabled="!total" @click="fire">
          Fire the furnace
        </button>
        <button type="button" class="w-full cursor-pointer px-5 py-4 text-xs tracking-[0.15em] text-[#9E8D80] uppercase" @click="empty">
          Empty the tray
        </button>

        <div v-if="resultVisible" class="border border-(--color-noisette) bg-[#1B110D] p-6 text-center">
          <span class="text-xs tracking-[0.2em] text-(--color-noisette) uppercase">Assay complete</span>
          <b class="mt-2 block font-display text-3xl">{{ alloyName }}</b>
          <small class="mt-2 block text-xs text-[#AD9B8E]">{{ assayLine }}</small>
        </div>
      </aside>
    </section>

    <section data-reveal class="mx-auto w-11/12 max-w-6xl py-12 sm:w-10/12">
      <div class="section-title"><span></span>Or Load A Bench Classic<span></span></div>
      <div class="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-5">
        <button v-for="recipe in recipes" :key="recipe.name" type="button" class="recipe-button" @click="loadRecipe(recipe)">
          <i>{{ recipe.tag }}</i>
          <b>{{ recipe.name }}</b>
          <small>Load 10g recipe</small>
        </button>
      </div>
    </section>

    <section data-reveal class="bg-(--color-lightbeige) px-5 py-20 text-center text-(--color-darkbrown)">
      <p class="text-xs tracking-[0.22em] text-(--color-noisette) uppercase">Your metal. Your hands. Your story.</p>
      <h2 class="mx-auto mt-3 max-w-2xl font-display text-5xl leading-tight sm:text-6xl">Like what you forged?</h2>
      <p class="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-(--color-mutedbrown)">
        Bring your Furnace recipe to life with a local artisan at The Ring Experience in Negombo.
      </p>
      <RouterLink class="mt-7 inline-flex" to="/bookexperience">
        <Button>Make this into a ring</Button>
      </RouterLink>
    </section>
  </main>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '../components/Button.vue'
import { useRevealAnimations } from '../composables/useRevealAnimations'

const pageRoot = ref(null)
const isFiring = ref(false)
const resultVisible = ref(false)
const mix = ref({ gold: 0, silver: 0, copper: 0 })
const metalPricesUsd = ref({ gold: 135, silver: 1.55, copper: 0.025 })
const usdLkr = ref(300)
const priceSource = ref('Fallback estimate')
const money = new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 })
const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })
const { setupRevealAnimations } = useRevealAnimations(pageRoot, { selectors: ['[data-reveal]'], start: 'top 86%' })

const metals = [
  { key: 'gold', name: 'Gold', symbol: 'Au', color: '#D5AD45', melt: '1064 C', purity: '24K' },
  { key: 'silver', name: 'Silver', symbol: 'Ag', color: '#D5D8D9', melt: '962 C', purity: '999.98' },
  { key: 'copper', name: 'Copper', symbol: 'Cu', color: '#BD704D', melt: '1085 C', purity: '99.9' },
]

const recipes = [
  { name: 'Sterling 925', tag: 'Ag 925', mix: { gold: 0, silver: 9.25, copper: 0.75 } },
  { name: '18K Yellow Gold', tag: 'Au 750', mix: { gold: 7.5, silver: 1.5, copper: 1 } },
  { name: '18K Rose Gold', tag: 'Au 750', mix: { gold: 7.5, silver: 0.5, copper: 2 } },
  { name: '14K Yellow Gold', tag: 'Au 585', mix: { gold: 5.85, silver: 2.25, copper: 1.9 } },
  { name: '14K Rose Gold', tag: 'Au 585', mix: { gold: 5.85, silver: 1, copper: 3.15 } },
]

const round = (value) => Math.round(value * 100) / 100
const total = computed(() => round(mix.value.gold + mix.value.silver + mix.value.copper))
const goldShare = computed(() => (total.value ? mix.value.gold / total.value : 0))
const silverShare = computed(() => (total.value ? mix.value.silver / total.value : 0))
const karat = computed(() => Math.round(goldShare.value * 24))
const activeMetals = computed(() => metals.filter((metal) => mix.value[metal.key] > 0))
const price = computed(() => {
  if (!total.value) return 0
  const metalCost =
    mix.value.gold * (metalPricesUsd.value.gold * usdLkr.value + 1000) +
    mix.value.silver * 2000 +
    mix.value.copper * 500
  return metalCost
})
const alloyName = computed(() => {
  if (goldShare.value > 0.98) return 'Fine Gold'
  if (goldShare.value > 0) return `${karat.value}K Custom Gold`
  if (silverShare.value >= 0.92) return 'Sterling Silver'
  if (silverShare.value > 0) return 'Silver Alloy'
  return 'Copper'
})
const assayLine = computed(() => (
  goldShare.value > 0
    ? `${Math.round(goldShare.value * 1000)} fineness - ${karat.value} karat`
    : silverShare.value > 0
      ? `${Math.round(silverShare.value * 1000)} silver fineness`
      : 'Base metal blend'
))
const grains = computed(() => (
  Array.from({ length: Math.min(90, Math.ceil(total.value * 4)) }, (_, index) => {
    const position = (index + 0.5) / Math.max(1, Math.ceil(total.value * 4))
    const metal = position < goldShare.value ? metals[0] : position < goldShare.value + silverShare.value ? metals[1] : metals[2]
    return {
      id: index,
      color: metal.color,
      x: `${7 + (index * 37) % 86}%`,
      y: `${28 + (index * 53) % 58}%`,
      rotation: `${(index * 29) % 180}deg`,
      delay: `${(index % 9) * 0.025}s`,
    }
  })
))

const setNotFired = () => {
  resultVisible.value = false
  isFiring.value = false
}
const add = (metal) => {
  setNotFired()
  mix.value[metal] = round(mix.value[metal] + 1)
}
const remove = (metal) => {
  setNotFired()
  mix.value[metal] = Math.max(0, round(mix.value[metal] - 1))
}
const empty = () => {
  mix.value = { gold: 0, silver: 0, copper: 0 }
  setNotFired()
}
const loadRecipe = (recipe) => {
  mix.value = { ...recipe.mix }
  setNotFired()
}
const fire = () => {
  if (!total.value) return
  isFiring.value = true
  resultVisible.value = false
  window.setTimeout(() => {
    isFiring.value = false
    resultVisible.value = true
  }, 1200)
}

onMounted(async () => {
  try {
    const response = await fetch('/api/metal-prices')
    if (response.ok) {
      const data = await response.json()
      metalPricesUsd.value = { ...metalPricesUsd.value, ...data.pricesUsdPerGram }
      usdLkr.value = Number(data.usdLkr) || usdLkr.value
      priceSource.value = data.source || priceSource.value
    }
  } catch {
    priceSource.value = 'Fallback estimate'
  }
  await nextTick()
  setupRevealAnimations()
})
</script>

<style scoped>
.section-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  color: #b8a38d;
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.section-title span {
  width: min(8rem, 22vw);
  height: 1px;
  background: #5a4436;
}

.jar {
  position: relative;
  width: clamp(5.9rem, 20vw, 7.6rem);
  height: clamp(6.8rem, 22vw, 8.4rem);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.jar:hover {
  transform: translateY(-0.25rem);
}

.jar-lid,
.jar-glass {
  position: absolute;
  display: block;
}

.jar-lid {
  z-index: 2;
  top: 0.2rem;
  left: 12%;
  width: 76%;
  height: 1.3rem;
  border-radius: 0.45rem 0.45rem 0.18rem 0.18rem;
  background: linear-gradient(#5a544e, #1b1816 65%, #6d6862);
  box-shadow: 0 0.2rem 0.4rem #000;
}

.jar-glass {
  left: 17%;
  top: 1.1rem;
  width: 66%;
  height: 78%;
  border: 2px solid #6c6762;
  border-radius: 0.35rem 0.35rem 1.1rem 1.1rem;
  background: linear-gradient(90deg, rgb(255 255 255 / 0.08), rgb(255 255 255 / 0.01) 35%, rgb(255 255 255 / 0.1));
  box-shadow: inset 0 -1.8rem 2.5rem rgb(0 0 0 / 0.52), 0 0.65rem 1.1rem #000;
}

.jar-glass i {
  position: absolute;
  width: 0.9rem;
  height: 0.65rem;
  border-radius: 9999px;
  box-shadow: inset -0.12rem -0.12rem 0.2rem rgb(0 0 0 / 0.5), 0 0 0.25rem currentColor;
  transform: rotate(-20deg);
}

.counter-button {
  width: 1.9rem;
  height: 1.8rem;
  border: 1px solid #5b4638;
  background: #231711;
  color: #c6a365;
}

.tray {
  position: relative;
  min-height: 22rem;
  overflow: hidden;
  border: 1px solid #48372d;
  background: #090705;
}

.tray-back {
  position: absolute;
  left: 7%;
  top: 7%;
  width: 86%;
  height: 77%;
  border: 0.75rem solid #403a35;
  border-radius: 48% 48% 2rem 2rem;
  background: radial-gradient(ellipse at center, #302a26, #111 63%);
  box-shadow: inset 0 0 2.5rem #000, 0 1rem 2.2rem #000;
}

.grain-bed {
  position: absolute;
  z-index: 2;
  left: 12%;
  top: 20%;
  width: 76%;
  height: 58%;
}

.grain-bed p {
  display: grid;
  height: 100%;
  place-items: center;
  color: #8c8277;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.grain {
  position: absolute;
  left: var(--x);
  top: var(--y);
  width: 1.1rem;
  height: 0.75rem;
  border-radius: 9999px;
  background: var(--grain);
  box-shadow: inset -0.2rem -0.2rem 0.25rem rgb(0 0 0 / 0.5), 0 0.15rem 0.25rem #000;
  transform: rotate(var(--r));
  animation: drop 0.35s var(--d) both;
}

.tray-front {
  position: absolute;
  z-index: 3;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4.6rem;
  background: linear-gradient(#554d47, #1b1816 28%, #080706 80%);
  border-top: 2px solid #77706a;
  clip-path: polygon(4% 0, 96% 0, 100% 100%, 0 100%);
}

.flame {
  position: absolute;
  z-index: 4;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  background: rgb(220 93 19 / 0.18);
}

.flame i {
  width: 3.4rem;
  height: 7.5rem;
  border-radius: 50% 50% 35% 35%;
  background: linear-gradient(#ffdf5f, #ed6929 55%, transparent);
  filter: blur(3px);
  animation: fire 0.18s infinite alternate;
}

.flame i:nth-child(2) {
  height: 10.6rem;
}

.flame i:nth-child(3) {
  height: 5.6rem;
}

.recipe-button {
  min-height: 6.5rem;
  border: 1px solid #533e31;
  background: #21150f;
  padding: 1rem 0.6rem;
  color: #e0d3ca;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.recipe-button:hover {
  border-color: #b48a48;
  background: #2b1c14;
}

.recipe-button i,
.recipe-button b,
.recipe-button small {
  display: block;
}

.recipe-button i {
  color: #b38a4a;
  font-size: 0.68rem;
  font-style: normal;
}

.recipe-button b {
  margin: 0.55rem 0;
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  font-weight: 600;
}

.recipe-button small {
  color: #9e8d80;
  font-size: 0.65rem;
}

@keyframes drop {
  from {
    opacity: 0;
    transform: translateY(-8rem) rotate(0);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotate(var(--r));
  }
}

@keyframes fire {
  to {
    transform: scaleX(0.8) translateY(-0.55rem);
  }
}

@media (max-width: 767px) {
  .tray {
    min-height: 18rem;
  }
}
</style>
