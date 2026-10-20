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
                    <p class="mb-3 text-[.65rem] tracking-[.22em] uppercase text-[#E6D4B4] sm:mb-6 sm:text-xs">Negombo, Sri Lanka · Private jewellery workshops</p>
                    <h1 class="hero-heading font-display font-medium text-(--color-lightbeige)">
                        {{ heroContent.headline }}
                    </h1>
                    <p class="mt-4 max-w-lg text-base leading-relaxed text-[#F1E8DC] sm:mt-6 sm:text-lg">
                        {{ heroContent.subheadline }}
                    </p>

                    <div class="mt-5 flex w-full flex-col gap-2 sm:mt-8 sm:w-auto sm:flex-row sm:gap-3">
                        <router-link :to="heroContent.buttonLink">
                            <Button as="span" class="w-full min-w-[11rem]">{{ heroContent.buttonLabel }}</Button>
                        </router-link>
                        <router-link :to="heroContent.secondaryButtonLink">
                            <Button as="span" class="hero-secondary w-full min-w-[11rem]" variant="navLight">{{ heroContent.secondaryButtonLabel }}</Button>
                        </router-link>
                    </div>
                    <div class="hero-google mt-4 inline-flex max-w-full items-center divide-x divide-white/25 rounded-full border border-white/50 bg-[#271D17]/80 text-xs text-white backdrop-blur-sm sm:mt-7 sm:bg-black/15 sm:text-sm">
                        <a :href="GOOGLE_MAPS_URL" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-11 items-center gap-2 px-4 transition-colors hover:bg-white/10 sm:px-5"><svg viewBox="0 0 24 24" class="h-3.5 w-3.5 fill-[#D9BC80]" aria-hidden="true"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2-6.2 3.2 1.2-6.8-5-4.9 6.9-1z"/></svg>Google reviews</a>
                        <a :href="GOOGLE_MAPS_URL" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-11 items-center gap-2 px-4 transition-colors hover:bg-white/10 sm:px-5"><svg viewBox="0 0 24 24" class="h-4 w-4 fill-none stroke-current" stroke-width="1.5" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>Directions</a>
                    </div>
                    <div class="mt-2 flex items-center gap-2 text-xs text-white md:hidden">
                        <a :href="WORKSHOP_INSTAGRAM" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/50 bg-[#271D17]/80 px-4 backdrop-blur-sm hover:bg-[#38291F]" aria-label="Visit The Ring Experience on Instagram">Instagram <span aria-hidden="true">↗</span></a>
                        <a :href="WORKSHOP_WHATSAPP" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/50 bg-[#271D17]/80 px-4 backdrop-blur-sm hover:bg-[#38291F]" aria-label="Message The Ring Experience on WhatsApp">WhatsApp <span aria-hidden="true">↗</span></a>
                    </div>
                </div>
            </div>
            <a href="#theExperience" class="hero-scroll absolute bottom-7 right-[8.333%] text-xs tracking-[.15em] uppercase text-[#F1E8DC]">Discover the experience <span aria-hidden="true">↓</span></a>
        </section>
        <section id="aMoment" data-reveal class="w-full bg-[#F5EFE5] py-14 sm:py-20">
            <div class="mx-auto grid w-11/12 items-center gap-8 sm:w-10/12 lg:grid-cols-2 lg:gap-16">
                <figure class="overflow-hidden"><img src="/uploads/jeweller-at-the-bench.webp" alt="A jeweller using a torch and tweezers to work on a ring" width="1000" height="1500" loading="lazy" decoding="async" class="moment-photo w-full object-cover"></figure>
                <div class="max-w-lg"><p class="text-xs uppercase tracking-[.2em] text-[#80664A]">At the workbench</p><h2 class="mt-4 font-display text-4xl leading-tight text-[#38291F] sm:text-6xl">Your hands.<br>Your story.</h2><p class="mt-5 max-w-sm text-base leading-relaxed text-[#604B39]">Choose the details. Take your place at the bench. Create something personal with an artisan beside you.</p><router-link to="/design-your-ring" class="mt-7 inline-flex min-h-11 items-center gap-6 border-b border-[#9D7A4B] text-sm text-[#755024]">Make it yours <span aria-hidden="true">→</span></router-link></div>
            </div>
        </section>

        <section id="theExperience" data-reveal class="w-full py-14 sm:py-20">
            <div class="mx-auto w-11/12 sm:w-10/12">
                <div class="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
                    <p class="text-xs tracking-[0.2em] text-(--color-mutedbrown) uppercase">{{ theExperienceContent.eyebrow }}</p>
                    <h2 class="mt-3 font-display text-4xl leading-tight text-(--color-brown) sm:text-5xl">
                        {{ theExperienceContent.title }}
                    </h2>
                </div>
                <div ref="experienceGrid" class="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-9">
                    <Card v-for="card in experienceCards" :key="card.key"
                        class="experience-card mx-auto w-full max-w-md md:max-w-none" :title="card.title" :line-one="''"
                        :line-two="''" :image="card.image" />
                </div>
            </div>
        </section>

        <section v-if="packagesPreviewContent.enabled !== false" id="packages" data-reveal class="workshops-section w-full bg-[#252A24] py-20 text-(--color-lightbeige) sm:py-24 lg:py-28">
            <div class="mx-auto w-11/12 sm:w-10/12">
                <div class="mx-auto max-w-3xl text-center">
                    <p class="text-xs tracking-[0.2em] uppercase" style="opacity: 0.75;">{{ packagesPreviewContent.eyebrow }}</p>
                    <h2 class="mt-3 font-display text-4xl leading-tight sm:text-5xl">{{ packagesPreviewContent.heading }}</h2>

                </div>

                <div class="mx-auto mt-8 h-px w-24 bg-(--color-noisette)"></div>

                <div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    <article v-for="(pkg, index) in homepagePackages" :key="pkg.key || pkg.name" class="workshop-card relative flex flex-col border p-7 sm:p-8"
                        style="border-color: color-mix(in srgb, var(--color-lightbeige) 28%, transparent);">

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

        <section id="values" class="craft-atmosphere relative isolate w-full overflow-hidden bg-[#30251B]" aria-labelledby="craft-moment-title">
            <img src="/uploads/ring-hammering-craft.webp" alt="Close-up of a ring being shaped on a steel block with a mallet" width="1200" height="1800" loading="lazy" decoding="async" class="absolute inset-0 h-full w-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-[#20180F]/80 via-transparent to-transparent"></div>
            <div class="absolute inset-x-0 bottom-0 mx-auto w-11/12 pb-9 text-[#FAF7F1] sm:w-10/12 sm:pb-12"><p class="text-[.65rem] uppercase tracking-[.22em]">A moment in the making</p><h2 id="craft-moment-title" class="mt-3 font-display text-4xl sm:text-6xl">Feel the craft.</h2></div>
        </section>

        <PreferredResourcesSection :reviews-url="GOOGLE_MAPS_URL" />
        <FaqPreviewSection :content="faqHomepagePreviewContent" :items="homepageFaqItems" />

        <section v-if="reviewsContent.enabled !== false" id="reviews" data-reveal
            class="w-full py-20 sm:py-24 lg:py-28">
            <div class="mx-auto w-11/12 sm:w-10/12">
                <div class="mx-auto max-w-3xl text-center">
                    <p class="text-xs tracking-[0.2em] text-(--color-mutedbrown) uppercase">{{ reviewsContent.eyebrow }}
                    </p>
                    <h2 class="mt-3 font-display text-3xl leading-tight text-(--color-brown) sm:text-5xl">From our guests.</h2>
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
                        <p class="text-sm text-(--color-mutedbrown)" aria-live="polite"><span class="md:hidden">{{ reviewSlideIndex + 1 }} of {{ reviewsItems.length }}</span><span class="hidden md:inline">Showing {{ Math.min(3, reviewsItems.length) }} of {{ reviewsItems.length }} reviews</span></p>
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
                        <article v-for="(review, index) in visibleReviews" :key="`${review.author}-${review.text}`"
                            class="border bg-white/72 p-6 sm:p-7" :class="index > 0 ? 'hidden md:block' : ''"
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
import { GOOGLE_MAPS_URL, WORKSHOP_INSTAGRAM, WORKSHOP_WHATSAPP } from '../utils/businessProfile.js';
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
const theExperienceContent = computed(() => ({
    eyebrow: cmsHomepageContent.value?.theExperience?.eyebrow ?? '',
    title: cmsHomepageContent.value?.theExperience?.title ?? ''
}));
const experienceCards = computed(() => (
    Array.isArray(cmsHomepageContent.value?.experienceCards) && cmsHomepageContent.value.experienceCards.length
        ? cmsHomepageContent.value.experienceCards.map((card, index) => index === 1 ? { ...card, image: '/uploads/ring-hammering-craft.webp' } : card)
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
const useReviewSlider = computed(() => reviewsItems.value.length > 1);
const visibleReviews = computed(() => {
    if (!useReviewSlider.value) return reviewsItems.value;
    return Array.from({ length: Math.min(3, reviewsItems.value.length) }, (_, i) => reviewsItems.value[(reviewSlideIndex.value + i) % reviewsItems.value.length]);
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
.moment-photo { aspect-ratio: 4 / 5; max-height: 37rem; object-position: center 55%; }
.craft-atmosphere { height: clamp(360px, 50vw, 580px); }
.craft-atmosphere img { object-position: center 53%; filter: saturate(.7) contrast(1.03); }
.workshop-card { background: rgba(255,255,255,.035); transition: background .2s, transform .2s; }
.workshop-card:hover { background: rgba(255,255,255,.07); transform: translateY(-4px); }
@media (max-width: 639px) {
    .home-hero { min-height: 680px; min-height: max(640px, 92svh); padding-block: 5.5rem 4rem; }
    .hero-heading { font-size: clamp(2.9rem, 12vw, 4.2rem); }
    .hero-shade { background: linear-gradient(90deg, rgba(24,21,17,.85), rgba(24,21,17,.52)); }
    .craft-atmosphere { height: 500px; }
    .craft-atmosphere img { object-position: center 51%; transform: scale(1.35); transform-origin: 50% 58%; }
    .moment-photo { max-height: 30rem; }
}
@media (prefers-reduced-motion: reduce) { .workshop-card:hover { transform: none; } }
</style>
