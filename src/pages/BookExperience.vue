<template>
    <main id="bookExperience" ref="bookRoot" class="w-full">
        <section data-reveal class="w-full pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28">
            <div class="mx-auto w-11/12 sm:w-10/12">
                <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <article class="book-card border bg-white/80 p-6 sm:p-8 lg:col-span-5"
                        style="border-color: color-mix(in srgb, var(--color-darkbrown) 18%, transparent);">
                        <h3 class="font-display text-3xl text-(--color-brown)">Send a request</h3>
                        <p class="mt-2 text-sm text-(--color-mutedbrown)">
                            Fill the form to receive package details and availability.
                        </p>
                        <form class="mt-6 grid grid-cols-1 gap-4" @submit.prevent="submitByEmail">
                            <label class="flex flex-col gap-2">
                                <span class="text-sm font-medium text-(--color-brown)">Package</span>
                                <select v-model="form.packageName" required
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
                                <span class="text-sm font-medium text-(--color-brown)">Message</span>
                                <textarea v-model.trim="form.message" rows="4"
                                    class="rounded-sm border border-[#7B6248]/45 bg-white px-3 py-2 text-(--color-brown) outline-none focus:border-(--color-noisette) focus:ring-2 focus:ring-[#B08942]/35"></textarea>
                            </label>
                            <label class="flex items-start gap-3">
                                <input v-model="form.newsletterConsent" required type="checkbox"
                                    class="mt-1 h-4 w-4 rounded border-[#7B6248]/45 text-(--color-noisette) focus:ring-[#B08942]/35">
                                <span class="text-sm text-(--color-brown)" style="opacity: 0.9;">{{ mergedFormContent.newsletterConsentLabel }}</span>
                            </label>
                            <Button type="submit" class="mt-1">{{ mergedFormContent.submitLabel }}</Button>
                        </form>
                    </article>

                    <article class="book-card overflow-hidden border bg-white/80 p-2 sm:p-3 lg:col-span-7"
                        style="border-color: color-mix(in srgb, var(--color-darkbrown) 18%, transparent);">
                        <div v-if="calendlyContent.heading || calendlyContent.description" class="border-b px-5 py-4 sm:px-6"
                            style="border-color: color-mix(in srgb, var(--color-darkbrown) 14%, transparent);">
                            <p v-if="calendlyContent.eyebrow" class="text-xs tracking-[0.18em] text-(--color-mutedbrown) uppercase">{{ calendlyContent.eyebrow }}</p>
                            <h2 v-if="calendlyContent.heading" class="mt-2 font-display text-3xl leading-tight text-(--color-brown) sm:text-4xl">
                                {{ calendlyContent.heading }}
                            </h2>
                            <p v-if="calendlyContent.description" class="mt-3 text-sm leading-relaxed text-(--color-mutedbrown) sm:text-base">
                                {{ calendlyContent.description }}
                            </p>
                        </div>
                        <iframe v-if="calendlyEmbedUrl" :src="calendlyEmbedUrl" title="Calendly booking"
                            class="h-[760px] w-full border-0"></iframe>
                        <p v-else class="p-8 text-center text-(--color-brown)" style="opacity: 0.75;">
                            Add a Calendly link from CMS to show the scheduler.
                        </p>
                    </article>
                </div>
            </div>
        </section>

        <SocialSection :content="cmsSocialContent" />
    </main>
</template>

<script setup>
import { computed, nextTick, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import Button from '../components/Button.vue';
import SocialSection from '../components/SocialSection.vue';
import { useRevealAnimations } from '../composables/useRevealAnimations';
import { saveLeadToSheet } from '../utils/leads';
import { fetchBookingPageContentFromSanity, fetchContactFormContentFromSanity, fetchOffersPageContentFromSanity, fetchSocialContentFromSanity } from '../utils/sanity';

const route = useRoute();
const bookRoot = ref(null);
const { setupRevealAnimations } = useRevealAnimations(bookRoot, { selectors: ['[data-reveal]', '.book-card'], start: 'top 88%' });

const cmsBookingContent = ref({});
const cmsFormContent = ref({});
const cmsOffersContent = ref({});
const cmsSocialContent = ref({});

const calendlyContent = computed(() => ({
    enabled: cmsBookingContent.value?.calendly?.enabled ?? true,
    eyebrow: cmsBookingContent.value?.calendly?.eyebrow ?? '',
    heading: cmsBookingContent.value?.calendly?.heading ?? '',
    description: cmsBookingContent.value?.calendly?.description ?? '',
    link: cmsBookingContent.value?.calendly?.link ?? ''
}));
const mergedFormContent = computed(() => ({
    recipientEmail: cmsFormContent.value?.recipientEmail ?? 'hello@the-ring-experience.com',
    sheetWebhookUrl: cmsFormContent.value?.sheetWebhookUrl ?? '',
    subjectPrefix: cmsFormContent.value?.subjectPrefix ?? 'Booking Request',
    submitLabel: cmsFormContent.value?.submitLabel ?? 'Send request',
    newsletterConsentLabel: cmsFormContent.value?.newsletterConsentLabel ?? 'I consent to store my email and phone for newsletter and updates.'
}));
const packageOptions = computed(() => (
    (Array.isArray(cmsOffersContent.value?.packages) ? cmsOffersContent.value.packages : [])
        .filter((pkg) => pkg?.isVisible !== false)
        .map((pkg) => pkg.name)
        .filter(Boolean)
));

const calendlyEmbedUrl = computed(() => {
    if (calendlyContent.value.enabled === false) return '';
    const rawLink = calendlyContent.value.link || '';
    if (!rawLink) return '';
    if (!/^https:\/\/calendly\.com\/.+/i.test(rawLink)) return '';
    const separator = rawLink.includes('?') ? '&' : '?';
    return `${rawLink}${separator}embed_domain=the-ring-experience.com&hide_event_type_details=1&hide_gdpr_banner=1`;
});

const form = reactive({
    packageName: '',
    name: '',
    email: '',
    message: '',
    newsletterConsent: false
});

const submitByEmail = async () => {
    const subject = `${mergedFormContent.value.subjectPrefix} - ${form.packageName || 'General Request'}`.trim();
    const bodyLines = [
        `Package: ${form.packageName || '-'}`,
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Newsletter consent: ${form.newsletterConsent ? 'Yes' : 'No'}`,
        '',
        'Message:',
        form.message || '-'
    ];

    if (form.newsletterConsent) {
        await saveLeadToSheet(mergedFormContent.value.sheetWebhookUrl, {
            source: 'book-experience',
            packageName: form.packageName || '',
            name: form.name,
            email: form.email,
            message: form.message || '',
            newsletterConsent: true
        });
    }

    const mailtoUrl = `mailto:${encodeURIComponent(mergedFormContent.value.recipientEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    window.location.href = mailtoUrl;
};

onMounted(async () => {
    const [sanityBooking, sanityForm, sanityOffers, sanitySocial] = await Promise.all([
        fetchBookingPageContentFromSanity(),
        fetchContactFormContentFromSanity(),
        fetchOffersPageContentFromSanity(),
        fetchSocialContentFromSanity()
    ]);

    cmsBookingContent.value = sanityBooking ?? {};
    cmsFormContent.value = sanityForm ?? {};
    cmsOffersContent.value = sanityOffers ?? {};
    cmsSocialContent.value = sanitySocial ?? {};

    const packageFromQuery = typeof route.query.package === 'string' ? route.query.package : '';
    if (packageFromQuery && packageOptions.value.includes(packageFromQuery)) {
        form.packageName = packageFromQuery;
    }
    await nextTick();
    setupRevealAnimations();
});
</script>
