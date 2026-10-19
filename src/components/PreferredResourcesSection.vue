<template>
  <section id="resources" aria-labelledby="resources-heading" class="bg-[#EFE7DA] px-[6%] py-12 sm:py-16">
    <div class="mx-auto max-w-6xl">
      <div class="flex flex-col justify-between gap-7 lg:flex-row lg:items-start">
        <div class="lg:max-w-sm"><p class="text-xs uppercase tracking-[.2em] text-[#80664A]">The studio notebook</p><h2 id="resources-heading" class="mt-3 font-display text-3xl leading-tight text-[#38291F] sm:text-4xl">A little inspiration.</h2></div>
        <nav aria-label="Workshop resources" class="grid gap-x-10 gap-y-1 sm:grid-cols-2 lg:min-w-[52%]">
          <RouterLink v-for="item in resources" :key="item.to" :to="item.to" class="flex min-h-12 items-center justify-between gap-8 border-b border-[#C4B59E] py-3 text-sm text-[#604B39] hover:text-[#38291F]">{{ item.title }} <span aria-hidden="true">→</span></RouterLink>
        </nav>
      </div>
      <div class="mt-5"><GooglePreferredSource /></div>
    </div>
  </section>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import GooglePreferredSource from './GooglePreferredSource.vue'
defineProps({ reviewsUrl: { type:String, default:'' } })
const resources = [
  {to:'/ring-making-guide',title:'The workshop guide'},
  {to:'/design-your-ring',title:'Your ring ideas'},
  {to:'/journal',title:'The jewellery journal'},
  {to:'/gemstones',title:'Gemstones & colour'},
]
</script>
