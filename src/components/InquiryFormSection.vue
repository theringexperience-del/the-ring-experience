<template>
    <section v-if="mergedContent.enabled" class="w-full bg-(--color-lightbeige) py-20 sm:py-24 lg:py-28">
        <div class="mx-auto w-11/12 sm:w-10/12">
            <div class="mx-auto max-w-3xl text-center">
                <p class="text-xs tracking-[0.2em] text-(--color-mutedbrown) uppercase">{{ mergedContent.eyebrow }}</p>
                <h2 class="mt-3 font-display text-4xl leading-tight text-(--color-brown) sm:text-5xl">
                    {{ mergedContent.heading }}
                </h2>
                <p class="mx-auto mt-4 max-w-2xl text-base text-(--color-brown) sm:text-lg" style="opacity: 0.85;">
                    {{ mergedContent.description }}
                </p>
            </div>

            <div class="mx-auto mt-8 h-px w-24 bg-(--color-noisette)"></div>

            <form class="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2" @submit.prevent="submitByEmail">
                <label class="flex flex-col gap-2">
                    <span class="text-sm text-(--color-brown)">Name</span>
                    <input v-model.trim="form.name" required type="text"
                        class="h-11 rounded-sm border border-[#7B6248]/45 bg-white px-3 text-(--color-brown) outline-none focus:border-(--color-noisette) focus:ring-2 focus:ring-[#B08942]/35">
                </label>

                <label class="flex flex-col gap-2">
                    <span class="text-sm text-(--color-brown)">Email</span>
                    <input v-model.trim="form.email" required type="email"
                        class="h-11 rounded-sm border border-[#7B6248]/45 bg-white px-3 text-(--color-brown) outline-none focus:border-(--color-noisette) focus:ring-2 focus:ring-[#B08942]/35">
                </label>

                <label class="flex flex-col gap-2">
                    <span class="text-sm text-(--color-brown)">Phone / WhatsApp</span>
                    <input v-model.trim="form.phone" type="text"
                        class="h-11 rounded-sm border border-[#7B6248]/45 bg-white px-3 text-(--color-brown) outline-none focus:border-(--color-noisette) focus:ring-2 focus:ring-[#B08942]/35">
                </label>

                <label class="flex flex-col gap-2">
                    <span class="text-sm text-(--color-brown)">Preferred date</span>
                    <input v-model.trim="form.preferredDate" type="text" placeholder="YYYY-MM-DD"
                        class="h-11 rounded-sm border border-[#7B6248]/45 bg-white px-3 text-(--color-brown) outline-none focus:border-(--color-noisette) focus:ring-2 focus:ring-[#B08942]/35">
                </label>

                <label class="md:col-span-2 flex flex-col gap-2">
                    <span class="text-sm text-(--color-brown)">Message</span>
                    <textarea v-model.trim="form.message" rows="5"
                        class="rounded-sm border border-[#7B6248]/45 bg-white px-3 py-2 text-(--color-brown) outline-none focus:border-(--color-noisette) focus:ring-2 focus:ring-[#B08942]/35"></textarea>
                </label>

                <label class="md:col-span-2 flex items-start gap-3">
                    <input v-model="form.newsletterConsent" required type="checkbox"
                        class="mt-1 h-4 w-4 rounded border-[#7B6248]/45 text-(--color-noisette) focus:ring-[#B08942]/35">
                    <span class="text-sm text-(--color-brown)" style="opacity: 0.9;">{{ mergedContent.newsletterConsentLabel }}</span>
                </label>

                <div class="md:col-span-2 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p class="text-xs text-(--color-mutedbrown)">{{ mergedContent.privacyNote }}</p>
                    <Button type="submit">{{ mergedContent.submitLabel }}</Button>
                </div>
            </form>
        </div>
    </section>
</template>

<script setup>
import { computed, reactive } from 'vue';
import Button from './Button.vue';
import { saveLeadToSheet } from '../utils/leads';

const props = defineProps({
    content: {
        type: Object,
        default: () => ({})
    }
});

const mergedContent = computed(() => ({
    enabled: props.content?.enabled ?? true,
    eyebrow: props.content?.eyebrow ?? 'Plan your session',
    heading: props.content?.heading ?? 'Tell us what you have in mind',
    description: props.content?.description ?? 'Send your request and we will confirm details shortly.',
    recipientEmail: props.content?.recipientEmail ?? 'hello@the-ring-experience.com',
    sheetWebhookUrl: props.content?.sheetWebhookUrl ?? '',
    subjectPrefix: props.content?.subjectPrefix ?? 'New Inquiry',
    submitLabel: props.content?.submitLabel ?? 'Send request',
    privacyNote: props.content?.privacyNote ?? 'By sending this form you consent to be contacted about your booking request.',
    newsletterConsentLabel: props.content?.newsletterConsentLabel ?? 'I consent to store my email and phone for newsletter and updates.'
}));

const form = reactive({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    message: '',
    newsletterConsent: false
});

const submitByEmail = async () => {
    const subject = `${mergedContent.value.subjectPrefix} - ${form.name}`.trim();
    const bodyLines = [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone || '-'}`,
        `Preferred date: ${form.preferredDate || '-'}`,
        `Newsletter consent: ${form.newsletterConsent ? 'Yes' : 'No'}`,
        '',
        'Message:',
        form.message || '-'
    ];

    if (form.newsletterConsent) {
        await saveLeadToSheet(mergedContent.value.sheetWebhookUrl, {
            source: 'inquiry-form-section',
            name: form.name,
            email: form.email,
            phone: form.phone || '',
            preferredDate: form.preferredDate || '',
            message: form.message || '',
            newsletterConsent: true
        });
    }

    const mailtoUrl = `mailto:${encodeURIComponent(mergedContent.value.recipientEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
    window.location.href = mailtoUrl;
};
</script>
