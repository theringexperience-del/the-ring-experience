<template>
  <div class="bg-[#FAF7F1] px-[6%] pb-28 pt-40 text-[#38291F]">
    <div class="mx-auto max-w-4xl"><p class="text-xs uppercase tracking-[.2em] text-[#795B3C]">Page not found</p><h1 class="mt-5 font-display text-5xl sm:text-7xl">Let's get you back to the workbench.</h1><p class="mt-6 max-w-xl text-lg leading-relaxed">This page may have moved. Explore our workshops, plan a custom ring or get in touch with your ideas.</p><div class="mt-8 flex flex-wrap gap-4"><RouterLink to="/ouroffers" class="bg-[#704D29] px-6 py-3 text-white">Explore workshops</RouterLink><RouterLink to="/design-your-ring" class="border border-[#755024] px-6 py-3">Plan a ring</RouterLink></div></div>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
</script>
