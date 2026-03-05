<template>
    <section class="w-full bg-black py-16 text-(--color-lightbeige) sm:py-20">
        <div class="mx-auto flex w-11/12 flex-col items-start justify-between gap-6 sm:w-10/12 lg:flex-row lg:items-center">
            <div>
                <p class="text-xs tracking-[0.2em] uppercase" style="opacity: 0.72;">{{ mergedContent.eyebrow }}</p>
                <h3 class="mt-2 font-display text-3xl leading-tight sm:text-4xl">{{ mergedContent.heading }}</h3>
                <p v-if="mergedContent.description" class="mt-3 max-w-xl text-sm sm:text-base" style="opacity: 0.86;">
                    {{ mergedContent.description }}
                </p>
            </div>
            <router-link :to="mergedContent.buttonLink" class="shrink-0">
                <Button variant="outline">{{ mergedContent.buttonLabel }}</Button>
            </router-link>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';
import Button from './Button.vue';

const props = defineProps({
    content: {
        type: Object,
        default: () => ({})
    }
});

const mergedContent = computed(() => ({
    eyebrow: props.content?.eyebrow ?? 'Our offers',
    heading: props.content?.heading ?? 'Discover our offers',
    description: props.content?.description ?? '',
    buttonLabel: props.content?.buttonLabel ?? 'Discover our offers',
    buttonLink: props.content?.buttonLink ?? '/ouroffers'
}));
</script>
