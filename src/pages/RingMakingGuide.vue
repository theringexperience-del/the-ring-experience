<template>
  <article class="pb-20 text-[#38291F]">
    <header class="bg-[#EFE7DA] pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div class="mx-auto w-11/12 max-w-5xl sm:w-10/12">
        <p class="text-xs tracking-[.2em] text-[#755024] uppercase">The Ring Experience · Visitor guide</p>
        <h1 class="mt-5 max-w-4xl font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
          Make your own ring in Sri Lanka: a guide to our Negombo workshop
        </h1>
        <p class="mt-7 max-w-2xl text-lg leading-relaxed text-[#5E4A38]">
          Looking for a creative activity near Negombo? Here is how our guided ring-making experience works, what to think about before visiting and where to find the right workshop.
        </p>
      </div>
    </header>

    <div class="mx-auto grid w-11/12 max-w-5xl gap-12 pt-16 sm:w-10/12 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-20">
      <div class="space-y-14 text-base leading-[1.8] sm:text-lg">
        <section id="what-to-expect" aria-labelledby="expect-title">
          <h2 id="expect-title" class="font-display text-3xl leading-tight sm:text-4xl">What happens at the workbench?</h2>
          <p class="mt-5">You start with an idea for a ring. An artisan helps you consider the shape, texture and details that suit the time and materials available for your chosen session. You take part in the making with guidance, then see the piece through its finishing stages. The amount of hands-on work depends on your design, the techniques involved and the workshop you select.</p>
          <p class="mt-4">If doing as much of the work yourself matters to you, tell us before booking. We can talk through a suitable design and what will be possible in your session.</p>
        </section>

        <section id="beginners" aria-labelledby="beginner-title">
          <h2 id="beginner-title" class="font-display text-3xl leading-tight sm:text-4xl">Is it suitable for beginners?</h2>
          <p class="mt-5">Yes. You do not need to arrive with jewellery-making skills. The session is guided step by step by a local artisan, so you can focus on choosing a design and learning how a ring comes together.</p>
        </section>

        <section id="choose-workshop" aria-labelledby="workshop-title">
          <h2 id="workshop-title" class="font-display text-3xl leading-tight sm:text-4xl">Choosing a workshop</h2>
          <p class="mt-5">The <RouterLink to="/ouroffers" class="underline decoration-[#A27B45] underline-offset-4">workshop options</RouterLink> vary in length and scope. A simpler first ring needs less time than an intricate design or a session with stone setting. Compare the current inclusions on the offers page, then share your preferred date and design ideas. We will confirm availability, materials, gemstone options and any additional charges before you book.</p>
          <p class="mt-4">Coming with a partner or friend? Let us know how many people will attend and whether you would each like to make a ring.</p>
        </section>

        <section id="plan-visit" aria-labelledby="visit-title">
          <h2 id="visit-title" class="font-display text-3xl leading-tight sm:text-4xl">Planning your visit to Negombo</h2>
          <p class="mt-5">A ring-making workshop is an easy way to make a personal souvenir of your time in Sri Lanka. Leave enough room in your schedule for the session you choose, especially if you are travelling onward the same day. Send us your dates before making plans around the workshop; a booking request is confirmed only once we agree on a time.</p>
          <p class="mt-4">Still deciding? Browse the <RouterLink to="/gallery" class="underline decoration-[#A27B45] underline-offset-4">guest gallery</RouterLink>, explore <RouterLink to="/gemstones" class="underline decoration-[#A27B45] underline-offset-4">gemstone ideas</RouterLink> and read our <RouterLink to="/faq" class="underline decoration-[#A27B45] underline-offset-4">workshop FAQs</RouterLink>.</p>
        </section>

        <aside class="border border-[#B9A990] bg-[#EFE7DA] p-7 sm:p-9">
          <p class="text-xs tracking-[.18em] text-[#755024] uppercase">Make it yours</p>
          <h2 class="mt-3 font-display text-3xl">Ready to plan your ring?</h2>
          <p class="mt-3">Tell us your preferred date, the number of guests and any design ideas. We’ll help you choose a suitable workshop.</p>
          <RouterLink to="/bookexperience" class="mt-6 inline-block bg-[#754F28] px-6 py-3 text-sm font-medium tracking-wide text-white uppercase hover:bg-[#5B3D1F]">Check availability</RouterLink>
        </aside>
      </div>

      <nav aria-label="On this page" class="self-start border-t border-[#B9A990] pt-5 text-sm text-[#5E4A38] lg:sticky lg:top-28">
        <p class="mb-4 font-medium tracking-[.12em] uppercase">In this guide</p>
        <a href="#what-to-expect" class="block py-2 hover:underline">At the workbench</a>
        <a href="#beginners" class="block py-2 hover:underline">For beginners</a>
        <a href="#choose-workshop" class="block py-2 hover:underline">Choose a workshop</a>
        <a href="#plan-visit" class="block py-2 hover:underline">Plan your visit</a>
      </nav>
    </div>
  </article>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
