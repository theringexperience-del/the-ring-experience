export default {
    name: 'contactForm',
    title: 'Shared Contact Form',
    type: 'document',
    fields: [
        { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true },
        { name: 'eyebrow', title: 'Subtitle', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        { name: 'recipientEmail', title: 'Recipient Email', type: 'string' },
        { name: 'sheetWebhookUrl', title: 'Google Sheet Webhook URL', type: 'url' },
        { name: 'subjectPrefix', title: 'Email Subject Prefix', type: 'string' },
        { name: 'submitLabel', title: 'Submit Button Label', type: 'string' },
        { name: 'privacyNote', title: 'Privacy Note', type: 'text', rows: 2 },
        { name: 'newsletterConsentLabel', title: 'Newsletter Consent Label', type: 'text', rows: 2 }
    ],
    preview: {
        prepare() {
            return { title: 'Shared Contact Form' };
        }
    }
};
