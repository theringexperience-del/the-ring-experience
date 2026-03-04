<template>
    <section v-if="mergedContent.enabled" class="relative w-full overflow-hidden py-20 sm:py-24 lg:py-32">
        <div class="pointer-events-none absolute inset-0">
            <div class="absolute inset-0 bg-cover bg-center" :style="backgroundStyle"></div>
            <div class="absolute inset-0 bg-(--color-darkbrown)" style="opacity: 0.68;"></div>
            <div class="absolute inset-0"
                style="background: radial-gradient(circle at 20% 20%, color-mix(in srgb, var(--color-noisette) 25%, transparent), transparent 52%), linear-gradient(to right, color-mix(in srgb, var(--color-darkbrown) 88%, transparent), color-mix(in srgb, var(--color-darkbrown) 64%, transparent));">
            </div>
        </div>

        <div class="relative mx-auto w-11/12 sm:w-10/12">
            <div class="grid gap-8 border p-7 text-(--color-lightbeige) sm:gap-10 sm:p-10 lg:grid-cols-12 lg:items-end lg:p-12"
                style="border-color: color-mix(in srgb, var(--color-lightbeige) 32%, transparent); background: color-mix(in srgb, var(--color-darkerbrown) 54%, transparent);">
                <div class="lg:col-span-8">
                    <p class="text-xs tracking-[0.2em] uppercase" style="opacity: 0.8;">{{ mergedContent.eyebrow }}</p>
                    <h2 class="mt-3 max-w-3xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
                        {{ mergedContent.heading }}
                    </h2>
                    <p class="mt-4 max-w-2xl text-base leading-relaxed sm:text-lg" style="opacity: 0.9;">
                        {{ mergedContent.description }}
                    </p>
                </div>
                <div class="flex items-end lg:col-span-4 lg:justify-end">
                    <router-link :to="mergedContent.buttonLink" class="w-full sm:w-auto">
                        <Button class="w-full sm:w-auto" variant="outline">
                            {{ mergedContent.buttonLabel }}
                        </Button>
                    </router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import Button from './Button.vue';
import heroFallbackImage from '../assets/herocover.jpeg';
import { toWebImage } from '../utils/sanity';

const props = defineProps({
    content: {
        type: Object,
        default: () => ({})
    }
});

const fallback = {
    enabled: true,
    eyebrow: 'Ready to begin',
    heading: 'Book your ring experience',
    description: 'Choose your date and create something that stays with you.',
    buttonLabel: 'Book now',
    buttonLink: '/bookexperience',
    backgroundImage: heroFallbackImage
};

const mergedContent = computed(() => ({
    ...fallback,
    ...(props.content ?? {})
}));

const backgroundStyle = computed(() => ({
    backgroundImage: `url(${toWebImage(mergedContent.value.backgroundImage, { width: 2200, quality: 80 })})`
}));
</script>
