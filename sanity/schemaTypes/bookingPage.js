export default {
    name: 'bookingPage',
    title: 'Book Page',
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
            name: 'calendly',
            title: 'Calendly Embed',
            type: 'object',
            fields: [
                { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true },
                { name: 'eyebrow', title: 'Subtitle', type: 'string' },
                { name: 'heading', title: 'Heading', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 3 },
                { name: 'link', title: 'Calendly Link', type: 'url' }
            ]
        }
    ],
    preview: {
        select: {
            title: 'hero.title'
        },
        prepare({ title }) {
            return { title: title || 'Book Page' };
        }
    }
};
