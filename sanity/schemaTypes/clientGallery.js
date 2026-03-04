export default {
    name: 'clientGallery',
    title: 'Client Gallery',
    type: 'document',
    fields: [
        {
            name: 'hero',
            title: 'Hero',
            type: 'object',
            fields: [
                { name: 'eyebrow', title: 'Subtitle', type: 'string' },
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 3 },
                { name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true, accept: 'image/webp' } }
            ]
        },
        {
            name: 'intro',
            title: 'Intro',
            type: 'object',
            fields: [
                { name: 'eyebrow', title: 'Subtitle', type: 'string' },
                { name: 'heading', title: 'Heading', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 3 }
            ]
        },
        {
            name: 'photos',
            title: 'Photos',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true, accept: 'image/webp' } },
                    { name: 'isVisible', title: 'Visible on frontend', type: 'boolean', initialValue: true },
                    {
                        name: 'displaySize',
                        title: 'Display Size',
                        type: 'string',
                        initialValue: 'standard',
                        options: {
                            list: [
                                { title: 'Standard', value: 'standard' },
                                { title: 'Tall', value: 'tall' },
                                { title: 'Wide', value: 'wide' }
                            ],
                            layout: 'radio'
                        }
                    },
                    { name: 'caption', title: 'Caption', type: 'string' },
                    { name: 'story', title: 'Story', type: 'text', rows: 3 },
                    { name: 'dateLabel', title: 'Date Label', type: 'string' }
                ]
            }],
            options: {
                disableActions: ['duplicate', 'copy']
            }
        }
    ],
    preview: {
        select: {
            title: 'hero.title'
        },
        prepare({ title }) {
            return { title: title || 'Client Gallery' };
        }
    }
};
