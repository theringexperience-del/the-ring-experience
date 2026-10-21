<template>
    <main id="gemstones" ref="gemstonesRoot" class="w-full">
        <section data-reveal class="w-full pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-32">
            <div class="mx-auto w-11/12 sm:w-10/12">
                <div class="mx-auto max-w-3xl text-center">
                    <p class="text-xs tracking-[0.2em] text-(--color-mutedbrown) uppercase">{{ introContent.eyebrow }}</p>
                    <h1 class="mt-3 font-display text-5xl leading-tight text-(--color-brown) sm:text-6xl">{{ introContent.heading }}</h1>
                    <p class="mx-auto mt-4 max-w-2xl text-base text-(--color-brown) sm:text-lg" style="opacity: 0.85;">
                        {{ introContent.description }}
                    </p>
                </div>

                <div class="mx-auto mt-8 h-px w-24 bg-(--color-noisette)"></div>

                <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    <article v-for="stone in gemstones" :key="stone.key || stone.name"
                        class="gem-card w-full overflow-hidden border bg-(--color-lightbeige)"
                        style="border-color: color-mix(in srgb, var(--color-darkbrown) 16%, transparent);">
                        <img :src="toWebImage(stone.image, { width: 900, quality: 78 })" :alt="stone.name"
                            width="900" height="900" loading="lazy" decoding="async"
                            class="gem-card-image h-64 w-full object-cover object-center">
                        <div class="p-6 sm:p-7">
                            <p class="text-xs tracking-[0.14em] text-(--color-mutedbrown) uppercase">{{ stone.origin }}</p>
                            <h3 class="mt-2 font-display text-3xl leading-tight text-(--color-brown)">{{ stone.name }}</h3>
                            <p class="mt-2 text-sm tracking-[0.08em] text-(--color-noisette) uppercase">{{ stone.cut }}</p>
                            <p v-if="stone.meaning" class="mt-4 text-sm text-(--color-mutedbrown)">
                                Meaning: <span class="text-(--color-brown)">{{ stone.meaning }}</span>
                            </p>
                            <p class="mt-4 text-base leading-relaxed text-(--color-brown)" style="opacity: 0.86;">
                                {{ stone.description }}
                            </p>
                            <p class="mt-4 text-sm text-(--color-mutedbrown)">
                                Tone: <span class="text-(--color-brown)">{{ stone.tone }}</span>
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <section class="bg-(--color-panel) px-[6%] py-16 text-(--color-darkbrown) sm:py-24" aria-labelledby="gem-buying-heading">
            <div class="mx-auto max-w-6xl"><p class="text-xs uppercase tracking-[.18em] text-(--color-mutedbrown)">{{ section('gem-buying').eyebrow }}</p><h2 id="gem-buying-heading" class="mt-4 max-w-4xl font-display text-4xl leading-tight sm:text-5xl">{{ section('gem-buying').heading }}</h2><CmsRichText :blocks="section('gem-buying').body?.slice(0,1)" class="mt-5 max-w-3xl leading-relaxed text-(--color-mutedbrown)"/>
                <div class="mt-10 grid gap-5 md:grid-cols-3"><article v-for="item in buyingQuestions" :key="item.key" class="border-t border-[#BFAE96] pt-5"><h3 class="font-display text-2xl">{{ item.heading }}</h3><CmsRichText :blocks="item.body" class="mt-3 leading-relaxed text-(--color-mutedbrown)"/></article></div>
                <div class="mt-9 flex flex-wrap gap-x-8 gap-y-3 text-sm text-(--color-action)"><a v-for="link in section('gem-buying').links" :key="link.href" :href="link.href" class="underline underline-offset-4">{{ link.label }}</a></div>
            </div>
        </section>

        <GemstonesOffersCallout :content="offersCalloutContent" />
        <SocialSection :content="cmsSocialContent" />
    </main>
</template>

<script setup>
import CmsRichText from '../components/CmsRichText.vue';
import { useEditorialPage } from '../composables/useEditorialPage.js';
const { page: editorialPage, section } = useEditorialPage('/gemstones');
const buyingQuestions = computed(() => editorialPage.value?.sections?.filter(item => /^gemQuestion/.test(item.key)) ?? []);
import { initialContent } from '../utils/sanity.js';
import { computed, nextTick, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import GemstonesOffersCallout from '../components/GemstonesOffersCallout.vue';
import SocialSection from '../components/SocialSection.vue';
import { useRevealAnimations } from '../composables/useRevealAnimations';
import { fetchGemstonesPageContentFromSanity, fetchSocialContentFromSanity, toWebImage } from '../utils/sanity';

const cmsGemstonesContent = ref(initialContent('GEMSTONES_PAGE_QUERY') ?? {});
const cmsSocialContent = ref(initialContent('SOCIAL_QUERY') ?? {});
const gemstonesRoot = ref(null);
const { setupRevealAnimations } = useRevealAnimations(gemstonesRoot, { selectors: ['[data-reveal]', '.gem-card'], start: 'top 88%' });

const introContent = computed(() => ({
    eyebrow: cmsGemstonesContent.value?.intro?.eyebrow ?? '',
    heading: cmsGemstonesContent.value?.intro?.heading ?? '',
    description: cmsGemstonesContent.value?.intro?.description ?? ''
}));
const gemstones = computed(() => (
    (Array.isArray(cmsGemstonesContent.value?.gemstones) ? cmsGemstonesContent.value.gemstones : []).filter((stone) => stone?.isVisible !== false)
));
const offersCalloutContent = computed(() => ({
    eyebrow: 'Our offers',
    heading: 'Pair your favorite stone with the right package',
    description: 'Compare all available experience formats before booking.',
    buttonLabel: 'Discover our offers',
    buttonLink: '/ouroffers'
}));

onMounted(async () => {
    const [sanityGemstones, sanitySocial] = await Promise.all([
        fetchGemstonesPageContentFromSanity(),
        fetchSocialContentFromSanity()
    ]);
    cmsGemstonesContent.value = sanityGemstones ?? cmsGemstonesContent.value;
    cmsSocialContent.value = sanitySocial ?? cmsSocialContent.value;
    await nextTick();
    setupRevealAnimations();
});
</script>

<style scoped>
.gem-card {
    position: relative;
    transition: transform 0.32s ease, box-shadow 0.32s ease, border-color 0.32s ease;
}

.gem-card-image {
    transition: transform 0.48s ease;
}

@media (hover: hover) and (pointer: fine) and (min-width: 1024px) {
    .gem-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 45px color-mix(in srgb, var(--color-darkbrown) 18%, transparent);
        border-color: color-mix(in srgb, var(--color-noisette) 45%, transparent) !important;
    }

    .gem-card:hover .gem-card-image {
        transform: scale(1.035);
    }
}
</style>
