<template>
    <article class="group experience-card relative h-96 w-full overflow-hidden sm:h-112 lg:h-136">
        <img :src="image" :alt="title"
            class="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out md:group-hover:scale-105">

        <div
            class="absolute inset-x-0 bottom-0 h-[48%] bg-[#D8C9B6]/58 backdrop-blur-[2px] opacity-100 sm:h-[52%] md:inset-0 md:h-full md:opacity-0 md:transition-opacity md:duration-500 md:ease-out md:group-hover:opacity-100">
        </div>

        <div
            class="absolute inset-x-0 bottom-0 z-10 flex h-[48%] flex-col items-center justify-center px-5 text-center text-[#2A1E17] opacity-100 sm:h-[52%] sm:px-6 md:inset-0 md:h-full md:translate-y-8 md:opacity-0 md:transition-all md:duration-500 md:ease-out md:group-hover:translate-y-0 md:group-hover:opacity-100">
            <h3 class="font-display text-[1.65rem] font-medium sm:text-4xl md:text-5xl">{{ title }}</h3>
            <p class="mt-2 text-[0.82rem] sm:mt-4 sm:text-base">{{ lineOne }}</p>
            <p class="text-[0.82rem] sm:text-base">{{ lineTwo }}</p>
        </div>
    </article>
</template>

<script setup>
defineProps({
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
    }
})
</script>
