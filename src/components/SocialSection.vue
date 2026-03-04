<template>
    <section id="followus" data-reveal class="relative w-full overflow-hidden py-20 sm:py-24 lg:py-28">
        <div class="pointer-events-none absolute inset-0">
            <div class="parallax-bg absolute inset-0 bg-cover bg-center" :style="backgroundStyle"></div>
            <div class="absolute inset-0 bg-(--color-darkbrown)" style="opacity: 0.64;"></div>
            <div class="absolute inset-0"
                style="background: linear-gradient(to bottom, color-mix(in srgb, var(--color-darkbrown) 42%, transparent), color-mix(in srgb, var(--color-darkbrown) 78%, transparent));">
            </div>
        </div>
        <div class="relative mx-auto w-11/12 max-w-4xl text-center text-(--color-lightbeige) sm:w-10/12">
            <p class="text-xs tracking-[0.2em] uppercase" style="opacity: 0.78;">{{ mergedContent.eyebrow }}</p>
            <h2 class="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                {{ mergedContent.heading }}
            </h2>
            <p class="mx-auto mt-4 max-w-2xl text-base sm:text-lg" style="opacity: 0.88;">
                {{ mergedContent.description }}
            </p>
            <div class="mx-auto mt-7 h-px w-24 bg-(--color-noisette)"></div>
            <div class="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                <a v-for="social in mergedContent.links" :key="social.label" :href="social.href" target="_blank"
                    rel="noopener noreferrer" class="group text-base tracking-[0.08em] uppercase sm:text-lg">
                    <span class="transition-all duration-300 ease-out group-hover:italic">{{ social.label }}</span>
                    <span class="mt-1 block h-px w-0 bg-(--color-noisette) transition-all duration-300 group-hover:w-full"></span>
                </a>
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
    eyebrow: 'Follow Us',
    heading: 'Follow our journey',
    description: 'Behind the scenes, new stories, and handcrafted moments from Sri Lanka.',
    backgroundImage: heroFallbackImage,
    links: [
        { label: 'Instagram', href: 'https://instagram.com' },
        { label: 'TikTok', href: 'https://tiktok.com' },
        { label: 'Pinterest', href: 'https://pinterest.com' }
    ]
};

const mergedContent = computed(() => ({
    ...fallback,
    ...(props.content ?? {}),
    links: Array.isArray(props.content?.links) && props.content.links.length
        ? props.content.links
        : fallback.links
}));

const backgroundStyle = computed(() => ({
    backgroundImage: `url(${toWebImage(mergedContent.value.backgroundImage, { width: 2200, quality: 80 })})`
}));
</script>
