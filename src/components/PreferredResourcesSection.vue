<template>
  <section id="resources" aria-labelledby="resources-heading" class="bg-(--color-panel) px-[6%] py-12 sm:py-16">
    <div class="mx-auto max-w-6xl">
      <div class="flex flex-col justify-between gap-7 lg:flex-row lg:items-start">
        <div class="lg:max-w-sm"><p class="text-xs uppercase tracking-[.2em] text-(--color-mutedbrown)">{{ content.eyebrow }}</p><h2 id="resources-heading" class="mt-3 font-display text-3xl leading-tight text-(--color-darkbrown) sm:text-4xl">{{ content.heading }}</h2></div>
        <nav aria-label="Workshop resources" class="grid gap-x-10 gap-y-1 sm:grid-cols-2 lg:min-w-[52%]">
          <RouterLink v-for="item in content.links" :key="item.href" :to="item.href" class="flex min-h-12 items-center justify-between gap-8 border-b border-(--color-border) py-3 text-sm text-(--color-mutedbrown) hover:text-(--color-darkbrown)">{{ item.label }} <span aria-hidden="true">→</span></RouterLink>
        </nav>
      </div>
      <div class="mt-5"><GooglePreferredSource /></div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { initialContent, fetchContentByType } from '../utils/sanity.js';
import { RouterLink } from 'vue-router'
import GooglePreferredSource from './GooglePreferredSource.vue'
defineProps({ reviewsUrl: { type:String, default:'' } })
const content = ref(initialContent('RESOURCE_LINKS_QUERY') ?? {});
onMounted(async () => { content.value = await fetchContentByType('RESOURCE_LINKS_QUERY') ?? content.value; });
</script>
