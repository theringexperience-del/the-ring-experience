<template>
    <main ref="homepageRoot" class="relative isolate w-full overflow-hidden">
        <section id="hero"
            class="relative flex min-h-svh w-full items-end overflow-hidden bg-black pb-40 pt-28 sm:pt-32 lg:h-screen lg:min-h-0">
            <video v-if="heroMediaType === 'video' && heroContent.video" :src="heroContent.video" autoplay muted loop
                playsinline preload="metadata" class="absolute inset-0 h-full w-full object-cover object-center opacity-72"></video>
            <img v-else :src="heroImage.src" :srcset="heroImage.srcSet || undefined"
                sizes="100vw" alt="Hero Cover Image" width="1920" height="1080" fetchpriority="high" decoding="async"
                class="absolute inset-0 h-full w-full object-cover object-center opacity-72">
            <div class="hero-orb hero-orb-left"></div>
            <div class="hero-orb hero-orb-right"></div>
            <div class="absolute inset-0"
                style="background: linear-gradient(to top, color-mix(in srgb, var(--color-darkbrown) 84%, transparent), color-mix(in srgb, var(--color-darkbrown) 45%, transparent), transparent);">
            </div>
            <div class="relative z-10 mx-auto w-11/12 sm:w-10/12">
                <div class="hero-copy flex max-w-5xl flex-col items-center text-center text-white lg:items-start lg:text-left">
                    <h1 class="max-w-5xl font-display text-4xl leading-[0.98] font-medium text-(--color-lightbeige) sm:text-5xl md:text-6xl lg:text-7xl">
                        {{ heroContent.headline }}
                    </h1>
                    <p class="mt-4 max-w-xl text-sm font-light text-gray-200 sm:text-base lg:text-xl">
                        {{ heroContent.subheadline }}
                    </p>
                    <div class="mt-6 h-px w-20 bg-(--color-noisette) sm:w-24"></div>
                    <div class="mt-7 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:items-start">
                        <router-link :to="heroContent.buttonLink">
                            <Button class="w-auto min-w-[11rem]">{{ heroContent.buttonLabel }}</Button>
                        </router-link>
                        <router-link :to="heroContent.secondaryButtonLink">
                            <Button class="w-auto min-w-[11rem]" variant="outline">{{ heroContent.secondaryButtonLabel }}</Button>
                        </router-link>
                    </div>
                </div>
            </div>
        </section>

        <section v-if="reviewsContent.enabled !== false" id="reviews" ref="reviewsSection" data-reveal
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
                    <a v-if="reviewsContent.sourceUrl" :href="reviewsContent.sourceUrl" target="_blank"
                        rel="noopener noreferrer"
                        class="mt-4 inline-block text-sm tracking-[0.12em] text-(--color-noisette) uppercase">
                        {{ reviewsContent.sourceLabel }}
                    </a>
                </div>
                <div class="mx-auto mt-7 h-px w-24 bg-(--color-noisette)"></div>

                <div v-if="reviewsContent.embedUrl" class="mt-10 overflow-hidden border bg-white/70 p-3"
                    style="border-color: color-mix(in srgb, var(--color-darkbrown) 20%, transparent);">
                    <iframe :src="shouldLoadReviewsEmbed ? reviewsContent.embedUrl : undefined" loading="lazy" title="Reviews embed"
                        class="h-[520px] w-full border-0"></iframe>
                </div>
                <div v-else-if="reviewsItems.length" class="mt-8">
                    <div v-if="useReviewSlider" class="mb-5 flex items-center justify-between">
                        <p class="text-sm text-(--color-mutedbrown)">Showing 3 of {{ reviewsItems.length }} reviews</p>
                        <div class="flex gap-2">
                            <button type="button" class="h-9 w-9 rounded-full border text-(--color-brown)"
                                style="border-color: color-mix(in srgb, var(--color-darkbrown) 26%, transparent);"
                                @click="prevReviewSlide">&#8592;</button>
                            <button type="button" class="h-9 w-9 rounded-full border text-(--color-brown)"
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

        <section id="aMoment" data-reveal class="authentic-vintage w-full py-20 sm:py-24 md:py-28 lg:py-36">
            <div class="mx-auto grid w-11/12 grid-cols-1 items-center gap-10 sm:w-10/12 sm:gap-12 lg:grid-cols-12 lg:gap-16">
                <figure class="flex items-center justify-center lg:col-span-6">
                    <img :src="aMomentImage.src" :srcset="aMomentImage.srcSet || undefined"
                        sizes="(min-width: 1024px) 42vw, 92vw" alt="A Moment Image" width="1200" height="1600"
                        loading="lazy" decoding="async"
                        class="h-[25rem] w-full rounded-xs object-cover object-center sm:h-[32rem] lg:h-[42rem]">
                </figure>
                <div class="flex flex-col justify-center lg:col-span-6 lg:pl-4 xl:pl-8">
                    <p class="mb-4 text-xs tracking-[0.18em] text-(--color-mutedbrown) uppercase sm:text-sm sm:tracking-[0.2em]">
                        {{ aMomentContent.eyebrow }}
                    </p>
                    <h2 class="max-w-[10ch] font-display text-3xl leading-[1.04] font-medium text-(--color-brown) sm:text-4xl md:text-5xl lg:text-6xl">
                        {{ aMomentContent.title }}
                    </h2>
                    <div class="mt-6 h-px w-20 bg-(--color-noisette) sm:mt-8 sm:w-24"></div>
                    <div class="mt-6 max-w-xl space-y-4 sm:mt-7">
                        <p class="text-base leading-relaxed text-(--color-brown) sm:text-lg" style="opacity: 0.85;">
                            {{ aMomentContent.paragraphOne }}
                        </p>
                        <p class="text-base leading-relaxed text-(--color-brown) font-semibold italic sm:text-lg">
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

        <section v-if="packagesPreviewContent.enabled !== false" id="packages" data-reveal class="w-full bg-black py-20 text-(--color-lightbeige) sm:py-24 lg:py-28">
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
                    <article v-for="pkg in homepagePackages" :key="pkg.key || pkg.name" class="border p-7 sm:p-8"
                        style="border-color: color-mix(in srgb, var(--color-lightbeige) 28%, transparent);">
                        <p class="text-xs tracking-[0.16em] uppercase text-(--color-noisette)">{{ pkg.tag }}</p>
                        <h3 class="mt-3 font-display text-3xl leading-tight sm:text-4xl">{{ pkg.name }}</h3>
                        <p class="mt-2 text-sm tracking-[0.08em] uppercase" style="opacity: 0.76;">{{ pkg.duration }}</p>
                        <p class="mt-5 text-base leading-relaxed" style="opacity: 0.88;">{{ pkg.summary || pkg.fullDescription }}</p>
                    </article>
                </div>

                <div class="mt-10 text-center">
                    <router-link :to="packagesPreviewContent.ctaLink">
                        <Button variant="outline">{{ packagesPreviewContent.ctaLabel }}</Button>
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

        <FaqPreviewSection :content="faqHomepagePreviewContent" :items="homepageFaqItems" />

        <SocialSection :content="cmsSocialContent" />
    </main>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import Button from '../components/Button.vue';
