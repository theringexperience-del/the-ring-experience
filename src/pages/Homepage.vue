<template>
    <div ref="homepageRoot" class="relative isolate w-full overflow-hidden">
        <section id="hero"
            class="home-hero relative flex w-full items-center overflow-hidden bg-[#201A15]">
            <video v-if="heroMediaType === 'video' && heroContent.video" :src="heroContent.video" autoplay muted loop
                playsinline preload="metadata" class="absolute inset-0 h-full w-full object-cover object-center opacity-80"></video>
            <img v-else :src="heroImage.src" :srcset="heroImage.srcSet || undefined"
                sizes="100vw" alt="The Ring Experience jewellery workshop in Negombo" width="1920" height="1080" fetchpriority="high" decoding="async"
                class="absolute inset-0 h-full w-full object-cover object-center opacity-80">
            <div class="absolute inset-0 hero-shade">
            </div>
            <div class="relative z-10 mx-auto w-11/12 sm:w-10/12">
                <div class="hero-copy flex max-w-3xl flex-col items-start text-left text-white">
                    <p class="mb-6 text-[.65rem] tracking-[.22em] uppercase text-[#E6D4B4] sm:text-xs">Negombo, Sri Lanka · Private jewellery workshops</p>
                    <h1 class="hero-heading font-display font-medium text-(--color-lightbeige)">
                        {{ heroContent.headline }}
                    </h1>
                    <p class="mt-6 max-w-lg text-base leading-relaxed text-[#F1E8DC] sm:text-lg">
                        {{ heroContent.subheadline }}
                    </p>

                    <div class="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                        <router-link :to="heroContent.buttonLink">
                            <Button as="span" class="w-full min-w-[11rem]">{{ heroContent.buttonLabel }}</Button>
                        </router-link>
                        <router-link :to="heroContent.secondaryButtonLink">
                            <Button as="span" class="hero-secondary w-full min-w-[11rem]" variant="navLight">{{ heroContent.secondaryButtonLabel }}</Button>
                        </router-link>
                    </div>
                    <p class="mt-7 text-xs tracking-wide text-[#E6D4B4]">For first-timers, couples and curious travellers.</p>
                </div>
            </div>
            <a href="#theExperience" class="hero-scroll absolute bottom-7 right-[8.333%] text-xs tracking-[.15em] uppercase text-[#F1E8DC]">Discover the experience <span aria-hidden="true">↓</span></a>
        </section>
        <div class="experience-strip border-b border-[#D8CDBB] bg-[#EFE7DA]">
            <div class="mx-auto grid w-11/12 grid-cols-1 gap-3 py-5 text-center text-xs tracking-[.1em] uppercase text-[#4B3827] sm:w-10/12 sm:grid-cols-3">
                <p>Local artisan guidance</p><p>A design that feels like you</p><p>A memory to take home</p>
            </div>
        </div>

        <section id="aMoment" data-reveal class="authentic-vintage w-full py-20 sm:py-24 md:py-28 lg:py-36">
            <div class="mx-auto grid w-11/12 grid-cols-1 items-center gap-10 sm:w-10/12 sm:gap-12 lg:grid-cols-12 lg:gap-16">
                <figure class="flex items-center justify-center lg:col-span-6">
                    <img :src="aMomentImage.src" :srcset="aMomentImage.srcSet || undefined"
                        sizes="(min-width: 1024px) 42vw, 92vw" alt="A closer look at the ring-making experience" width="1200" height="1600"
                        loading="lazy" decoding="async"
                        class="moment-photo w-full object-cover object-center">
                </figure>
                <div class="flex flex-col justify-center lg:col-span-6 lg:pl-4 xl:pl-8">
                    <p class="mb-4 text-xs tracking-[0.18em] text-(--color-mutedbrown) uppercase sm:text-sm sm:tracking-[0.2em]">
                        {{ aMomentContent.eyebrow }}
                    </p>
                    <h2 class="max-w-[16ch] font-display text-3xl leading-[1.04] font-medium text-(--color-brown) sm:text-4xl md:text-5xl lg:text-6xl">
                        {{ aMomentContent.title }}
                    </h2>
                    <div class="mt-6 h-px w-20 bg-(--color-noisette) sm:mt-8 sm:w-24"></div>
                    <div class="mt-6 max-w-xl space-y-4 sm:mt-7">
                        <p class="text-base leading-relaxed text-(--color-brown) sm:text-lg" style="opacity: 0.85;">
                            {{ aMomentContent.paragraphOne }}
                        </p>
                        <p class="text-base leading-relaxed text-(--color-brown) sm:text-lg">
                            {{ aMomentContent.paragraphTwo }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section id="theExperience" data-reveal class="w-full pb-20 sm:pb-24 lg:pb-36">
            <div class="mx-auto w-11/12 sm:w-10/12">
                <div class="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
                    <p class="text-xs tracking-[0.2em] text-(--color-mutedbrown) uppercase">{{ theExperienceContent.eyebrow }}</p>
                    <h2 class="mt-3 font-display text-4xl leading-tight text-(--color-brown) sm:text-5xl">
                        {{ theExperienceContent.title }}
                    </h2>
                </div>
                <div ref="experienceGrid" class="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-9">
                    <Card v-for="card in experienceCards" :key="card.key"
                        class="experience-card mx-auto w-full max-w-md md:max-w-none" :title="card.title" :line-one="card.lineOne"
                        :line-two="card.lineTwo" :image="card.image" />
                </div>
            </div>
        </section>

        <section v-if="packagesPreviewContent.enabled !== false" id="packages" data-reveal class="workshops-section w-full bg-[#252A24] py-20 text-(--color-lightbeige) sm:py-24 lg:py-28">
            <div class="mx-auto w-11/12 sm:w-10/12">
                <div class="mx-auto max-w-3xl text-center">
                    <p class="text-xs tracking-[0.2em] uppercase" style="opacity: 0.75;">{{ packagesPreviewContent.eyebrow }}</p>
                    <h2 class="mt-3 font-display text-4xl leading-tight sm:text-5xl">{{ packagesPreviewContent.heading }}</h2>
                    <p class="mx-auto mt-4 max-w-2xl text-base sm:text-lg" style="opacity: 0.86;">
                        {{ packagesPreviewContent.description }}
                    </p>
                </div>

                <div class="mx-auto mt-8 h-px w-24 bg-(--color-noisette)"></div>

                <div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    <article v-for="(pkg, index) in homepagePackages" :key="pkg.key || pkg.name" class="workshop-card relative flex flex-col border p-7 sm:p-8"
                        style="border-color: color-mix(in srgb, var(--color-lightbeige) 28%, transparent);">
                        <span class="mb-7 text-xs tracking-[.18em] text-[#CDB88E]">0{{ index + 1 }}</span>
                        <p class="text-xs tracking-[0.16em] uppercase text-[#D6BD8C]">{{ pkg.tag }}</p>
                        <h3 class="mt-3 font-display text-3xl leading-tight sm:text-4xl">{{ pkg.name }}</h3>
                        <p class="mt-2 text-sm tracking-[0.08em] uppercase" style="opacity: 0.76;">{{ pkg.duration }}</p>
                        <p class="mt-5 grow text-base leading-relaxed" style="opacity: 0.88;">{{ pkg.summary || pkg.fullDescription }}</p>
                        <router-link to="/ouroffers" class="mt-8 border-t border-white/20 pt-5 text-sm text-[#E1CCA4]">Explore {{ pkg.name }} <span aria-hidden="true">↗</span></router-link>
                    </article>
                </div>

                <div class="mt-10 text-center">
                    <router-link :to="packagesPreviewContent.ctaLink">
                        <Button as="span" variant="navLight">{{ packagesPreviewContent.ctaLabel }}</Button>
                    </router-link>
                </div>
            </div>
        </section>

        <section id="values" data-reveal class="relative w-full overflow-hidden bg-black py-16 sm:py-20 lg:py-24">
            <div class="pointer-events-none absolute inset-0">
                <div class="parallax-bg absolute inset-0 bg-cover bg-center" :style="valuesBgStyle"></div>
                <div class="absolute inset-0 bg-(--color-darkerbrown) opacity-55"></div>
                <div class="absolute inset-0"
                    style="background: linear-gradient(to right, color-mix(in srgb, var(--color-darkbrown) 82%, transparent), color-mix(in srgb, var(--color-darkbrown) 42%, transparent), color-mix(in srgb, var(--color-darkbrown) 68%, transparent));">
                </div>
            </div>
            <div class="relative mx-auto grid w-11/12 grid-cols-1 border text-(--color-lightbeige) md:w-10/12 md:grid-cols-3 md:grid-rows-2"
                style="border-color: color-mix(in srgb, var(--color-lightbeige) 35%, transparent);">
                <div class="border-b p-7 sm:p-8 md:row-span-2 md:border-r md:border-b-0 md:p-10 lg:p-12"
                    style="border-color: color-mix(in srgb, var(--color-lightbeige) 35%, transparent);">
                    <h2 class="font-display text-4xl leading-tight md:text-5xl">{{ valuesContent.heading }}</h2>
                </div>
                <article v-for="(item, index) in valuesItems" :key="item.title" class="border-b p-7 sm:p-8 md:border-b-0 md:p-10 lg:p-12"
                    style="border-color: color-mix(in srgb, var(--color-lightbeige) 35%, transparent);" :class="{
                        'md:border-r': index === 0 || index === 2,
                        'md:border-b': index === 0 || index === 1,
                        'border-b-0': index === valuesItems.length - 1
                    }">
                    <p class="text-xs tracking-[0.2em] text-(--color-lightbeige) uppercase" style="opacity: 0.75;">
                        {{ item.title }}
                    </p>
                    <p class="mt-4 max-w-sm text-base leading-relaxed text-(--color-lightbeige)" style="opacity: 0.88;">
                        {{ item.text }}
                    </p>
                </article>
            </div>
        </section>

        <PreferredResourcesSection :reviews-url="GOOGLE_MAPS_URL" />
        <FaqPreviewSection :content="faqHomepagePreviewContent" :items="homepageFaqItems" />

        <section v-if="reviewsContent.enabled !== false" id="reviews" data-reveal
            class="w-full py-20 sm:py-24 lg:py-28">
            <div class="mx-auto w-11/12 sm:w-10/12">
                <div class="mx-auto max-w-3xl text-center">
                    <p class="text-xs tracking-[0.2em] text-(--color-mutedbrown) uppercase">{{ reviewsContent.eyebrow }}
                    </p>
                    <h2 class="mt-3 font-display text-4xl leading-tight text-(--color-brown) sm:text-5xl">{{
                        reviewsContent.heading }}</h2>
                    <p v-if="reviewsContent.description"
                        class="mx-auto mt-4 max-w-2xl text-base text-(--color-brown) sm:text-lg" style="opacity: 0.85;">
                        {{ reviewsContent.description }}
                    </p>
                    <a v-if="reviewsContent.sourceUrl && reviewsContent.sourceUrl !== GOOGLE_MAPS_URL" :href="reviewsContent.sourceUrl" target="_blank"
                        rel="noopener noreferrer"
                        class="mt-4 inline-block text-sm tracking-[0.12em] text-(--color-noisette) uppercase">
                        {{ reviewsContent.sourceLabel }}
                    </a>
                    <a :href="GOOGLE_MAPS_URL" target="_blank" rel="noopener noreferrer"
                        class="mt-4 inline-block text-sm tracking-[0.12em] text-(--color-noisette) underline underline-offset-4 uppercase">
                        Google reviews &amp; directions ↗
                    </a>
                </div>
                <div class="mx-auto mt-7 h-px w-24 bg-(--color-noisette)"></div>

                <div v-if="reviewsItems.length" class="mt-8">
                    <div v-if="useReviewSlider" class="mb-5 flex items-center justify-between">
                        <p class="text-sm text-(--color-mutedbrown)">Showing 3 of {{ reviewsItems.length }} reviews</p>
                        <div class="flex gap-2">
                            <button type="button" class="h-11 w-11 rounded-full border text-(--color-brown)" aria-label="Previous reviews"
                                style="border-color: color-mix(in srgb, var(--color-darkbrown) 26%, transparent);"
                                @click="prevReviewSlide">&#8592;</button>
                            <button type="button" class="h-11 w-11 rounded-full border text-(--color-brown)" aria-label="Next reviews"
                                style="border-color: color-mix(in srgb, var(--color-darkbrown) 26%, transparent);"
                                @click="nextReviewSlide">&#8594;</button>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                        <article v-for="review in visibleReviews" :key="`${review.author}-${review.text}`"
                            class="border bg-white/72 p-6 sm:p-7"
                            style="border-color: color-mix(in srgb, var(--color-darkbrown) 18%, transparent);">
                            <div class="flex items-center justify-between gap-2">
                                <p class="font-medium text-(--color-brown)">{{ review.author }}</p>
                                <span v-if="review.dateLabel"
                                    class="text-xs tracking-[0.08em] text-(--color-mutedbrown) uppercase">{{
                                    review.dateLabel }}</span>
                            </div>
                            <p class="mt-3 text-(--color-noisette)">
                                <span v-for="star in 5" :key="star" class="text-sm"
                                    :style="{ opacity: star <= review.rating ? 1 : 0.35 }">&#9733;</span>
                            </p>
                            <p class="mt-4 text-base leading-relaxed text-(--color-brown)" style="opacity: 0.9;">{{
                                review.text }}</p>
                        </article>
                    </div>
                </div>
            </div>
        </section>

        <PageCtaSection :content="closingInvitation" />
        <SocialSection :content="cmsSocialContent" />
    </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import Button from '../components/Button.vue';
