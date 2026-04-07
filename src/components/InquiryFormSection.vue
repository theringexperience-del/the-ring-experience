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
                    <div class="grid grid-cols-[8rem_1fr] gap-2">
                        <select v-model="form.phoneCode"
                            class="h-11 rounded-sm border border-[#7B6248]/45 bg-white px-2 text-sm text-(--color-brown) outline-none focus:border-(--color-noisette) focus:ring-2 focus:ring-[#B08942]/35">
                            <option v-for="code in phoneCodes" :key="code.value" :value="code.value">{{ code.label }}</option>
                        </select>
                        <input v-model.trim="form.phoneNumber" type="tel" placeholder="Phone number"
                            class="h-11 rounded-sm border border-[#7B6248]/45 bg-white px-3 text-(--color-brown) outline-none focus:border-(--color-noisette) focus:ring-2 focus:ring-[#B08942]/35">
                    </div>
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
                    <input v-model="form.newsletterConsent" type="checkbox"
                        class="mt-1 h-4 w-4 rounded border-[#7B6248]/45 text-(--color-noisette) focus:ring-[#B08942]/35">
                    <span class="text-sm text-(--color-brown)" style="opacity: 0.9;">{{ mergedContent.newsletterConsentLabel }}</span>
                </label>

                <div class="md:col-span-2 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p class="text-xs text-(--color-mutedbrown)">{{ mergedContent.privacyNote }}</p>
                    <Button type="submit" :disabled="isSubmitting">{{ isSubmitting ? 'Sending...' : mergedContent.submitLabel }}</Button>
                </div>
                <p v-if="submitMessage" class="md:col-span-2 text-sm" :class="submitState === 'error' ? 'text-red-700' : 'text-(--color-brown)'">
                    {{ submitMessage }}
                </p>
            </form>
        </div>
    </section>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import Button from './Button.vue';
import { submitLead } from '../utils/leads';
import { phoneCodes } from '../utils/phoneCodes';

const props = defineProps({
    content: {
        type: Object,
        default: () => ({})
    }
});

const mergedContent = computed(() => ({
    enabled: props.content?.enabled ?? true,
    eyebrow: props.content?.eyebrow ?? '',
    heading: props.content?.heading ?? '',
    description: props.content?.description ?? '',
    submitLabel: props.content?.submitLabel ?? 'Send request',
    privacyNote: props.content?.privacyNote ?? '',
    newsletterConsentLabel: props.content?.newsletterConsentLabel ?? 'I consent to store my email and phone for newsletter and updates.'
}));

const form = reactive({
    name: '',
    email: '',
    phoneCode: '+94',
    phoneNumber: '',
    preferredDate: '',
    message: '',
    newsletterConsent: false
});
const isSubmitting = ref(false);
const submitState = ref('idle');
const submitMessage = ref('');

const getFullPhone = () => {
    const number = (form.phoneNumber || '').trim();
    return number ? `${form.phoneCode} ${number}` : '';
};

const submitByEmail = async () => {
    if (isSubmitting.value) return;
    isSubmitting.value = true;
    submitState.value = 'idle';
    submitMessage.value = '';

    const saved = await submitLead({
        source: 'inquiry-form-section',
        name: form.name,
        email: form.email,
        phone: getFullPhone(),
        preferredDate: form.preferredDate || '',
        message: form.message || '',
        newsletterConsent: Boolean(form.newsletterConsent)
    });

    if (!saved) {
        submitState.value = 'error';
        submitMessage.value = 'Request not sent. Please try again.';
        isSubmitting.value = false;
        return;
    }

    submitState.value = 'success';
    submitMessage.value = 'We will be back as soon as possible';
    form.name = '';
    form.email = '';
    form.phoneNumber = '';
    form.preferredDate = '';
    form.message = '';
    form.newsletterConsent = false;
    isSubmitting.value = false;
};
</script>
