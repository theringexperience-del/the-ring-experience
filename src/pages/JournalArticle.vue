<template>
  <article v-if="post" class="bg-[#FAF7F1] text-[#38291F]">
    <header class="bg-[#EFE7DA] px-[6%] pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div class="mx-auto max-w-4xl">
        <RouterLink to="/journal" class="text-xs uppercase tracking-[.18em] text-[#795B3C] hover:underline">← The Journal</RouterLink>
        <p class="mt-8 text-xs tracking-[.18em] uppercase text-[#795B3C]">{{ post.category }} · {{ post.readingTime }}</p>
        <h1 class="mt-5 font-display text-5xl leading-tight sm:text-7xl">{{ post.title }}</h1>
        <p class="mt-8 max-w-3xl text-lg leading-relaxed text-[#604B39]">{{ post.intro }}</p>
      </div>
    </header>
    <div class="mx-auto grid max-w-6xl gap-14 px-[6%] py-16 lg:grid-cols-[minmax(0,1fr)_14rem] sm:py-20">
      <div class="max-w-3xl">
        <section v-for="section in post.sections" :key="section.heading" class="mb-12 border-b border-[#D4C6B2] pb-12 last:border-b-0">
          <h2 class="font-display text-3xl leading-tight sm:text-4xl">{{ section.heading }}</h2>
          <p v-for="paragraph in section.paragraphs" :key="paragraph" class="mt-6 text-[1.06rem] leading-[1.85] text-[#4F4033]">{{ paragraph }}</p>
          <a v-if="section.source" :href="section.source.href" target="_blank" rel="noopener noreferrer" class="mt-5 inline-block text-sm text-[#755024] underline underline-offset-4">Source: {{ section.source.label }}</a>
        </section>
        <div class="bg-[#EAE0D1] p-8 sm:p-10">
          <p class="text-xs uppercase tracking-[.18em] text-[#806342]">Make something personal</p>
          <h2 class="mt-4 font-display text-3xl">Ready for the workbench?</h2>
          <p class="mt-4 leading-relaxed text-[#604B39]">Tell us when you will be in Negombo and what kind of ring you would like to make. We will help you choose a suitable session and confirm the details.</p>
          <RouterLink to="/bookexperience" class="mt-7 inline-flex bg-[#6F4D27] px-6 py-3 text-sm uppercase tracking-[.12em] text-white hover:bg-[#4B341F]">Check availability</RouterLink>
        </div>
      </div>
      <aside class="lg:sticky lg:top-28 lg:self-start">
        <p class="border-t border-[#B9A990] pt-5 text-xs uppercase tracking-[.18em] text-[#806342]">Continue reading</p>
        <ul class="mt-5 space-y-5"><li v-for="related in relatedPosts" :key="related.slug"><RouterLink :to="`/journal/${related.slug}`" class="font-display text-xl leading-snug hover:underline">{{ related.title }}</RouterLink></li></ul>
        <RouterLink to="/ring-making-guide" class="mt-8 inline-block text-sm text-[#755024] underline underline-offset-4">Visitor guide to the workshop</RouterLink>
      </aside>
    </div>
  </article>
  <div v-else class="mx-auto max-w-4xl px-[6%] pb-28 pt-40"><h1 class="font-display text-5xl">Article not found</h1><RouterLink to="/journal" class="mt-6 inline-block underline">Browse the journal</RouterLink></div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { getJournalPost } from '../content/journal.js';

const route = useRoute();
const post = computed(() => getJournalPost(route.params.slug));
const relatedPosts = computed(() => (post.value?.related ?? []).map(getJournalPost).filter(Boolean));
</script>