import Card from '../components/Card.vue';
import PageCtaSection from '../components/PageCtaSection.vue';
import PreferredResourcesSection from '../components/PreferredResourcesSection.vue';
import { GOOGLE_MAPS_URL } from '../utils/businessProfile.js';
import FaqPreviewSection from '../components/FaqPreviewSection.vue';
import SocialSection from '../components/SocialSection.vue';
import defaultHeroImage from '../assets/herocover.jpeg';
import {
    fetchGooglePlaceReviews,
    fetchPageCtaContentFromSanity,
    fetchFaqPageContentFromSanity,
    fetchHomepageContentFromSanity,
    fetchOffersPageContentFromSanity,
    fetchSocialContentFromSanity,
    optimizeImageSource,
    toImageSrcSet
} from '../utils/sanity';

const cmsHomepageContent = ref({});
const cmsPageCtaContent = ref({});
const closingInvitation = computed(() => ({
    eyebrow: 'Your time at the workbench',
    heading: 'What will you make yours?',
    description: 'Send us your preferred date and ring ideas. We’ll help you choose a suitable workshop and confirm availability.',
    buttonLabel: 'Plan Your Visit',
    buttonLink: '/bookexperience',
    ...cmsPageCtaContent.value?.home,
}));
const cmsOffersContent = ref({});
const cmsSocialContent = ref({});
const cmsFaqContent = ref({});
const googleReviews = ref([]);
const reviewSlideIndex = ref(0);

