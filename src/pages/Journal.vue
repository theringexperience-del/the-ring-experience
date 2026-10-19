<template>
  <div class="bg-[#FAF7F1] text-[#38291F]">
    <header class="bg-[#EFE7DA] px-[6%] pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div class="mx-auto max-w-6xl">
        <p class="text-xs tracking-[.22em] uppercase text-[#7A603F]">Stories from the workbench</p>
        <h1 class="mt-5 max-w-4xl font-display text-5xl leading-tight sm:text-7xl">The Journal</h1>
        <p class="mt-6 max-w-2xl text-lg leading-relaxed text-[#604B39]">Clear answers about silver, gold, gemstones, wedding and engagement rings, and making jewellery in Sri Lanka. Start with a question, then bring your ideas to the workbench.</p>
      </div>
    </header>
    <div class="mx-auto max-w-6xl px-[6%] pt-10">
      <label for="journal-search" class="block text-sm text-[#604B39]">Find a jewellery question</label>
      <input id="journal-search" v-model.trim="search" type="search" placeholder="Try silver, wedding rings, gemstones or Negombo" class="mt-3 min-h-12 w-full max-w-2xl border border-[#B9A990] bg-white px-4 py-3 text-[#38291F]" />
      <p class="mt-3 text-sm text-[#604B39]" role="status">{{ filteredPosts.length }} {{ filteredPosts.length === 1 ? 'guide' : 'guides' }} found</p>
      <p v-if="!filteredPosts.length" class="mt-4">Try another topic, or <RouterLink to="/faq" class="underline">browse workshop FAQs</RouterLink>.</p>
    </div>
    <section aria-label="Articles" class="mx-auto grid max-w-6xl gap-5 px-[6%] py-16 md:grid-cols-3 sm:py-20">
      <article v-for="(post, index) in filteredPosts" :key="post.slug" class="flex min-h-84 flex-col border border-[#D4C6B2] bg-white p-7">
        <p class="text-xs tracking-[.16em] uppercase text-[#8A6844]">{{ String(index + 1).padStart(2, '0') }} · {{ post.category }}</p>
        <h2 class="mt-10 font-display text-3xl leading-tight"><RouterLink :to="`/journal/${post.slug}`" class="hover:underline">{{ post.title }}</RouterLink></h2>
        <p class="mt-5 grow leading-relaxed text-[#604B39]">{{ post.description }}</p>
        <RouterLink :to="`/journal/${post.slug}`" class="mt-8 border-t border-[#D4C6B2] pt-5 text-sm font-medium text-[#755024]">Read article <span aria-hidden="true">↗</span></RouterLink>
      </article>
    </section>
    <div class="mx-auto max-w-6xl px-[6%] pb-20"><RouterLink to="/ouroffers" class="inline-flex border border-[#765634] px-6 py-3 text-sm uppercase tracking-[.12em] hover:bg-[#EFE7DA]">Explore workshops</RouterLink></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { journalPosts } from '../content/journal.js';
const search = ref('');
const filteredPosts = computed(() => {
  const words = search.value.toLowerCase().split(/\s+/).filter(Boolean);
  return journalPosts.filter(post => {
    const text = `${post.title} ${post.description} ${post.category} ${post.sections.map(section => section.heading).join(' ')}`.toLowerCase();
    return words.every(word => text.includes(word));
  });
});
</script>
