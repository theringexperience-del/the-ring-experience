<template>
    <section class="relative overflow-hidden bg-black pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28">
        <div class="pointer-events-none absolute inset-0">
            <div class="absolute inset-0 bg-cover bg-center" :style="heroBackgroundStyle"></div>
            <div class="absolute inset-0 bg-(--color-darkerbrown)" style="opacity: 0.6;"></div>
            <div class="absolute inset-0"
                style="background: linear-gradient(to bottom, color-mix(in srgb, var(--color-darkbrown) 35%, transparent), color-mix(in srgb, var(--color-darkbrown) 80%, transparent));">
            </div>
        </div>

        <div class="relative mx-auto w-11/12 sm:w-10/12">
            <div class="max-w-4xl text-(--color-lightbeige)">
                <p class="text-xs tracking-[0.2em] uppercase" style="opacity: 0.74;">{{ mergedContent.eyebrow }}</p>
                <h1 class="mt-5 max-w-3xl font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
                    {{ mergedContent.title }}
                </h1>
                <p class="mt-6 max-w-2xl text-base leading-relaxed sm:text-lg" style="opacity: 0.86;">
                    {{ mergedContent.description }}
                </p>
                <div class="mt-8 h-px w-24 bg-(--color-noisette)"></div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import heroFallbackImage from '../assets/herocover.jpeg';
import { toWebImage } from '../utils/sanity';

const props = defineProps({
    content: {
        type: Object,
        default: () => ({})
    }
});

const fallback = {
    eyebrow: 'Our Story',
    title: 'Crafted memories, shaped by your hands.',
    description: 'A quieter and more meaningful way to carry a piece of your travel story.',
    backgroundImage: heroFallbackImage
};

const mergedContent = computed(() => ({
    ...fallback,
    ...(props.content ?? {})
}));

const heroBackgroundStyle = computed(() => ({
    backgroundImage: `url(${toWebImage(mergedContent.value.backgroundImage, { width: 2200, quality: 80 })})`
}));
</script>
