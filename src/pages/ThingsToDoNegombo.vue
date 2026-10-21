<template>
  <article class="bg-[#FAF7F1] text-(--color-darkbrown)">
    <header class="bg-(--color-darkbrown) pb-14 pt-36 text-[#FAF7F1] sm:pb-20 sm:pt-44"><div class="mx-auto max-w-6xl px-[6%]"><p class="text-xs uppercase tracking-[.2em] text-(--color-accent-light)">{{ section('hero').eyebrow }}</p><h1 class="mt-5 max-w-4xl font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">{{ section('hero').heading }}</h1><CmsRichText :blocks="section('hero').body" class="mt-6 max-w-2xl text-lg leading-relaxed text-[#E9E1D4]"/><div class="mt-8 flex flex-wrap gap-3"><a v-for="(link,index) in section('hero').links" :key="link.href" :href="link.href" class="inline-flex min-h-12 items-center px-6 text-sm uppercase tracking-wide" :class="index === 0 ? 'ui-button ui-button-solid' : 'ui-button ui-button-light'">{{ link.label }}</a></div></div></header>
    <div class="mx-auto max-w-6xl px-[6%] py-16 sm:py-20">
      <CmsRichText :blocks="section('introduction').body" class="max-w-3xl text-lg leading-relaxed text-(--color-mutedbrown)"/>
      <div class="mt-14 grid gap-x-16 gap-y-12 md:grid-cols-2"><section v-for="(idea,index) in ideas" :key="idea.key" class="border-t border-(--color-border) pt-5"><p class="text-xs tracking-[.2em] text-(--color-action)">0{{ index + 1 }} / NEGOMBO</p><h2 class="mt-3 font-display text-3xl leading-tight sm:text-4xl">{{ idea.heading }}</h2><CmsRichText :blocks="idea.body" class="mt-4 leading-relaxed text-(--color-mutedbrown)"/><a v-for="link in idea.links" :key="link.href" :href="link.href" class="mt-4 inline-flex min-h-11 items-center border-b border-[#9D7A4B] text-sm text-(--color-action)">{{ link.label }} <span class="ml-4" aria-hidden="true">&rarr;</span></a></section></div>
      <section id="plan" class="mt-20 grid gap-8 bg-(--color-panel) p-7 sm:p-10 lg:grid-cols-[1fr_1.2fr]" aria-labelledby="plan-title"><div><p class="text-xs uppercase tracking-[.2em] text-(--color-mutedbrown)">{{ section('plan').eyebrow }}</p><h2 id="plan-title" class="mt-3 font-display text-4xl leading-tight">{{ section('plan').heading }}</h2><CmsRichText :blocks="section('plan').body" class="mt-5 leading-relaxed text-(--color-mutedbrown)"/></div><ol class="space-y-5 text-(--color-mutedbrown)"><li v-for="step in steps" :key="step.key"><strong class="block text-(--color-darkbrown)">{{ step.heading }}</strong><CmsRichText :blocks="step.body"/></li></ol></section>
      <section class="mt-20 max-w-4xl space-y-8" aria-labelledby="questions-title"><h2 id="questions-title" class="font-display text-4xl">{{ section('questions').heading }}</h2><div v-for="item in questions" :key="item.key"><h3 class="font-display text-2xl">{{ item.heading }}</h3><CmsRichText :blocks="item.body" class="mt-2 leading-relaxed text-(--color-mutedbrown)"/></div></section>
      <aside class="mt-20 border-t border-(--color-border) pt-8"><h2 class="font-display text-3xl">{{ section('closing').heading }}</h2><CmsRichText :blocks="section('closing').body?.slice(0,1)" class="mt-3 max-w-2xl text-(--color-mutedbrown)"/><a v-for="link in section('closing').links?.filter(link => link.href === '/bookexperience')" :key="link.href" :href="link.href" class="mt-6 inline-flex min-h-12 items-center bg-[#754F28] px-6 text-sm uppercase tracking-wide text-white hover:bg-[#5B3D1F]">{{ link.label }}</a><CmsRichText :blocks="section('closing').body?.slice(1)" class="mt-7 text-sm text-(--color-mutedbrown)"/></aside>
    </div>
  </article>
</template>
<script setup>
import { computed } from 'vue';
import CmsRichText from '../components/CmsRichText.vue';
import { useEditorialPage } from '../composables/useEditorialPage.js';
const { page, section } = useEditorialPage('/things-to-do-in-negombo');
const matching = pattern => computed(() => page.value?.sections?.filter(section => pattern.test(section.key)) ?? []);
const ideas = matching(/^ideas\d+$/), steps = matching(/^planStep\d+$/), questions = matching(/^question\d+$/);
</script>
