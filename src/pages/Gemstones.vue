<template>
    <main id="gemstones" ref="gemstonesRoot" class="w-full">
        <section data-reveal class="w-full pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-32">
            <div class="mx-auto w-11/12 sm:w-10/12">
                <div class="mx-auto max-w-3xl text-center">
                    <p class="text-xs tracking-[0.2em] text-(--color-mutedbrown) uppercase">{{ introContent.eyebrow }}</p>
                    <h2 class="mt-3 font-display text-5xl leading-tight text-(--color-brown) sm:text-6xl">{{ introContent.heading }}</h2>
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

        <GemstonesOffersCallout :content="offersCalloutContent" />
        <SocialSection :content="cmsSocialContent" />
    </main>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue';
import GemstonesOffersCallout from '../components/GemstonesOffersCallout.vue';
import SocialSection from '../components/SocialSection.vue';
import { useRevealAnimations } from '../composables/useRevealAnimations';
import { fetchGemstonesPageContentFromSanity, fetchSocialContentFromSanity, toWebImage } from '../utils/sanity';

const cmsGemstonesContent = ref({});
const cmsSocialContent = ref({});
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
    cmsGemstonesContent.value = sanityGemstones ?? {};
    cmsSocialContent.value = sanitySocial ?? {};
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
