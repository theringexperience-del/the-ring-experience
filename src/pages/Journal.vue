<template>
  <div class="bg-[#FAF7F1] text-(--color-darkbrown)">
    <header class="bg-(--color-panel) px-[6%] pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div class="mx-auto max-w-6xl">
        <p class="text-xs tracking-[.22em] uppercase text-[#7A603F]">{{ section('hero').eyebrow }}</p>
        <h1 class="mt-5 max-w-4xl font-display text-5xl leading-tight sm:text-7xl">{{ section('hero').heading }}</h1>
        <CmsRichText :blocks="section('hero').body" class="mt-6 max-w-2xl text-lg leading-relaxed text-(--color-mutedbrown)"/>
      </div>
    </header>
    <div class="mx-auto max-w-6xl px-[6%] pt-10">
      <label for="journal-search" class="block text-sm text-(--color-mutedbrown)">Find a jewellery question</label>
      <input id="journal-search" v-model.trim="search" type="search" placeholder="Try silver, wedding rings, gemstones or Negombo" class="border border-(--color-border) bg-white text-(--color-darkbrown) rounded-sm mt-3 min-h-12 w-full max-w-2xl px-4 py-3" />
      <p class="mt-3 text-sm text-(--color-mutedbrown)" role="status">{{ filteredPosts.length }} {{ filteredPosts.length === 1 ? 'guide' : 'guides' }} found</p>
      <p v-if="!filteredPosts.length" class="mt-4">Try another topic, or <RouterLink to="/faq" class="underline">browse workshop FAQs</RouterLink>.</p>
    </div>
    <section aria-label="Articles" class="mx-auto grid max-w-6xl gap-5 px-[6%] py-16 md:grid-cols-2 xl:grid-cols-3 sm:py-20">
      <article v-for="(post, index) in filteredPosts" :key="post.slug" class="flex min-h-84 flex-col border border-(--color-border) bg-white p-7">
        <p class="text-xs tracking-[.16em] uppercase text-[#8A6844]">{{ String(index + 1).padStart(2, '0') }} · {{ post.category }}</p>
        <h2 class="mt-10 font-display text-3xl leading-tight"><RouterLink :to="`/journal/${post.slug}`" class="hover:underline">{{ post.title }}</RouterLink></h2>
        <p class="mt-5 grow leading-relaxed text-(--color-mutedbrown)">{{ post.description }}</p>
        <RouterLink :to="`/journal/${post.slug}`" class="mt-8 border-t border-(--color-border) pt-5 text-sm font-medium text-(--color-action)">Read article <span aria-hidden="true">↗</span></RouterLink>
      </article>
    </section>
    <div class="mx-auto max-w-6xl px-[6%] pb-20"><RouterLink to="/ouroffers" class="ui-button ui-button-outline inline-flex px-6 py-3">Explore workshops</RouterLink></div>
  </div>
</template>

<script setup>
import CmsRichText from '../components/CmsRichText.vue';
import { useEditorialPage } from '../composables/useEditorialPage.js';
const { section } = useEditorialPage('/journal');
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { journalPosts, loadJournal } from '../content/journal.js';
loadJournal();
const search = ref('');
const filteredPosts = computed(() => {
  const words = search.value.toLowerCase().split(/\s+/).filter(Boolean);
  return journalPosts.value.filter(post => {
    const text = `${post.title} ${post.description} ${post.category} ${post.sections.map(section => section.heading).join(' ')}`.toLowerCase();
    return words.every(word => text.includes(word));
  });
});
</script>
