<template>
  <article v-if="post" class="bg-[#FAF7F1] text-(--color-darkbrown)">
    <header class="bg-(--color-panel) px-[6%] pb-16 pt-36 sm:pb-20 sm:pt-44">
      <div class="mx-auto max-w-4xl">
        <RouterLink to="/journal" class="text-xs uppercase tracking-[.18em] text-(--color-mutedbrown) hover:underline">← The Journal</RouterLink>
        <p class="mt-8 text-xs tracking-[.18em] uppercase text-(--color-mutedbrown)">{{ post.category }} · {{ post.readingTime }}</p>
        <p class="mt-4 text-sm text-(--color-mutedbrown)">By The Ring Experience · Published {{ publishedDate }}</p>
        <h1 class="mt-5 font-display text-5xl leading-tight sm:text-7xl">{{ post.title }}</h1>
        <p class="mt-8 max-w-3xl text-lg leading-relaxed text-(--color-mutedbrown)">{{ post.intro }}</p>
      </div>
    </header>
    <div class="mx-auto grid max-w-6xl gap-14 px-[6%] py-16 lg:grid-cols-[minmax(0,1fr)_14rem] sm:py-20">
      <div class="max-w-3xl">
        <section v-for="section in post.sections" :key="section.heading" class="mb-12 border-b border-(--color-border) pb-12 last:border-b-0">
          <h2 class="font-display text-3xl leading-tight sm:text-4xl">{{ section.heading }}</h2>
          <p v-for="paragraph in section.paragraphs" :key="paragraph" class="mt-6 text-[1.06rem] leading-[1.85] text-(--color-mutedbrown)">{{ paragraph }}</p>
          <a v-if="section.source" :href="section.source.href" target="_blank" rel="noopener noreferrer" class="mt-5 inline-block text-sm text-(--color-action) underline underline-offset-4">Source: {{ section.source.label }}</a>
        </section>
        <div class="bg-(--color-panel) p-8 sm:p-10"><p class="text-xs uppercase tracking-[.18em] text-(--color-mutedbrown)">{{ section('closing').eyebrow }}</p><h2 class="mt-4 font-display text-3xl">{{ section('closing').heading }}</h2><CmsRichText :blocks="section('closing').body" class="mt-4 leading-relaxed text-(--color-mutedbrown)"/><RouterLink v-for="link in section('closing').links" :key="link.href" :to="link.href" class="ui-button ui-button-solid mt-7 inline-flex px-6 py-3">{{ link.label }}</RouterLink></div>
      </div>
      <aside class="lg:sticky lg:top-28 lg:self-start">
        <p class="border-t border-(--color-border) pt-5 text-xs uppercase tracking-[.18em] text-(--color-mutedbrown)">{{ section('related').eyebrow || section('related').body?.[0]?.children?.[0]?.text }}</p>
        <ul class="mt-5 space-y-5"><li v-for="related in relatedPosts" :key="related.slug"><RouterLink :to="`/journal/${related.slug}`" class="font-display text-xl leading-snug hover:underline">{{ related.title }}</RouterLink></li></ul>
        <RouterLink v-for="link in section('related').links" :key="link.href" :to="link.href" class="mt-8 inline-block text-sm text-(--color-action) underline underline-offset-4">{{ link.label }}</RouterLink>
      </aside>
    </div>
  </article>
  <div v-else class="mx-auto max-w-4xl px-[6%] pb-28 pt-40"><h1 class="font-display text-5xl">Article not found</h1><RouterLink to="/journal" class="mt-6 inline-block underline">Browse the journal</RouterLink></div>
</template>

<script setup>
import CmsRichText from '../components/CmsRichText.vue';
import { useEditorialPage } from '../composables/useEditorialPage.js';
const { section } = useEditorialPage('/journal/:slug');
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { getJournalPost, loadJournal } from '../content/journal.js';

loadJournal();
const route = useRoute();
const post = computed(() => getJournalPost(route.params.slug));
const publishedDate = computed(() => post.value ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Colombo' }).format(new Date(post.value.published + 'T12:00:00+05:30')) : '');
const relatedPosts = computed(() => (post.value?.related ?? []).map(getJournalPost).filter(Boolean));
</script>
