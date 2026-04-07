export default {
    name: 'bookingPage',
    title: 'Book Page',
    type: 'document',
    fields: [
        {
            name: 'hero',
            title: 'Intro Section',
            type: 'object',
            fields: [
                { name: 'eyebrow', title: 'Subtitle', type: 'string' },
                { name: 'title', title: 'Heading', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 3 }
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
