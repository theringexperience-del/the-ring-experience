<template>
    <main id="gemstones" ref="gemstonesRoot" class="w-full">
        <section data-reveal class="w-full pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-32">
            <div class="mx-auto w-11/12 sm:w-10/12">
                <div class="mx-auto max-w-3xl text-center">
                    <p class="text-xs tracking-[0.2em] text-(--color-mutedbrown) uppercase">{{ introContent.eyebrow }}</p>
                    <h1 class="mt-3 font-display text-5xl leading-tight text-(--color-brown) sm:text-6xl">{{ introContent.heading }}</h1>
                    <p class="mx-auto mt-4 max-w-2xl text-base text-(--color-brown) sm:text-lg" style="opacity: 0.85;">
                        {{ introContent.description }}
                    </p>
                </div>

                <div class="mx-auto mt-8 h-px w-24 bg-(--color-noisette)"></div>

                <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    <article v-for="stone in gemstones" :key="stone.key || stone.name"
                        class="gem-card w-full overflow-hidden border bg-(--color-lightbeige)"
                        style="border-color: color-mix(in srgb, var(--color-darkbrown) 16%, transparent);">
                        <img :src="toWebImage(stone.image, { width: 900, quality: 78 })" :alt="stone.name"
                            width="900" height="900" loading="lazy" decoding="async"
                            class="gem-card-image h-64 w-full object-cover object-center">
                        <div class="p-6 sm:p-7">
                            <p class="text-xs tracking-[0.14em] text-(--color-mutedbrown) uppercase">{{ stone.origin }}</p>
                            <h3 class="mt-2 font-display text-3xl leading-tight text-(--color-brown)">{{ stone.name }}</h3>
                            <p class="mt-2 text-sm tracking-[0.08em] text-(--color-noisette) uppercase">{{ stone.cut }}</p>
                            <p v-if="stone.meaning" class="mt-4 text-sm text-(--color-mutedbrown)">
                                Meaning: <span class="text-(--color-brown)">{{ stone.meaning }}</span>
                            </p>
                            <p class="mt-4 text-base leading-relaxed text-(--color-brown)" style="opacity: 0.86;">
                                {{ stone.description }}
                            </p>
                            <p class="mt-4 text-sm text-(--color-mutedbrown)">
                                Tone: <span class="text-(--color-brown)">{{ stone.tone }}</span>
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <section class="bg-[#EEE4D6] px-[6%] py-16 text-[#38291F] sm:py-24" aria-labelledby="gem-buying-heading">
            <div class="mx-auto max-w-6xl">
                <p class="text-xs uppercase tracking-[.18em] text-[#80664A]">Sri Lankan gems · informed choices</p>
                <h2 id="gem-buying-heading" class="mt-4 max-w-4xl font-display text-4xl leading-tight sm:text-5xl">A beautiful stone deserves a clear story.</h2>
                <p class="mt-5 max-w-3xl leading-relaxed text-[#604B39]">Sri Lanka is known for sapphires and other coloured gems. The Ring Experience can discuss gemstone ideas for a custom ring in Negombo. Ask us about a specific stone and design; availability, sourcing, origin evidence and setting work are confirmed individually.</p>
                <div class="mt-10 grid gap-5 md:grid-cols-3">
                    <article class="border-t border-[#BFAE96] pt-5"><h3 class="font-display text-2xl">What is a “Ceylon sapphire”?</h3><p class="mt-3 leading-relaxed text-[#604B39]">It refers to sapphire attributed to Sri Lankan origin. A stone bought, cut or set here is not automatically mined here. For a valuable origin claim, ask for a report from an independent gem laboratory that states its opinion.</p></article>
                    <article class="border-t border-[#BFAE96] pt-5"><h3 class="font-display text-2xl">What should I ask before buying?</h3><p class="mt-3 leading-relaxed text-[#604B39]">Request the identity, natural or laboratory-grown status, known treatments, measurements, price and any report for the exact stone. An origin opinion may not be possible for every gem. Keep the written details with your receipt.</p></article>
                    <article class="border-t border-[#BFAE96] pt-5"><h3 class="font-display text-2xl">Can it go into my ring?</h3><p class="mt-3 leading-relaxed text-[#604B39]">The stone, cut, size, setting, chosen metal and available time all matter. An artisan may need to handle the setting. Send your ideas before booking so we can explain feasibility, involvement and cost.</p></article>
                </div>
                <div class="mt-9 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#755024]"><a href="https://www.gia.edu/sapphire/buyers-guide" target="_blank" rel="noopener noreferrer" class="underline underline-offset-4">GIA sapphire buyer’s guide ↗</a><a href="https://www.gia.edu/sri-lanka-gemstones" target="_blank" rel="noopener noreferrer" class="underline underline-offset-4">GIA on Sri Lankan gems ↗</a><RouterLink to="/journal/buying-ceylon-sapphire-sri-lanka" class="underline underline-offset-4">Our sapphire buying guide ↗</RouterLink><RouterLink to="/custom-jewellery-sri-lanka" class="underline underline-offset-4">Discuss a custom ring ↗</RouterLink></div>
            </div>
        </section>

        <GemstonesOffersCallout :content="offersCalloutContent" />
        <SocialSection :content="cmsSocialContent" />
    </main>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import GemstonesOffersCallout from '../components/GemstonesOffersCallout.vue';
import SocialSection from '../components/SocialSection.vue';
import { useRevealAnimations } from '../composables/useRevealAnimations';
import { fetchGemstonesPageContentFromSanity, fetchSocialContentFromSanity, toWebImage } from '../utils/sanity';

const cmsGemstonesContent = ref({});
const cmsSocialContent = ref({});
const gemstonesRoot = ref(null);
const { setupRevealAnimations } = useRevealAnimations(gemstonesRoot, { selectors: ['[data-reveal]', '.gem-card'], start: 'top 88%' });

const introContent = computed(() => ({
    eyebrow: cmsGemstonesContent.value?.intro?.eyebrow ?? '',
    heading: cmsGemstonesContent.value?.intro?.heading ?? '',
    description: cmsGemstonesContent.value?.intro?.description ?? ''
}));
const gemstones = computed(() => (
    (Array.isArray(cmsGemstonesContent.value?.gemstones) ? cmsGemstonesContent.value.gemstones : []).filter((stone) => stone?.isVisible !== false)
));
const offersCalloutContent = computed(() => ({
    eyebrow: 'Our offers',
    heading: 'Pair your favorite stone with the right package',
    description: 'Compare all available experience formats before booking.',
    buttonLabel: 'Discover our offers',
    buttonLink: '/ouroffers'
}));

onMounted(async () => {
    const [sanityGemstones, sanitySocial] = await Promise.all([
        fetchGemstonesPageContentFromSanity(),
        fetchSocialContentFromSanity()
    ]);
    cmsGemstonesContent.value = sanityGemstones ?? {};
    cmsSocialContent.value = sanitySocial ?? {};
    await nextTick();
    setupRevealAnimations();
});
</script>

<style scoped>
.gem-card {
    position: relative;
    transition: transform 0.32s ease, box-shadow 0.32s ease, border-color 0.32s ease;
}

.gem-card-image {
    transition: transform 0.48s ease;
}

@media (hover: hover) and (pointer: fine) and (min-width: 1024px) {
    .gem-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 45px color-mix(in srgb, var(--color-darkbrown) 18%, transparent);
        border-color: color-mix(in srgb, var(--color-noisette) 45%, transparent) !important;
    }

    .gem-card:hover .gem-card-image {
        transform: scale(1.035);
    }
}
</style>
