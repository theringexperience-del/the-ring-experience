<template>
    <main id="ourOffers" ref="offersRoot" class="w-full">
        <section data-reveal class="w-full pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28">
            <div class="mx-auto w-11/12 sm:w-10/12">
                <div class="mx-auto max-w-3xl text-center">
                    <p class="text-xs tracking-[0.2em] text-(--color-mutedbrown) uppercase">{{ packagesSectionContent.eyebrow }}</p>
                    <h1 class="mt-3 font-display text-5xl leading-tight text-(--color-brown) sm:text-6xl">{{ packagesSectionContent.heading }}</h1>
                    <p class="mx-auto mt-4 max-w-2xl text-base text-(--color-brown) sm:text-lg" style="opacity: 0.85;">
                        {{ packagesSectionContent.description }}
                    </p>
                </div>

                <div class="mx-auto mt-8 h-px w-24 bg-(--color-noisette)"></div>

                <div class="mt-10 grid grid-cols-1 gap-6 lg:gap-8">
                    <article v-for="pkg in packagesContent" :key="pkg.key || pkg.name"
                        class="offer-card rounded-sm border bg-white/74 p-7 sm:p-8 lg:p-10"
                        style="border-color: color-mix(in srgb, var(--color-darkbrown) 18%, transparent);">
                        <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                            <div class="max-w-4xl">
                                <p class="text-xs tracking-[0.14em] text-(--color-mutedbrown) uppercase">{{ pkg.tag }}</p>
                                <h3 class="mt-2 font-display text-4xl leading-tight text-(--color-brown)">{{ pkg.name }}</h3>
                                <p class="mt-2 text-sm tracking-[0.08em] text-(--color-noisette) uppercase">{{ pkg.duration }}</p>
                                <p class="mt-4 text-base leading-relaxed text-(--color-brown)" style="opacity: 0.9;">
                                    {{ pkg.fullDescription || pkg.summary }}
                                </p>
                                <p v-if="pkg.idealFor" class="mt-4 text-sm text-(--color-mutedbrown)">
                                    Ideal for: <span class="text-(--color-brown)">{{ pkg.idealFor }}</span>
                                </p>
                                <ul v-if="pkg.highlights?.length" class="mt-4 grid gap-2 text-sm text-(--color-brown)">
                                    <li v-for="highlight in pkg.highlights" :key="`${pkg.key}-${highlight}`">- {{ highlight }}</li>
                                </ul>
                            </div>
                            <div class="flex min-w-[12rem] flex-col items-start gap-4 lg:items-end">
                                <Button type="button" @click="focusFormForPackage(pkg.name)">{{ pkg.buttonLabel || 'Request info for this offer' }}</Button>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>

        <section id="offers-form" data-reveal class="w-full bg-(--color-lightbeige) py-20 sm:py-24 lg:py-28">
            <div class="mx-auto w-11/12 sm:w-10/12">
                <div class="mx-auto max-w-3xl text-center">
                    <p class="text-xs tracking-[0.2em] text-(--color-mutedbrown) uppercase">{{ mergedFormContent.eyebrow }}</p>
                    <h2 class="mt-3 font-display text-4xl leading-tight text-(--color-brown) sm:text-5xl">{{ mergedFormContent.heading }}</h2>
                    <p class="mx-auto mt-4 max-w-2xl text-base text-(--color-brown) sm:text-lg" style="opacity: 0.85;">
                        {{ mergedFormContent.description }}
                    </p>
                </div>

                <div class="mx-auto mt-8 h-px w-24 bg-(--color-noisette)"></div>

                <form class="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2" @submit.prevent="submitByEmail">
                    <label class="flex flex-col gap-2">
                        <span class="text-sm font-medium text-(--color-brown)">Package</span>
                        <select ref="packageField" v-model="form.packageName" required
                            class="h-11 rounded-sm border border-[#7B6248]/45 bg-white px-3 text-(--color-brown) outline-none focus:border-(--color-noisette) focus:ring-2 focus:ring-[#B08942]/35">
                            <option value="" disabled>Select a package</option>
                            <option v-for="pkg in packageOptions" :key="pkg" :value="pkg">{{ pkg }}</option>
                        </select>
                    </label>
                    <label class="flex flex-col gap-2">
                        <span class="text-sm font-medium text-(--color-brown)">Name</span>
                        <input v-model.trim="form.name" required type="text"
                            class="h-11 rounded-sm border border-[#7B6248]/45 bg-white px-3 text-(--color-brown) outline-none focus:border-(--color-noisette) focus:ring-2 focus:ring-[#B08942]/35">
                    </label>
                    <label class="flex flex-col gap-2">
                        <span class="text-sm font-medium text-(--color-brown)">Email</span>
                        <input v-model.trim="form.email" required type="email"
                            class="h-11 rounded-sm border border-[#7B6248]/45 bg-white px-3 text-(--color-brown) outline-none focus:border-(--color-noisette) focus:ring-2 focus:ring-[#B08942]/35">
                    </label>
                    <label class="flex flex-col gap-2">
                        <span class="text-sm font-medium text-(--color-brown)">Phone / WhatsApp</span>
                        <input v-model.trim="form.phone" type="text"
                            class="h-11 rounded-sm border border-[#7B6248]/45 bg-white px-3 text-(--color-brown) outline-none focus:border-(--color-noisette) focus:ring-2 focus:ring-[#B08942]/35">
                    </label>
                    <label class="md:col-span-2 flex flex-col gap-2">
                        <span class="text-sm font-medium text-(--color-brown)">Message</span>
                        <textarea v-model.trim="form.message" rows="5"
                            class="rounded-sm border border-[#7B6248]/45 bg-white px-3 py-2 text-(--color-brown) outline-none focus:border-(--color-noisette) focus:ring-2 focus:ring-[#B08942]/35"></textarea>
                    </label>
                    <label class="md:col-span-2 flex items-start gap-3">
                        <input v-model="form.newsletterConsent" required type="checkbox"
                            class="mt-1 h-4 w-4 rounded border-[#7B6248]/45 text-(--color-noisette) focus:ring-[#B08942]/35">
                        <span class="text-sm text-(--color-brown)" style="opacity: 0.9;">{{ mergedFormContent.newsletterConsentLabel }}</span>
                    </label>
                    <div class="md:col-span-2 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <p class="text-xs text-(--color-mutedbrown)">{{ mergedFormContent.privacyNote }}</p>
                        <Button type="submit">{{ mergedFormContent.submitLabel }}</Button>
                    </div>
                </form>
            </div>
        </section>

        <GemstonesOffersCallout :content="gemstonesCalloutContent" />
        <SocialSection :content="cmsSocialContent" />
    </main>
