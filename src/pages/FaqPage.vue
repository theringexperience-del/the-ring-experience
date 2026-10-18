<template>
    <main ref="faqRoot" class="w-full">
        <PageTitleSection :content="heroContent" />

        <section data-reveal class="w-full pb-16 sm:pb-20 lg:pb-24">
            <div class="mx-auto w-11/12 sm:w-10/12">
                <div class="grid grid-cols-1 gap-4">
                    <details v-for="(item, index) in faqItems" :key="`${index}-${item.question}`"
                        class="group border bg-white/72 p-5 sm:p-6"
                        style="border-color: color-mix(in srgb, var(--color-darkbrown) 16%, transparent);">
                        <summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-2xl leading-tight text-(--color-brown)">
                            <span>{{ item.question }}</span>
                            <span class="text-(--color-noisette) transition-transform duration-200 group-open:rotate-45">+</span>
                        </summary>
                        <p class="mt-4 max-w-4xl text-base leading-relaxed whitespace-pre-line text-(--color-brown) sm:text-lg"
                            style="opacity: 0.88;">
                            {{ item.answer }}
                        </p>
                    </details>
                </div>
            </div>
        </section>

        <section class="bg-[#EFE7DA] px-[6%] py-16 text-[#38291F] sm:py-20" aria-labelledby="more-guides-heading">
            <div class="mx-auto max-w-6xl">
                <p class="text-xs uppercase tracking-[.18em] text-[#795B3C]">More answers from the workbench</p>
                <h2 id="more-guides-heading" class="mt-4 font-display text-3xl sm:text-5xl">Planning a meaningful ring?</h2>
                <p class="mt-5 max-w-2xl leading-relaxed">Read our guides to wedding bands, engagement designs and coloured gemstones. Each explains what to ask an artisan before you book.</p>
                <div class="mt-9 grid gap-4 md:grid-cols-3">
                    <RouterLink to="/journal/make-your-own-wedding-rings-sri-lanka" class="border border-[#CBBBA5] bg-white p-6 font-display text-2xl hover:underline">Making wedding rings together ↗</RouterLink>
                    <RouterLink to="/journal/engagement-ring-design-workshop-guide" class="border border-[#CBBBA5] bg-white p-6 font-display text-2xl hover:underline">Planning an engagement ring ↗</RouterLink>
                    <RouterLink to="/journal/sri-lankan-gemstones-for-rings" class="border border-[#CBBBA5] bg-white p-6 font-display text-2xl hover:underline">Choosing a gemstone ↗</RouterLink>
                </div>
            </div>
        </section>

        <SocialSection :content="cmsSocialContent" />
    </main>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import PageTitleSection from '../components/PageTitleSection.vue';
import SocialSection from '../components/SocialSection.vue';
import { useRevealAnimations } from '../composables/useRevealAnimations';
import { fetchFaqPageContentFromSanity, fetchSocialContentFromSanity } from '../utils/sanity';

const cmsFaqContent = ref({});
const cmsSocialContent = ref({});
const faqRoot = ref(null);
const { setupRevealAnimations } = useRevealAnimations(faqRoot);

const fallbackFaqItems = [
    {
        question: 'How long does the ring-making experience take?',
        answer: 'The Essential is listed at 90–120 minutes, Signature at around three hours, and Ceremony at four hours or more. Confirm timing for your design when booking.'
    },
    {
        question: 'Is the experience suitable for beginners?',
        answer: 'Yes. Guests do not need previous jewelry-making experience. The workshop is guided step by step.'
    },
    {
        question: 'Can we choose gemstones during the session?',
        answer: 'Ask in advance. Gemstone availability, setting time and additional costs depend on the stone and design. An artisan may need to handle the technical setting step.'
    },
    {
        question: 'Do I need to book in advance?',
        answer: 'Advance booking is recommended, especially during busy travel periods, so the preferred day and time can be reserved.'
    },
    {
        question: 'Can couples or friends join together?',
        answer: 'Yes. The experience can be enjoyed solo or shared, depending on the package selected.'
    }
];

const heroContent = computed(() => ({
    eyebrow: cmsFaqContent.value?.hero?.eyebrow ?? 'FAQ',
    title: cmsFaqContent.value?.hero?.title ?? 'Frequently Asked Questions',
    description: cmsFaqContent.value?.hero?.description ?? 'Find quick answers to the questions guests ask most often before booking their ring-making experience.'
}));

const faqItems = computed(() => {
    const items = Array.isArray(cmsFaqContent.value?.items)
        ? cmsFaqContent.value.items.filter((item) => item?.question && item?.answer)
        : [];
    return items.length ? items : fallbackFaqItems;
});

onMounted(async () => {
    const [sanityFaq, sanitySocial] = await Promise.all([
        fetchFaqPageContentFromSanity(),
        fetchSocialContentFromSanity()
    ]);
    cmsFaqContent.value = sanityFaq ?? {};
    cmsSocialContent.value = sanitySocial ?? {};
    await nextTick();
    if (window.innerWidth >= 768) {
        setupRevealAnimations();
    }
});
</script>