const heroContent = computed(() => ({
    headline: cmsHomepageContent.value?.hero?.headline ?? 'Make a ring. Keep the memory.',
    subheadline: cmsHomepageContent.value?.hero?.subheadline ?? 'A private ring-making workshop in Negombo, Sri Lanka. Create something personal with a local artisan—no experience needed.',
    mediaType: cmsHomepageContent.value?.hero?.mediaType ?? 'image',
    image: cmsHomepageContent.value?.hero?.image ?? defaultHeroImage,
    video: cmsHomepageContent.value?.hero?.video ?? '',
    buttonLabel: cmsHomepageContent.value?.hero?.buttonLabel ?? 'Check Availability',
    buttonLink: cmsHomepageContent.value?.hero?.buttonLink ?? '/bookexperience',
    secondaryButtonLabel: cmsHomepageContent.value?.hero?.secondaryButtonLabel ?? 'Explore Workshops',
    secondaryButtonLink: cmsHomepageContent.value?.hero?.secondaryButtonLink ?? '/ouroffers'
}));
const heroMediaType = computed(() => (heroContent.value.mediaType === 'video' ? 'video' : 'image'));
const aMomentContent = computed(() => ({
    eyebrow: cmsHomepageContent.value?.aMoment?.eyebrow ?? '',
    title: cmsHomepageContent.value?.aMoment?.title ?? '',
    paragraphOne: cmsHomepageContent.value?.aMoment?.paragraphOne ?? '',
    paragraphTwo: cmsHomepageContent.value?.aMoment?.paragraphTwo ?? '',
    image: cmsHomepageContent.value?.aMoment?.image ?? defaultHeroImage
}));
const theExperienceContent = computed(() => ({
    eyebrow: cmsHomepageContent.value?.theExperience?.eyebrow ?? '',
    title: cmsHomepageContent.value?.theExperience?.title ?? ''
}));
const experienceCards = computed(() => (
    Array.isArray(cmsHomepageContent.value?.experienceCards) && cmsHomepageContent.value.experienceCards.length
        ? cmsHomepageContent.value.experienceCards
        : []
));
const packagesPreviewContent = computed(() => ({
    enabled: cmsHomepageContent.value?.packagesPreview?.enabled ?? true,
    eyebrow: cmsHomepageContent.value?.packagesPreview?.eyebrow ?? '',
    heading: cmsHomepageContent.value?.packagesPreview?.heading ?? '',
    description: cmsHomepageContent.value?.packagesPreview?.description ?? '',
    ctaLabel: cmsHomepageContent.value?.packagesPreview?.ctaLabel ?? 'Discover all offers',
    ctaLink: cmsHomepageContent.value?.packagesPreview?.ctaLink ?? '/ouroffers'
}));
const homepagePackages = computed(() => (
    (Array.isArray(cmsOffersContent.value?.packages) ? cmsOffersContent.value.packages : []).filter((pkg) => pkg?.isVisible !== false)
));
const valuesContent = computed(() => ({
    heading: cmsHomepageContent.value?.values?.heading ?? '',
    backgroundImage: cmsHomepageContent.value?.values?.backgroundImage ?? defaultHeroImage,
    items: Array.isArray(cmsHomepageContent.value?.values?.items) ? cmsHomepageContent.value.values.items : []
}));
const valuesItems = computed(() => (Array.isArray(valuesContent.value.items) ? valuesContent.value.items : []));
const valuesBgStyle = computed(() => ({ backgroundImage: `url(${optimizeImageSource(valuesContent.value.backgroundImage, { width: 1600, quality: 74 })})` }));
const faqHomepagePreviewContent = computed(() => ({
    enabled: cmsFaqContent.value?.homepageSection?.enabled ?? true,
    eyebrow: cmsFaqContent.value?.homepageSection?.eyebrow?.trim().toLowerCase() === 'preferred resources'
        ? 'Most asked' : (cmsFaqContent.value?.homepageSection?.eyebrow ?? 'Most asked'),
    heading: cmsFaqContent.value?.homepageSection?.heading ?? 'Quick answers before you book',
    description: cmsFaqContent.value?.hero?.description ?? 'Find quick answers to the questions guests ask most often before booking their ring-making experience.',
    ctaLabel: cmsFaqContent.value?.homepageSection?.ctaLabel ?? 'See all FAQs',
    ctaLink: cmsFaqContent.value?.homepageSection?.ctaLink ?? '/faq'
}));
const homepageFaqItems = computed(() => {
    const items = Array.isArray(cmsFaqContent.value?.items) ? cmsFaqContent.value.items : [];
    return items
        .filter((item) => item?.showOnHomepage && item?.question && item?.answer)
        .sort((a, b) => (a.homepageOrder ?? 999) - (b.homepageOrder ?? 999));
});
const heroImage = computed(() => ({
    src: optimizeImageSource(heroContent.value.image, { width: 1800, quality: 76 }),
    srcSet: toImageSrcSet(heroContent.value.image, [640, 960, 1280, 1800], { quality: 76 })
}));
const aMomentImage = computed(() => ({
    src: optimizeImageSource(aMomentContent.value.image, { width: 1200, quality: 76 }),
    srcSet: toImageSrcSet(aMomentContent.value.image, [480, 768, 1024, 1200], { quality: 76 })
}));
const reviewsContent = computed(() => ({
    enabled: cmsHomepageContent.value?.reviews?.enabled ?? true,
    eyebrow: cmsHomepageContent.value?.reviews?.eyebrow ?? '',
    heading: cmsHomepageContent.value?.reviews?.heading ?? '',
    description: cmsHomepageContent.value?.reviews?.description ?? '',
    sourceLabel: cmsHomepageContent.value?.reviews?.sourceLabel ?? '',
    sourceUrl: cmsHomepageContent.value?.reviews?.sourceUrl ?? '',
    sourceType: cmsHomepageContent.value?.reviews?.sourceType ?? 'manual',
    maxItems: cmsHomepageContent.value?.reviews?.maxItems,
    items: Array.isArray(cmsHomepageContent.value?.reviews?.items) ? cmsHomepageContent.value.reviews.items : []
}));
const reviewsItems = computed(() => {
    const manualItems = Array.isArray(reviewsContent.value.items) ? reviewsContent.value.items : [];
    if (reviewsContent.value.sourceType === 'google' && googleReviews.value.length) return googleReviews.value;
    return manualItems.filter((review) => review?.text);
});
const useReviewSlider = computed(() => reviewsItems.value.length > 3);
const visibleReviews = computed(() => {
    if (!useReviewSlider.value) return reviewsItems.value;
    return Array.from({ length: 3 }, (_, i) => reviewsItems.value[(reviewSlideIndex.value + i) % reviewsItems.value.length]);
});

