<template>
  <div class="bg-[#FAF7F1] text-(--color-darkbrown)">
    <header class="bg-(--color-darkbrown) pb-16 pt-36 text-(--color-lightbeige) sm:pb-24 sm:pt-44">
      <div class="editorial-container grid items-end gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)] lg:gap-16">
        <div><p class="text-xs uppercase tracking-[.22em] text-(--color-accent-light)">{{ section('hero').eyebrow }}</p><h1 class="mt-6 max-w-4xl font-display text-4xl leading-[1.12] sm:text-5xl lg:text-6xl xl:text-7xl">{{ section('hero').heading }}</h1><CmsRichText :blocks="section('hero').body?.slice(0,1)" class="mt-7 max-w-2xl text-lg leading-relaxed text-[#E6D8C6]"/><div class="mt-8 flex flex-wrap gap-3"><RouterLink v-for="(link,index) in section('hero').links?.slice(0,2)" :key="link.href" :to="link.href" class="inline-flex min-h-12 items-center px-6 text-sm uppercase tracking-[.1em]" :class="index === 0 ? 'ui-button ui-button-solid' : 'ui-button ui-button-light'">{{ link.label }}</RouterLink></div></div>
        <div class="border-l border-[#9A8264] pl-6 text-sm leading-relaxed text-[#E6D8C6]"><CmsRichText :blocks="section('hero').body?.slice(1)"/><a :href="section('hero').links?.[2]?.href || publicLinks.googleMapsUrl" target="_blank" rel="noopener noreferrer" class="mt-5 inline-block underline underline-offset-4">{{ section('hero').links?.[2]?.label }}</a></div>
      </div>
    </header>
    <section class="editorial-container py-16 sm:py-24" aria-labelledby="choose-heading">
      <p class="text-xs uppercase tracking-[.18em] text-(--color-mutedbrown)">{{ section('choose').eyebrow }}</p><h2 id="choose-heading" class="mt-4 font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">{{ section('choose').heading }}</h2>
      <div class="mt-10 grid gap-6 lg:grid-cols-3"><article v-for="index in 3" :key="index" class="border border-(--color-border) min-w-0 bg-white p-6 sm:p-8 lg:p-6 xl:p-8"><span class="font-display text-3xl italic text-[#A17B4D]">0{{ index }}</span><h3 class="mt-4 font-display text-2xl">{{ section('question'+index).heading }}</h3><CmsRichText :blocks="section('question'+index).body" class="mt-4 leading-relaxed text-(--color-mutedbrown)"/></article></div>
    </section>
    <section class="bg-(--color-panel) py-16 sm:py-20" aria-labelledby="ways-heading"><div class="editorial-container grid gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20"><div><p class="text-xs uppercase tracking-[.18em] text-(--color-mutedbrown)">{{ section('ways').eyebrow }}</p><h2 id="ways-heading" class="mt-4 font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">{{ section('ways').heading }}</h2></div><div class="space-y-7 leading-relaxed text-(--color-mutedbrown)"><div v-for="index in 2" :key="index"><h3 class="font-display text-2xl text-(--color-darkbrown)">{{ section('way'+index).heading }}</h3><CmsRichText :blocks="section('way'+index).body" class="mt-2"/></div><RouterLink v-for="link in section('ways').links" :key="link.href" :to="link.href" class="inline-block border-b border-[#8E6A42] pb-1 text-sm text-(--color-action)">{{ link.label }}</RouterLink></div></div></section>
    <section class="editorial-container py-16 sm:py-24" aria-labelledby="questions-heading"><p class="text-xs uppercase tracking-[.18em] text-(--color-mutedbrown)">{{ section('questions').eyebrow }}</p><h2 id="questions-heading" class="mt-4 font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">{{ section('questions').heading }}</h2><div class="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:gap-x-16 lg:gap-y-12"><div v-for="item in questions" :key="item.key" class="border-t border-(--color-border) pt-5"><h3 class="font-display text-2xl">{{ item.heading }}</h3><CmsRichText :blocks="item.body" class="mt-3 leading-relaxed text-(--color-mutedbrown)"/></div></div><div class="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-(--color-action)"><RouterLink v-for="link in section('questions').links" :key="link.href" :to="link.href" class="underline underline-offset-4">{{ link.label }}</RouterLink></div></section>
    <section class="bg-(--color-darkbrown) px-5 sm:px-8 lg:px-12 py-16 text-center text-(--color-lightbeige)"><h2 class="font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">{{ section('section1').heading }}</h2><CmsRichText :blocks="section('section1').body" class="mx-auto mt-5 max-w-xl leading-relaxed text-[#E6D8C6]"/><RouterLink v-for="link in section('section1').links" :key="link.href" :to="link.href" class="ui-button ui-button-solid mt-7 inline-flex min-h-12 items-center px-7">{{ link.label }}</RouterLink></section>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import CmsRichText from '../components/CmsRichText.vue';
import { useEditorialPage } from '../composables/useEditorialPage.js';
import { useBusinessLinks } from '../composables/useBusinessLinks.js';
const publicLinks = useBusinessLinks();
const { page, section } = useEditorialPage('/custom-jewellery-sri-lanka');
const questions = computed(() => page.value?.sections?.filter(section => /^questions\d+$/.test(section.key)) ?? []);
</script>