</template>

<script setup>
import { computed, nextTick, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import Button from '../components/Button.vue';
import GemstonesOffersCallout from '../components/GemstonesOffersCallout.vue';
import SocialSection from '../components/SocialSection.vue';
import { useRevealAnimations } from '../composables/useRevealAnimations';
import { saveLeadToSheet } from '../utils/leads';
import { fetchContactFormContentFromSanity, fetchOffersPageContentFromSanity, fetchSocialContentFromSanity } from '../utils/sanity';

const route = useRoute();
const packageField = ref(null);
const offersRoot = ref(null);
const { setupRevealAnimations } = useRevealAnimations(offersRoot, { selectors: ['[data-reveal]', '.offer-card'], start: 'top 86%' });

const cmsOffersContent = ref({});
const cmsFormContent = ref({});
const cmsSocialContent = ref({});

const packagesSectionContent = computed(() => ({
    eyebrow: cmsOffersContent.value?.packagesSection?.eyebrow ?? '',
    heading: cmsOffersContent.value?.packagesSection?.heading ?? '',
    description: cmsOffersContent.value?.packagesSection?.description ?? ''
}));

const packagesContent = computed(() => (
    (Array.isArray(cmsOffersContent.value?.packages) ? cmsOffersContent.value.packages : []).filter((pkg) => pkg?.isVisible !== false)
));
const packageOptions = computed(() => packagesContent.value.map((pkg) => pkg.name).filter(Boolean));
const mergedFormContent = computed(() => ({
    enabled: cmsFormContent.value?.enabled ?? true,
    eyebrow: cmsFormContent.value?.eyebrow ?? '',
    heading: cmsFormContent.value?.heading ?? '',
    description: cmsFormContent.value?.description ?? '',
    recipientEmail: cmsFormContent.value?.recipientEmail ?? 'hello@the-ring-experience.com',
    sheetWebhookUrl: cmsFormContent.value?.sheetWebhookUrl ?? '',
    subjectPrefix: cmsFormContent.value?.subjectPrefix ?? 'Offer Request',
    submitLabel: cmsFormContent.value?.submitLabel ?? 'Send request',
    privacyNote: cmsFormContent.value?.privacyNote ?? 'By sending this form, you consent to be contacted regarding your request.',
    newsletterConsentLabel: cmsFormContent.value?.newsletterConsentLabel ?? 'I consent to store my email and phone for newsletter and updates.'
}));
const gemstonesCalloutContent = computed(() => ({
    eyebrow: cmsOffersContent.value?.gemstonesLink?.eyebrow || 'Gemstones',
    heading: cmsOffersContent.value?.gemstonesLink?.heading || 'Discover our gemstones',
    description: cmsOffersContent.value?.gemstonesLink?.description || '',
    buttonLabel: cmsOffersContent.value?.gemstonesLink?.buttonLabel || 'Explore gemstones',
    buttonLink: cmsOffersContent.value?.gemstonesLink?.buttonLink || '/gemstones'
}));

const form = reactive({
    packageName: '',
    name: '',
    email: '',
    phone: '',
    message: '',
    newsletterConsent: false
});

const scrollToOffersForm = ({ behavior = 'smooth' } = {}) => {
    const formSection = document.getElementById('offers-form');
    if (!formSection) return;
    const navbarHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 84;
    const targetTop = window.scrollY + formSection.getBoundingClientRect().top - navbarHeight - 18;
    window.scrollTo({ top: Math.max(targetTop, 0), behavior });
};

const applyPackageFromRoute = async () => {
    const selectedPackage = typeof route.query.package === 'string' ? route.query.package : '';
    if (!selectedPackage || !packageOptions.value.includes(selectedPackage)) return;
    form.packageName = selectedPackage;
    await nextTick();
    scrollToOffersForm();
    packageField.value?.focus({ preventScroll: true });
};

const focusFormForPackage = async (packageName) => {
    form.packageName = packageName;
    await nextTick();
    scrollToOffersForm();
    packageField.value?.focus({ preventScroll: true });
};

const submitByEmail = async () => {
    const subject = `${mergedFormContent.value.subjectPrefix} - ${form.packageName}`.trim();
    const bodyLines = [
        `Package: ${form.packageName}`,
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone || '-'}`,
        `Newsletter consent: ${form.newsletterConsent ? 'Yes' : 'No'}`,
        '',
        'Message:',
        form.message || '-'
    ];

    if (form.newsletterConsent) {
        await saveLeadToSheet(mergedFormContent.value.sheetWebhookUrl, {
            source: 'our-offers',
            packageName: form.packageName,
            name: form.name,
            email: form.email,
            phone: form.phone || '',
            message: form.message || '',
            newsletterConsent: true
        });
    }

    const mailtoUrl = `mailto:${encodeURIComponent(mergedFormContent.value.recipientEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    window.location.href = mailtoUrl;
};

onMounted(async () => {
    const [sanityOffers, sanityForm, sanitySocial] = await Promise.all([
        fetchOffersPageContentFromSanity(),
        fetchContactFormContentFromSanity(),
        fetchSocialContentFromSanity()
    ]);

    cmsOffersContent.value = sanityOffers ?? {};
    cmsFormContent.value = sanityForm ?? {};
    cmsSocialContent.value = sanitySocial ?? {};

    await applyPackageFromRoute();
    await nextTick();
    setupRevealAnimations();
});
</script>
