<template>
    <section class="w-full pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20">
        <div class="mx-auto w-11/12 sm:w-10/12">
            <div class="max-w-4xl">
                <p class="text-xs tracking-[0.2em] text-(--color-mutedbrown) uppercase">{{ mergedContent.eyebrow }}</p>
                <h1 class="mt-4 font-display text-5xl leading-[1.02] text-(--color-brown) sm:text-6xl lg:text-7xl">
                    {{ mergedContent.title }}
                </h1>
                <p v-if="mergedContent.description" class="mt-6 max-w-2xl text-base leading-relaxed text-(--color-brown) sm:text-lg"
                    style="opacity: 0.85;">
                    {{ mergedContent.description }}
                </p>
                <div class="mt-8 h-px w-24 bg-(--color-noisette)"></div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    content: {
        type: Object,
        default: () => ({})
    }
});

const mergedContent = computed(() => ({
    eyebrow: props.content?.eyebrow ?? '',
    title: props.content?.title ?? '',
    description: props.content?.description ?? ''
}));
</script>
