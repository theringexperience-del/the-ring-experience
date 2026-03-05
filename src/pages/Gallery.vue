<template>
    <main id="gallery" ref="galleryRoot" class="w-full">
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
                <div data-reveal class="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div v-for="(columnItems, columnIndex) in galleryColumns" :key="`gallery-col-${columnIndex}`"
                        class="gallery-column flex flex-col gap-6">
                        <article v-for="photo in columnItems" :key="`${photo.caption}-${photo.dateLabel}`"
                            class="gallery-card reveal-card overflow-hidden border bg-white/74"
                            style="border-color: color-mix(in srgb, var(--color-darkbrown) 14%, transparent);">
                            <img :src="toWebImage(photo.image, { width: 1100, quality: 78 })" :alt="photo.caption"
                                class="gallery-image aspect-[4/5] w-full object-cover">
                            <div class="p-5">
                                <p class="text-sm tracking-[0.1em] text-(--color-mutedbrown) uppercase">{{ photo.dateLabel }}</p>
                                <h3 class="mt-2 font-display text-2xl leading-tight text-(--color-brown)">{{ photo.caption }}</h3>
                                <p class="mt-3 text-base leading-relaxed text-(--color-brown)" style="opacity: 0.86;">
                                    {{ photo.story }}
                                </p>
                            </div>
                        </article>
                    </div>
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
import { fetchClientGalleryContentFromSanity, fetchSocialContentFromSanity, toWebImage } from '../utils/sanity';

const cmsGalleryContent = ref({});
const cmsSocialContent = ref({});

const introContent = computed(() => ({
    eyebrow: cmsGalleryContent.value?.intro?.eyebrow ?? '',
    heading: cmsGalleryContent.value?.intro?.heading ?? '',
    description: cmsGalleryContent.value?.intro?.description ?? ''
}));
const photos = computed(() => (
    (Array.isArray(cmsGalleryContent.value?.photos) ? cmsGalleryContent.value.photos : []).filter((photo) => photo?.isVisible !== false)
));
const galleryColumns = computed(() => {
    const columns = [[], [], []];
    photos.value.forEach((photo, index) => columns[index % 3].push(photo));
    return columns;
});
const offersCalloutContent = computed(() => ({
    eyebrow: 'Our offers',
    heading: 'Ready for your own ring story?',
    description: 'Explore all packages and choose your preferred experience format.',
    buttonLabel: 'Discover our offers',
    buttonLink: '/ouroffers'
}));

const galleryRoot = ref(null);
const { setupRevealAnimations } = useRevealAnimations(galleryRoot, { selectors: ['[data-reveal]', '.reveal-card'], start: 'top 88%' });
onMounted(async () => {
    const [sanityGallery, sanitySocial] = await Promise.all([
        fetchClientGalleryContentFromSanity(),
        fetchSocialContentFromSanity()
    ]);
    cmsGalleryContent.value = sanityGallery ?? {};
    cmsSocialContent.value = sanitySocial ?? {};
    await nextTick();
    setupRevealAnimations();
});
</script>

<style scoped>
.gallery-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.gallery-image {
    transition: transform 0.45s ease;
}

@media (hover: hover) and (pointer: fine) and (min-width: 1024px) {
    .gallery-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 18px 40px color-mix(in srgb, var(--color-darkbrown) 15%, transparent);
        border-color: color-mix(in srgb, var(--color-noisette) 40%, transparent) !important;
    }

    .gallery-card:hover .gallery-image {
        transform: scale(1.025);
    }
}
</style>
