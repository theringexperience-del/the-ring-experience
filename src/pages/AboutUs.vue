<template>
    <main id="aboutUs" ref="aboutRoot" class="w-full">
        <PageTitleSection :content="heroContent" />

        <section data-reveal class="w-full pb-16 sm:pb-20">
            <div class="mx-auto w-11/12 sm:w-10/12">
                <figure class="overflow-hidden border bg-white/75 p-2 sm:p-3"
                    style="border-color: color-mix(in srgb, var(--color-darkbrown) 18%, transparent);">
                    <img :src="heroContent.backgroundImage" alt="The Ring Experience story"
                        class="h-[28rem] w-full object-cover object-center sm:h-[36rem]">
                </figure>
            </div>
        </section>

        <section data-reveal class="w-full py-16 sm:py-20 lg:py-24">
            <div class="mx-auto grid w-11/12 grid-cols-1 items-center gap-8 sm:w-10/12 lg:grid-cols-12 lg:gap-14">
                <figure class="lg:col-span-7">
                    <img :src="approachContent.image || heroContent.backgroundImage" alt="Our vision"
                        class="h-[24rem] w-full rounded-xs object-cover object-center sm:h-[30rem]">
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
                        class="h-[24rem] w-full rounded-xs object-cover object-center sm:h-[30rem]">
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
                    <p class="text-xs tracking-[0.2em] text-(--color-mutedbrown) uppercase">Reason to exist</p>
                    <h3 class="mt-3 font-display text-4xl leading-tight text-(--color-brown) sm:text-5xl">
                        We exist to turn travel moments into personal symbols.
                    </h3>
                    <p class="mx-auto mt-5 max-w-3xl text-base text-(--color-brown) sm:text-lg" style="opacity: 0.88;">
                        Every session is designed so people do not just buy a souvenir. They create a memory with their own hands, guided by real craftsmanship.
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
import heroFallbackImage from '../assets/herocover.jpeg';
import { useRevealAnimations } from '../composables/useRevealAnimations';
import localAboutContent from '../../content/about.json';
import localSocialContent from '../../content/social.json';
import { fetchAboutUsContentFromSanity, fetchSocialContentFromSanity } from '../utils/sanity';

const heroFallback = {
    eyebrow: 'About Us',
    title: 'How The Ring Experience was born',
    description: 'A story of craft, travel, and meaningful memories.',
    backgroundImage: heroFallbackImage
};

const approachFallback = {
    eyebrow: 'Our vision',
    title: 'A quiet alternative to mass tourism',
    paragraphOne: 'We designed a format where visitors create something meaningful, guided by real artisanship.',
    paragraphTwo: 'The focus is not selling products, but shaping a memory that lasts.',
    image: heroFallbackImage
};

const originFallback = {
    eyebrow: 'How it started',
    title: 'From idea to shared ritual',
    paragraphOne: 'The project started with one simple question: can a traveler leave with something that truly belongs to their story?',
    paragraphTwo: 'The answer became this experience: a small table, real tools, and a moment people remember.',
    image: heroFallbackImage
};

const cmsAboutContent = ref(localAboutContent);
const cmsSocialContent = ref(localSocialContent);
const aboutRoot = ref(null);
const { setupRevealAnimations } = useRevealAnimations(aboutRoot);

const heroContent = computed(() => ({ ...heroFallback, ...(cmsAboutContent.value?.hero ?? {}) }));
const approachContent = computed(() => ({ ...approachFallback, ...(cmsAboutContent.value?.approach ?? {}) }));
const originContent = computed(() => ({ ...originFallback, ...(cmsAboutContent.value?.origin ?? {}) }));

onMounted(async () => {
    const [sanityAbout, sanitySocial] = await Promise.all([
        fetchAboutUsContentFromSanity(),
        fetchSocialContentFromSanity()
    ]);
    if (sanityAbout) cmsAboutContent.value = sanityAbout;
    if (sanitySocial) cmsSocialContent.value = sanitySocial;
    await nextTick();
    setupRevealAnimations();
});
</script>
