<template>
    <main id="aboutUs" ref="aboutRoot" class="w-full">
        <PageTitleSection :content="heroContent" />

        <section data-reveal class="w-full pb-16 sm:pb-20">
            <div class="mx-auto w-11/12 sm:w-10/12">
                <figure class="overflow-hidden border bg-white/75 p-2 sm:p-3"
                    style="border-color: color-mix(in srgb, var(--color-darkbrown) 18%, transparent);">
                    <img :src="heroContent.backgroundImage" alt="The Ring Experience story"
                        class="h-[24rem] w-full object-cover object-center sm:h-[34rem] lg:h-[40rem] xl:h-[44rem] 2xl:h-[48rem]">
                </figure>
            </div>
        </section>

        
        <section data-reveal class="w-full py-16 sm:py-20 lg:py-24">
            <div class="mx-auto grid w-11/12 grid-cols-1 items-center gap-8 sm:w-10/12 lg:grid-cols-12 lg:gap-14">
                <figure class="lg:col-span-7">
                    <img :src="approachContent.image || heroContent.backgroundImage" alt="Our vision"
                        class="h-[22rem] w-full rounded-xs object-cover object-center sm:h-[30rem] lg:h-[36rem] xl:h-[40rem]">
                </figure>
                <div class="lg:col-span-5">
                    <p class="text-xs tracking-[0.2em] text-(--color-mutedbrown) uppercase">{{ approachContent.eyebrow }}</p>
                    <h2 class="mt-3 font-display text-4xl leading-tight text-(--color-brown) sm:text-5xl">{{ approachContent.title }}</h2>
                    <div class="mt-6 h-px w-20 bg-(--color-noisette)"></div>
                    <p class="mt-6 text-base leading-relaxed text-(--color-brown) sm:text-lg" style="opacity: 0.88;">
                        {{ approachContent.paragraphOne }}
                    </p>
                    <p class="mt-4 text-base leading-relaxed text-(--color-brown) sm:text-lg" style="opacity: 0.88;">
                        {{ approachContent.paragraphTwo }}
                    </p>
                </div>
            </div>
        </section>

        <section data-reveal class="w-full bg-black py-16 text-(--color-lightbeige) sm:py-20 lg:py-24">
            <div class="mx-auto grid w-11/12 grid-cols-1 items-center gap-8 sm:w-10/12 lg:grid-cols-12 lg:gap-14">
                <div class="lg:order-2 lg:col-span-7">
                    <img :src="originContent.image || heroContent.backgroundImage" alt="How it started"
                        class="h-[22rem] w-full rounded-xs object-cover object-center sm:h-[30rem] lg:h-[36rem] xl:h-[40rem]">
                </div>
                <div class="lg:order-1 lg:col-span-5">
                    <p class="text-xs tracking-[0.2em] uppercase" style="opacity: 0.74;">{{ originContent.eyebrow }}</p>
                    <h2 class="mt-3 font-display text-4xl leading-tight sm:text-5xl">{{ originContent.title }}</h2>
                    <div class="mt-6 h-px w-20 bg-(--color-noisette)"></div>
                    <p class="mt-6 text-base leading-relaxed sm:text-lg" style="opacity: 0.88;">{{ originContent.paragraphOne }}</p>
                    <p class="mt-4 text-base leading-relaxed sm:text-lg" style="opacity: 0.88;">{{ originContent.paragraphTwo }}</p>
                </div>
            </div>
        </section>

        <section data-reveal class="w-full py-16 sm:py-20 lg:py-24">
            <div class="mx-auto w-11/12 sm:w-10/12">
                <div class="mx-auto max-w-4xl text-center">
                    <p v-if="reasonContent.eyebrow" class="text-xs tracking-[0.2em] text-(--color-mutedbrown) uppercase">{{ reasonContent.eyebrow }}</p>
                    <h3 v-if="reasonContent.heading" class="mt-3 font-display text-4xl leading-tight text-(--color-brown) sm:text-5xl">
                        {{ reasonContent.heading }}
                    </h3>
                    <p v-if="reasonContent.description" class="mx-auto mt-5 max-w-3xl text-base text-(--color-brown) sm:text-lg" style="opacity: 0.88;">
                        {{ reasonContent.description }}
                    </p>
                </div>
            </div>
        </section>

        <SocialSection :content="cmsSocialContent" />
    </main>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue';
import PageTitleSection from '../components/PageTitleSection.vue';
import SocialSection from '../components/SocialSection.vue';
import { useRevealAnimations } from '../composables/useRevealAnimations';
import { fetchAboutUsContentFromSanity, fetchSocialContentFromSanity } from '../utils/sanity';

const cmsAboutContent = ref({});
const cmsSocialContent = ref({});
const aboutRoot = ref(null);
const { setupRevealAnimations } = useRevealAnimations(aboutRoot);

const heroContent = computed(() => ({
    eyebrow: cmsAboutContent.value?.hero?.eyebrow ?? '',
    title: cmsAboutContent.value?.hero?.title ?? '',
    description: cmsAboutContent.value?.hero?.description ?? '',
    backgroundImage: cmsAboutContent.value?.hero?.backgroundImage ?? ''
}));
const approachContent = computed(() => ({
    eyebrow: cmsAboutContent.value?.approach?.eyebrow ?? '',
    title: cmsAboutContent.value?.approach?.title ?? '',
    paragraphOne: cmsAboutContent.value?.approach?.paragraphOne ?? '',
    paragraphTwo: cmsAboutContent.value?.approach?.paragraphTwo ?? '',
    image: cmsAboutContent.value?.approach?.image ?? ''
}));
const originContent = computed(() => ({
    eyebrow: cmsAboutContent.value?.origin?.eyebrow ?? '',
    title: cmsAboutContent.value?.origin?.title ?? '',
    paragraphOne: cmsAboutContent.value?.origin?.paragraphOne ?? '',
    paragraphTwo: cmsAboutContent.value?.origin?.paragraphTwo ?? '',
    image: cmsAboutContent.value?.origin?.image ?? ''
}));
const reasonContent = computed(() => ({
    eyebrow: cmsAboutContent.value?.reasonToExist?.eyebrow ?? '',
    heading: cmsAboutContent.value?.reasonToExist?.heading ?? '',
    description: cmsAboutContent.value?.reasonToExist?.description ?? ''
}));

onMounted(async () => {
    const [sanityAbout, sanitySocial] = await Promise.all([
        fetchAboutUsContentFromSanity(),
        fetchSocialContentFromSanity()
    ]);
    cmsAboutContent.value = sanityAbout ?? {};
    cmsSocialContent.value = sanitySocial ?? {};
    await nextTick();
    setupRevealAnimations();
});
</script>

