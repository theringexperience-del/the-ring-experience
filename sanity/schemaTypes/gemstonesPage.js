export default {
    name: 'gemstonesPage',
    title: 'Gemstones Page',
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
            name: 'gemstones',
            title: 'Gemstones',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'key', title: 'Key', type: 'string' },
                    { name: 'name', title: 'Name', type: 'string' },
                    { name: 'isVisible', title: 'Visible on frontend', type: 'boolean', initialValue: true },
                    { name: 'origin', title: 'Origin', type: 'string' },
                    { name: 'tone', title: 'Tone', type: 'string' },
                    { name: 'cut', title: 'Cut', type: 'string' },
                    { name: 'description', title: 'Description', type: 'text', rows: 3 },
                    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true, accept: 'image/webp' } }
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
            return { title: title || 'Gemstones Page' };
        }
    }
};