const homepageRoot = ref(null);
const experienceGrid = ref(null);
let animationContext = null;
let mediaMatcher = null;
let reviewSliderInterval = null;
let reviewsRequestId = 0;
let animationFrameId = null;
let idleCallbackId = null;
let isDisposed = false;
let gsapLoader = null;

const loadGsap = async () => {
    if (!gsapLoader) {
        gsapLoader = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([gsapModule, scrollTriggerModule]) => {
            const { gsap } = gsapModule;
            gsap.registerPlugin(scrollTriggerModule.ScrollTrigger);
            return gsap;
        });
    }

    return gsapLoader;
};

const nextReviewSlide = () => {
    if (!reviewsItems.value.length) return;
    reviewSlideIndex.value = (reviewSlideIndex.value + 1) % reviewsItems.value.length;
};
const prevReviewSlide = () => {
    if (!reviewsItems.value.length) return;
    reviewSlideIndex.value = (reviewSlideIndex.value - 1 + reviewsItems.value.length) % reviewsItems.value.length;
};

const clearReviewInterval = () => {
    if (reviewSliderInterval) {
        window.clearInterval(reviewSliderInterval);
        reviewSliderInterval = null;
    }
};

watch(
    () => [reviewsContent.value.sourceType, reviewsContent.value.maxItems],
    async () => {
        const requestId = ++reviewsRequestId;
        if (reviewsContent.value.sourceType !== 'google') {
            googleReviews.value = [];
            return;
        }
        const imported = await fetchGooglePlaceReviews(reviewsContent.value);
        if (requestId === reviewsRequestId) {
            googleReviews.value = Array.isArray(imported) ? imported : [];
        }
    },
    { immediate: true }
);

