<template>
    <article class="group experience-card w-full overflow-hidden bg-(--color-panel)">
        <div class="overflow-hidden">
            <img @error="useClientImage($event, fallbackImage)" :src="optimizedImage" :srcset="imageSrcSet || undefined" :alt="imageAlt || title" loading="lazy" decoding="async"
                width="900" height="1200" sizes="(min-width: 768px) 30vw, 92vw"
                class="aspect-[4/5] w-full object-cover object-center transition-transform duration-700 motion-safe:md:group-hover:scale-105">
        </div>
        <div class="p-6 text-[#2A1E17] md:p-5 lg:p-6 xl:p-8">
            <h3 class="font-display text-3xl font-medium md:text-2xl xl:text-3xl">{{ title }}</h3>
            <p v-if="lineOne" class="mt-3 text-sm leading-relaxed text-[#66533F] sm:text-base">{{ lineOne }}</p>
            <p v-if="lineTwo" class="text-sm leading-relaxed text-[#66533F] sm:text-base">{{ lineTwo }}</p>
        </div>
    </article>
</template>

<script setup>
import { computed } from 'vue'
import { useClientImage } from '../utils/contentFallback.js';
import { optimizeImageSource, toImageSrcSet } from '../utils/sanity'

const props = defineProps({
    fallbackImage: { type: String, default: '' },
    title: {
        type: String,
        required: true
    },
    lineOne: {
        type: String,
        required: true
    },
    lineTwo: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: '/the-ring-experience-logo.svg'
    },
    imageAlt: {
        type: String,
        default: ''
    }
})

const optimizedImage = computed(() => optimizeImageSource(props.image, { width: 900, quality: 76 }))
const imageSrcSet = computed(() => toImageSrcSet(props.image, [480, 720, 900, 1200], { quality: 76 }))
</script>
