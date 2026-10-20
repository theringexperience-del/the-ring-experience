<template>
  <article class="bg-[#FAF7F1] text-[#38291F]">
    <header class="bg-[#252A24] pb-14 pt-36 text-[#FAF7F1] sm:pb-20 sm:pt-44">
      <div class="mx-auto max-w-6xl px-[6%]">
        <p class="text-xs uppercase tracking-[.2em] text-[#D9BC80]">The local guide · Negombo, Sri Lanka</p>
        <h1 class="mt-5 max-w-4xl font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">Things to do in Negombo beyond the beach</h1>
        <p class="mt-6 max-w-2xl text-lg leading-relaxed text-[#E9E1D4]">A morning at the fish market, time on the lagoon, a sunset by the sea—and a ring you make yourself. Here is a flexible way to enjoy Negombo on a short Sri Lanka stay.</p>
        <div class="mt-8 flex flex-wrap gap-3">
          <RouterLink to="/bookexperience" class="inline-flex min-h-12 items-center bg-[#A77A40] px-6 text-sm font-medium uppercase tracking-wide text-white hover:bg-[#8E6837]">Plan a workshop</RouterLink>
          <a href="#plan" class="inline-flex min-h-12 items-center border border-white/50 px-6 text-sm uppercase tracking-wide text-white hover:bg-white/10">See a day plan</a>
        </div>
      </div>
    </header>

    <div class="mx-auto max-w-6xl px-[6%] py-16 sm:py-20">
      <p class="max-w-3xl text-lg leading-relaxed text-[#604B39]">Negombo is a practical first or last stop on a Sri Lanka trip, but it is worth more than a night near the airport. Its working fishing community, lagoon, canal, beach and local craft give you a varied day without trying to do everything.</p>
      <div class="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2">
        <section v-for="(idea, index) in ideas" :key="idea.title" class="border-t border-[#C4B59E] pt-5">
          <p class="text-xs tracking-[.2em] text-[#916B3B]">0{{ index + 1 }} / NEGOMBO</p>
          <h2 class="mt-3 font-display text-3xl leading-tight sm:text-4xl">{{ idea.title }}</h2>
          <p class="mt-4 leading-relaxed text-[#604B39]">{{ idea.description }}</p>
          <RouterLink v-if="idea.to" :to="idea.to" class="mt-4 inline-flex min-h-11 items-center border-b border-[#9D7A4B] text-sm text-[#755024]">{{ idea.link }} <span class="ml-4" aria-hidden="true">→</span></RouterLink>
        </section>
      </div>

      <section id="plan" class="mt-20 grid gap-8 bg-[#EFE7DA] p-7 sm:p-10 lg:grid-cols-[1fr_1.2fr]" aria-labelledby="plan-title">
        <div><p class="text-xs uppercase tracking-[.2em] text-[#80664A]">One day in Negombo</p><h2 id="plan-title" class="mt-3 font-display text-4xl leading-tight">A little sea, a little craft.</h2><p class="mt-5 leading-relaxed text-[#604B39]">Use this as a loose sequence, not a timed tour. Check opening conditions locally and leave breathing room for travel, meals and weather.</p></div>
        <ol class="space-y-5 text-[#604B39]">
          <li><strong class="block text-[#38291F]">Morning · Working Negombo</strong>Visit the fish market if it is active, then explore the town and canal area respectfully.</li>
          <li><strong class="block text-[#38291F]">Afternoon · Make something</strong>Book a guided ring-making session. Confirm the date, design and time with us before arranging the rest of the day.</li>
          <li><strong class="block text-[#38291F]">Evening · Slow down</strong>Walk by the beach around sunset or arrange a lagoon outing with a local operator. Finish with a meal nearby.</li>
        </ol>
      </section>

      <section class="mt-20 max-w-4xl space-y-8" aria-labelledby="questions-title">
        <h2 id="questions-title" class="font-display text-4xl">Questions before you go</h2>
        <div><h3 class="font-display text-2xl">What can I do in Negombo on a rainy day?</h3><p class="mt-2 leading-relaxed text-[#604B39]">A private jewellery workshop gives you a hands-on indoor activity. Ask us about availability and your preferred ring design; some steps and plans depend on the session and materials.</p></div>
        <div><h3 class="font-display text-2xl">Can beginners or couples make rings?</h3><p class="mt-2 leading-relaxed text-[#604B39]">Yes. An artisan guides beginners, solo visitors, friends and couples. If you want to do as much work yourself as possible, tell us before booking so we can suggest a suitable design.</p></div>
        <div><h3 class="font-display text-2xl">Can I fit a workshop around a flight?</h3><p class="mt-2 leading-relaxed text-[#604B39]">Possibly, but allow time for the whole session and travel. Share your flight or onward journey when enquiring. We will confirm whether a specific appointment works; a request alone does not reserve a place.</p></div>
      </section>

      <aside class="mt-20 border-t border-[#C4B59E] pt-8"><h2 class="font-display text-3xl">Make a memory to take home.</h2><p class="mt-3 max-w-2xl text-[#604B39]">The Ring Experience is at 63/1 Porutota Road, Negombo. Compare our <RouterLink to="/ouroffers" class="underline">workshops</RouterLink>, read the <RouterLink to="/ring-making-guide" class="underline">beginner’s guide</RouterLink>, or use <a :href="GOOGLE_MAPS_URL" target="_blank" rel="noopener noreferrer" class="underline">Google Maps for reviews and directions</a>.</p><RouterLink to="/bookexperience" class="mt-6 inline-flex min-h-12 items-center bg-[#754F28] px-6 text-sm uppercase tracking-wide text-white hover:bg-[#5B3D1F]">Check availability</RouterLink><p class="mt-7 text-sm text-[#604B39]">Exploring more of the island? Read our <RouterLink to="/journal/creative-things-to-do-in-sri-lanka" class="underline">Sri Lanka craft activity guide</RouterLink> or browse <a href="https://www.srilanka.travel/what-to-do" target="_blank" rel="noopener noreferrer" class="underline">Sri Lanka Tourism’s activity guide</a>.</p></aside>
    </div>
  </article>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { GOOGLE_MAPS_URL } from '../utils/businessProfile.js'

const ideas = [
  { title: 'Make your own ring', description: 'Spend part of your visit at a workbench with a local artisan. Choose a shape and finish, take part in the making, and leave with a piece connected to your time in Sri Lanka. Materials, techniques and how much you do yourself depend on the workshop and design.', to: '/ouroffers', link: 'Compare ring-making sessions' },
  { title: 'See the fish market', description: 'Negombo is a working fishing town. Visit the market when traders are active to see a part of everyday life, keeping out of working areas and asking before photographing people.' },
  { title: 'Explore the lagoon and canal', description: 'Consider a boat outing with a local operator, or enjoy the waterside at your own pace. Ask the operator about route, safety, timing and conditions before you set off.' },
  { title: 'Take a beach walk at sunset', description: 'The beach is a relaxed place to end the day. Conditions for swimming vary, so check locally and treat a walk and the evening light as the main event.' },
  { title: 'Walk through the old town', description: 'Look out for the canal, churches and traces of Negombo’s trading history. Dress and behave respectfully when visiting places of worship.' },
  { title: 'Try the local food', description: 'Make time for a seafood meal or a small local café. Ask about the catch and preparation on the day rather than planning around one fixed menu.' },
]
</script>
