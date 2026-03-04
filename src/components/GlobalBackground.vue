<template>
    <div class="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
        <img :src="resolvedImage" alt="" aria-hidden="true" class="h-full w-full object-cover object-center opacity-24">
        <div class="absolute inset-0 bg-white/58"></div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import localSiteAppearance from '../../content/site-appearance.json';
import fallbackBackgroundWebp from '../assets/pexels-dav-h-58867999-7952409.webp';
import { fetchSiteAppearanceContentFromSanity, toWebImage } from '../utils/sanity';

const cmsAppearance = ref(localSiteAppearance);

const resolvedImage = computed(() => {
    const cmsImage = cmsAppearance.value?.globalBackgroundImage;
    if (cmsImage) {
        return toWebImage(cmsImage, { width: 2200, quality: 76 });
    }
    return fallbackBackgroundWebp;
});

onMounted(async () => {
    const sanityAppearance = await fetchSiteAppearanceContentFromSanity();
    if (sanityAppearance) {
        cmsAppearance.value = sanityAppearance;
    }
});
</script>