watch(
    () => [useReviewSlider.value, reviewsItems.value.length],
    () => {
        reviewSlideIndex.value = 0;
        clearReviewInterval();
        if (useReviewSlider.value) {
            reviewSliderInterval = window.setInterval(nextReviewSlide, 5000);
        }
    },
    { immediate: true }
);

const setupHomepageAnimations = async () => {
    if (!homepageRoot.value) return;
    const gsap = await loadGsap();
    if (isDisposed || !homepageRoot.value) return;

    animationContext = gsap.context(() => {
        mediaMatcher = gsap.matchMedia();
        mediaMatcher.add('(prefers-reduced-motion: reduce)', () => {
            gsap.set('[data-reveal], .experience-card, .hero-copy > *', { clearProps: 'all' });
        });
        mediaMatcher.add('(prefers-reduced-motion: no-preference)', () => {
            gsap.from('.hero-copy > *', { autoAlpha: 0, y: 24, duration: 0.85, ease: 'power2.out', stagger: 0.1 });
            gsap.utils.toArray('[data-reveal]').forEach((section) => {
                gsap.from(section, {
                    y: 18,
                    duration: 0.7,
                    ease: 'power2.out',
                    overwrite: 'auto',
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 90%',
                        toggleActions: 'play none none none',
                        once: true
                    }
                });
            });
            if (experienceGrid.value) {
                gsap.from(experienceGrid.value.querySelectorAll('.experience-card'), {
                    y: 14,
                    duration: 0.58,
                    ease: 'power2.out',
                    stagger: 0.06,
                    overwrite: 'auto',
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: experienceGrid.value,
                        start: 'top 90%',
                        toggleActions: 'play none none none',
                        once: true
                    }
                });
            }
        });
    }, homepageRoot.value);
};

