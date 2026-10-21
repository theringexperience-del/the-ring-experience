<template>
    <div class="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-[#FAF7F1]" aria-hidden="true">
        <img v-if="backgroundImage" :src="backgroundImage" alt="" width="1600" height="900" decoding="async"
            fetchpriority="low" class="h-full w-full object-cover object-center opacity-[0.06]">
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { fetchSiteAppearanceContentFromSanity, toWebImage, initialContent } from '../utils/sanity';

const cmsAppearance = ref(initialContent('SITE_APPEARANCE_QUERY') ?? {});
const backgroundImage = computed(() => {
    const image = cmsAppearance.value?.globalBackgroundImage;
    return image ? toWebImage(image, { width: 1600, quality: 72 }) : null;
});

onMounted(async () => {
    cmsAppearance.value = await fetchSiteAppearanceContentFromSanity() ?? {};
});
</script>
