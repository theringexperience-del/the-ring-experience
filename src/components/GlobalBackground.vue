<template>
    <div class="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
        <img :src="resolvedImage" alt="" aria-hidden="true" width="1600" height="900" decoding="async"
            fetchpriority="low" class="h-full w-full object-cover object-center opacity-18 brightness-75">
        <div class="absolute inset-0"
            style="background: color-mix(in srgb, var(--color-lightbeige) 60%, transparent);"></div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import defaultHeroImage from '../assets/herocover.jpeg';
import { fetchSiteAppearanceContentFromSanity, toWebImage } from '../utils/sanity';

const cmsAppearance = ref({});

const resolvedImage = computed(() => {
    const cmsImage = cmsAppearance.value?.globalBackgroundImage;
    if (cmsImage) {
        return toWebImage(cmsImage, { width: 1600, quality: 72 });
    }
    return defaultHeroImage;
});

onMounted(async () => {
    const sanityAppearance = await fetchSiteAppearanceContentFromSanity();
    cmsAppearance.value = sanityAppearance ?? {};
});
</script>