import Card from '../components/Card.vue';
import FaqPreviewSection from '../components/FaqPreviewSection.vue';
import SocialSection from '../components/SocialSection.vue';
import defaultHeroImage from '../assets/herocover.jpeg';
import {
    fetchGooglePlaceReviews,
    fetchFaqPageContentFromSanity,
    fetchHomepageContentFromSanity,
    fetchOffersPageContentFromSanity,
    fetchSocialContentFromSanity,
    optimizeImageSource,
    toImageSrcSet
} from '../utils/sanity';

const cmsHomepageContent = ref({});
const cmsOffersContent = ref({});
const cmsSocialContent = ref({});
const cmsFaqContent = ref({});
const googleReviews = ref([]);
const reviewSlideIndex = ref(0);

const heroContent = computed(() => ({
    headline: cmsHomepageContent.value?.hero?.headline ?? '',
    subheadline: cmsHomepageContent.value?.hero?.subheadline ?? '',
    mediaType: cmsHomepageContent.value?.hero?.mediaType ?? 'image',
    image: cmsHomepageContent.value?.hero?.image ?? defaultHeroImage,
    video: cmsHomepageContent.value?.hero?.video ?? '',
    buttonLabel: cmsHomepageContent.value?.hero?.buttonLabel ?? 'Book your experience',
    buttonLink: cmsHomepageContent.value?.hero?.buttonLink ?? '/bookexperience',
    secondaryButtonLabel: cmsHomepageContent.value?.hero?.secondaryButtonLabel ?? 'Discover our offers',
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
    eyebrow: cmsFaqContent.value?.homepageSection?.eyebrow ?? 'Most asked',
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
    embedUrl: cmsHomepageContent.value?.reviews?.embedUrl ?? '',
    sourceType: cmsHomepageContent.value?.reviews?.sourceType ?? 'manual',
    googlePlaceId: cmsHomepageContent.value?.reviews?.googlePlaceId ?? '',
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
const reviewsSection = ref(null);
let animationContext = null;
let mediaMatcher = null;
let reviewSliderInterval = null;
let reviewsRequestId = 0;
let reviewsObserver = null;
let animationFrameId = null;
let idleCallbackId = null;
let isDisposed = false;
let gsapLoader = null;
const shouldLoadReviewsEmbed = ref(false);

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
    () => [reviewsContent.value.sourceType, reviewsContent.value.sourceUrl, reviewsContent.value.googlePlaceId, reviewsContent.value.maxItems],
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

const observeReviewsEmbed = () => {
    reviewsObserver?.disconnect();

    if (!reviewsSection.value || !reviewsContent.value.embedUrl || shouldLoadReviewsEmbed.value) return;

    reviewsObserver = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        shouldLoadReviewsEmbed.value = true;
        reviewsObserver?.disconnect();
        reviewsObserver = null;
    }, { rootMargin: '280px 0px' });

    reviewsObserver.observe(reviewsSection.value);
};

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
    const [sanityHomepage, sanityOffers, sanitySocial, sanityFaq] = await Promise.all([
        fetchHomepageContentFromSanity(),
        fetchOffersPageContentFromSanity(),
        fetchSocialContentFromSanity(),
        fetchFaqPageContentFromSanity()
    ]);
    cmsHomepageContent.value = sanityHomepage ?? {};
    cmsOffersContent.value = sanityOffers ?? {};
    cmsSocialContent.value = sanitySocial ?? {};
    cmsFaqContent.value = sanityFaq ?? {};
    await nextTick();
    observeReviewsEmbed();
    scheduleHomepageAnimations();
});

onBeforeUnmount(() => {
    isDisposed = true;
    clearReviewInterval();
    reviewsObserver?.disconnect();
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
.hero-orb {
    pointer-events: none;
    position: absolute;
    border-radius: 9999px;
    filter: blur(40px);
    opacity: 0.45;
}

.hero-orb-left {
    left: -8rem;
    bottom: 3rem;
    height: 14rem;
    width: 14rem;
    background: color-mix(in srgb, var(--color-noisette) 45%, transparent);
}

.hero-orb-right {
    right: -6rem;
    top: 4rem;
    height: 12rem;
    width: 12rem;
    background: color-mix(in srgb, var(--color-lightbeige) 28%, transparent);
}

@media (min-width: 1024px) {
    .hero-orb-left {
        left: -4rem;
        bottom: 5rem;
        height: 20rem;
        width: 20rem;
    }

    .hero-orb-right {
        right: -2rem;
        top: 5rem;
        height: 17rem;
        width: 17rem;
    }
}
</style>
