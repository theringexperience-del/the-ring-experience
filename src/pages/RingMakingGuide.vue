<template>
  <article class="pb-20 text-(--color-darkbrown)">
    <header class="bg-(--color-panel) pb-16 pt-36 sm:pb-20 sm:pt-44"><div class="mx-auto w-11/12 max-w-5xl sm:w-10/12"><p class="text-xs tracking-[.2em] text-(--color-action) uppercase">{{ section('hero').eyebrow }}</p><h1 class="mt-5 max-w-4xl font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">{{ section('hero').heading }}</h1><CmsRichText :blocks="section('hero').body" class="mt-7 max-w-2xl text-lg leading-relaxed text-(--color-mutedbrown)"/></div></header>
    <div class="mx-auto grid w-11/12 max-w-5xl gap-12 pt-16 sm:w-10/12 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-20">
      <div class="space-y-14 text-base leading-[1.8] sm:text-lg">
        <section v-for="item in guideSections" :id="item.key" :key="item.key"><h2 class="font-display text-3xl leading-tight sm:text-4xl">{{ item.heading }}</h2><CmsRichText :blocks="item.body" class="mt-5"/></section>
        <aside class="border border-(--color-border) bg-(--color-panel) p-7 sm:p-9"><p class="text-xs tracking-[.18em] text-(--color-action) uppercase">{{ section('closing').eyebrow }}</p><h2 class="mt-3 font-display text-3xl">{{ section('closing').heading }}</h2><CmsRichText :blocks="section('closing').body" class="mt-3"/><RouterLink v-for="link in section('closing').links" :key="link.href" :to="link.href" class="ui-button ui-button-solid mt-6 inline-block px-6 py-3">{{ link.label }}</RouterLink></aside>
      </div>
      <nav aria-label="On this page" class="self-start border-t border-(--color-border) pt-5 text-sm text-(--color-mutedbrown) lg:sticky lg:top-28"><p class="mb-4 font-medium tracking-[.12em] uppercase">{{ section('navigation').heading }}</p><a v-for="link in section('navigation').links" :key="link.href" :href="link.href" class="block py-2 hover:underline">{{ link.label }}</a></nav>
    </div>
  </article>
</template>
<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import CmsRichText from '../components/CmsRichText.vue';
import { useEditorialPage } from '../composables/useEditorialPage.js';
const { page, section } = useEditorialPage('/ring-making-guide');
const guideSections = computed(() => page.value?.sections?.filter(section => ['what-to-expect','beginners','choose-workshop','plan-visit'].includes(section.key)) ?? []);
</script>