const scheduleHomepageAnimations = () => {
    if (window.innerWidth < 768) return;

    const runAnimations = () => {
        animationFrameId = window.requestAnimationFrame(() => {
            setupHomepageAnimations();
        });
    };

    if ('requestIdleCallback' in window) {
        idleCallbackId = window.requestIdleCallback(runAnimations, { timeout: 400 });
        return;
    }

    idleCallbackId = window.setTimeout(runAnimations, 1);
};

onMounted(async () => {
    const [sanityHomepage, sanityOffers, sanitySocial, sanityFaq, sanityPageCta] = await Promise.all([
        fetchHomepageContentFromSanity(),
        fetchOffersPageContentFromSanity(),
        fetchSocialContentFromSanity(),
        fetchFaqPageContentFromSanity(),
        fetchPageCtaContentFromSanity()
    ]);
    cmsHomepageContent.value = sanityHomepage ?? {};
    cmsOffersContent.value = sanityOffers ?? {};
    cmsSocialContent.value = sanitySocial ?? {};
    cmsFaqContent.value = sanityFaq ?? {};
    cmsPageCtaContent.value = sanityPageCta ?? {};
    await nextTick();
    scheduleHomepageAnimations();
});

onBeforeUnmount(() => {
    isDisposed = true;
    clearReviewInterval();
    mediaMatcher?.revert();
    animationContext?.revert();
    if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    if (idleCallbackId && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleCallbackId);
    } else if (idleCallbackId) {
        window.clearTimeout(idleCallbackId);
    }
});
</script>

