export default {
    name: 'social',
    title: 'Social',
    type: 'document',
    fields: [
        { name: 'eyebrow', title: 'Subtitle', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        { name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true, accept: 'image/webp' } },
        {
            name: 'whatsappDmUrl',
            title: 'WhatsApp DM URL',
            type: 'url',
            description: 'Direct WhatsApp link for the fixed CTA button, for example https://wa.me/9477XXXXXXX'
        },
        {
            name: 'instagramDmUrl',
            title: 'Instagram DM URL',
            type: 'url',
            description: 'Direct Instagram DM or profile link for the fixed CTA button'
        },
        {
            name: 'links',
            title: 'Links',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'label', title: 'Label', type: 'string' },
                    { name: 'href', title: 'URL', type: 'url' }
                ]
            }],
            options: {
                disableActions: ['duplicate', 'copy']
            }
        }
    ],
    preview: {
        select: {
            title: 'heading'
        },
        prepare({ title }) {
            return { title: title || 'Social' };
        }
    }
};
