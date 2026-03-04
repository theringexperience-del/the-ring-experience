export default {
    name: 'offersPage',
    title: 'Our Offers Page',
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
            name: 'packagesSection',
            title: 'Packages Section',
            type: 'object',
            fields: [
                { name: 'eyebrow', title: 'Subtitle', type: 'string' },
                { name: 'heading', title: 'Heading', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 3 }
            ]
        },
        {
            name: 'packages',
            title: 'Packages',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'key', title: 'Key', type: 'string' },
                    { name: 'isVisible', title: 'Visible on frontend', type: 'boolean', initialValue: true },
                    { name: 'tag', title: 'Tag', type: 'string' },
                    { name: 'name', title: 'Name', type: 'string' },
                    { name: 'duration', title: 'Duration', type: 'string' },
                    { name: 'summary', title: 'Card Summary (Homepage)', type: 'text', rows: 3 },
                    { name: 'fullDescription', title: 'Full Description (Our Offers)', type: 'text', rows: 5 },
                    { name: 'idealFor', title: 'Ideal For', type: 'string' },
                    {
                        name: 'highlights',
                        title: 'Highlights',
                        type: 'array',
                        of: [{ type: 'string' }]
                    },
                    { name: 'buttonLabel', title: 'Button Label', type: 'string', initialValue: 'Book this offer' }
                ]
            }],
            options: {
                disableActions: ['duplicate', 'copy']
            }
        },
        {
            name: 'gemstonesLink',
            title: 'Gemstones Link Section',
            type: 'object',
            fields: [
                { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true },
                { name: 'eyebrow', title: 'Subtitle', type: 'string' },
                { name: 'heading', title: 'Heading', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 3 },
                { name: 'buttonLabel', title: 'Button Label', type: 'string', initialValue: 'Explore gemstones' },
                { name: 'buttonLink', title: 'Button Link', type: 'string', initialValue: '/gemstones' }
            ]
        }
    ],
    preview: {
        select: {
            title: 'hero.title'
        },
        prepare({ title }) {
            return { title: title || 'Our Offers Page' };
        }
    }
};