<style scoped>
.home-hero { min-height: min(860px, 100svh); padding-block: 10rem 8rem; }
.hero-shade { background: linear-gradient(90deg, rgba(24,21,17,.88), rgba(24,21,17,.52) 58%, rgba(24,21,17,.18)); }
.hero-heading { max-width: 12ch; font-size: clamp(3.5rem, 6.4vw, 6.5rem); line-height: 1.02; letter-spacing: -.035em; }
.hero-secondary { backdrop-filter: blur(8px); }
.moment-photo { aspect-ratio: 4 / 5; max-height: 40rem; border-radius: 42% 42% 3px 3px; }
.workshop-card { background: rgba(255,255,255,.035); transition: background .2s, transform .2s; }
.workshop-card:hover { background: rgba(255,255,255,.07); transform: translateY(-4px); }
@media (max-width: 639px) {
    .home-hero { min-height: 720px; min-height: max(680px, 92svh); padding-block: 9rem 7rem; }
    .hero-heading { font-size: clamp(3.15rem, 13.5vw, 4.75rem); }
    .hero-shade { background: linear-gradient(90deg, rgba(24,21,17,.85), rgba(24,21,17,.52)); }
    .experience-strip p + p { display: none; }
    .moment-photo { max-height: 30rem; }
}
@media (prefers-reduced-motion: reduce) { .workshop-card:hover { transform: none; } }
</style>
