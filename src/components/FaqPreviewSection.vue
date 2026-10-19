<template>
  <section v-if="sectionEnabled" class="bg-[#FAF7F1] px-[6%] py-14 sm:py-18" aria-labelledby="home-faq-title">
    <div class="mx-auto max-w-4xl"><p class="text-xs uppercase tracking-[.18em] text-[#80664A]">A little guidance</p><h2 id="home-faq-title" class="mt-4 font-display text-3xl text-[#38291F] sm:text-4xl">Before you visit.</h2>
      <div class="mt-7 divide-y divide-[#D4C6B2] border-y border-[#D4C6B2]">
        <details v-for="item in homepageItems" :key="item.question" class="group py-5"><summary class="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-medium text-[#38291F]"><span>{{ item.question }}</span><span class="text-xl text-[#80664A] group-open:rotate-45" aria-hidden="true">+</span></summary><p class="mt-4 max-w-3xl whitespace-pre-line text-sm leading-relaxed text-[#604B39]">{{ item.answer }}</p></details>
      </div>
      <router-link :to="previewContent.ctaLink" class="mt-6 inline-flex min-h-11 items-center gap-6 text-sm text-[#755024]">All workshop FAQs <span aria-hidden="true">→</span></router-link>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    content: {
        type: Object,
        default: () => ({})
    },
    items: {
        type: Array,
        default: () => []
    }
});

const fallbackItems = [
    {
        question: 'How long does the experience take?',
        answer: 'Most sessions take around two to three hours, depending on the ring design and any gemstone choices.'
    },
    {
        question: 'Do I need any jewelry-making experience?',
        answer: 'Not at all. The session is guided step by step, so beginners can enjoy the process comfortably.'
    },
    {
        question: 'Can I book in advance while planning my trip?',
        answer: 'Yes. Guests can reserve ahead of time to secure the date that fits best within their Sri Lanka itinerary.'
    }
];

const previewContent = computed(() => ({
    enabled: props.content?.enabled ?? true,
    eyebrow: props.content?.eyebrow ?? 'Most asked',
    heading: props.content?.heading ?? 'Quick answers before you book',
    description: props.content?.description ?? 'This preview section will automatically show the FAQs marked for the homepage in Sanity.',
    ctaLabel: props.content?.ctaLabel ?? 'See all FAQs',
    ctaLink: props.content?.ctaLink ?? '/faq'
}));

const homepageItems = computed(() => {
    const items = Array.isArray(props.items) ? props.items.filter((item) => item?.question && item?.answer) : [];
    return items.length ? items.slice(0, 3) : fallbackItems;
});

const sectionEnabled = computed(() => previewContent.value.enabled !== false);
</script>
