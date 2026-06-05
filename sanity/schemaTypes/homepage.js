import { routeField } from './shared/routeOptions';

export default {
    name: 'homepage',
    title: 'Homepage',
    type: 'document',
    fields: [
        {
            name: 'hero',
            title: 'Hero',
            type: 'object',
            fields: [
                { name: 'headline', title: 'Headline', type: 'string' },
                { name: 'subheadline', title: 'Subheadline', type: 'text', rows: 3 },
                { name: 'buttonLabel', title: 'Button Label', type: 'string' },
                routeField({ name: 'buttonLink', title: 'Button Link', initialValue: '/bookexperience' }),
                { name: 'secondaryButtonLabel', title: 'Secondary Button Label', type: 'string', initialValue: 'Discover our offers' },
                routeField({ name: 'secondaryButtonLink', title: 'Secondary Button Link', initialValue: '/ouroffers' }),
                {
                    name: 'mediaType',
                    title: 'Hero Media Type',
                    type: 'string',
                    initialValue: 'image',
                    options: {
                        list: [
                            { title: 'Image', value: 'image' },
                            { title: 'Video (WEBM)', value: 'video' }
                        ],
                        layout: 'radio'
                    }
                },
                { name: 'image', title: 'Image (WEBP)', type: 'image', options: { hotspot: true, accept: 'image/webp' } },
                { name: 'video', title: 'Video (WEBM)', type: 'file', options: { accept: '.webm' } }
            ]
        },
        {
            name: 'aMoment',
            title: 'A Moment',
            type: 'object',
            fields: [
                { name: 'eyebrow', title: 'Subtitle', type: 'string' },
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'paragraphOne', title: 'Paragraph One', type: 'text', rows: 3 },
                { name: 'paragraphTwo', title: 'Paragraph Two', type: 'text', rows: 3 },
                { name: 'image', title: 'Image', type: 'image', options: { hotspot: true, accept: 'image/webp' } }
            ]
        },
        {
            name: 'theExperience',
            title: 'The Experience',
            type: 'object',
            fields: [
                { name: 'eyebrow', title: 'Subtitle', type: 'string' },
                { name: 'title', title: 'Title', type: 'string' }
            ]
        },
        {
            name: 'experienceCards',
            title: 'Experience Cards',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'key', title: 'Key', type: 'string' },
                    { name: 'title', title: 'Title', type: 'string' },
                    { name: 'lineOne', title: 'Line One', type: 'string' },
                    { name: 'lineTwo', title: 'Line Two', type: 'string' },
                    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true, accept: 'image/webp' } }
                ]
            }],
            options: {
                disableActions: ['duplicate', 'copy']
            },
            validation: (Rule) => Rule.min(3).max(3)
        },
        {
            name: 'values',
            title: 'Values',
            type: 'object',
            fields: [
                { name: 'heading', title: 'Heading', type: 'string' },
                { name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true, accept: 'image/webp' } },
                {
                    name: 'items',
                    title: 'Items',
                    type: 'array',
                    of: [{
                        type: 'object',
                        fields: [
                            { name: 'title', title: 'Title', type: 'string' },
                            { name: 'text', title: 'Text', type: 'text', rows: 3 }
                        ]
                    }],
                    options: {
                        disableActions: ['duplicate', 'copy']
                    },
                    validation: (Rule) => Rule.min(4).max(4)
                }
            ]
        },
        {
            name: 'packagesPreview',
            title: 'Packages Preview',
            type: 'object',
            fields: [
                { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true },
                { name: 'eyebrow', title: 'Subtitle', type: 'string' },
                { name: 'heading', title: 'Heading', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 3 },
                { name: 'ctaLabel', title: 'CTA Label', type: 'string', initialValue: 'Discover all offers' },
                routeField({ name: 'ctaLink', title: 'CTA Link', initialValue: '/ouroffers' })
            ]
        },
        {
            name: 'reviews',
            title: 'Reviews',
            type: 'object',
            fields: [
                { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true },
                { name: 'eyebrow', title: 'Subtitle', type: 'string' },
                { name: 'heading', title: 'Heading', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 3 },
                { name: 'sourceLabel', title: 'Public Link Label', type: 'string', description: 'Optional label for a public reviews link, for example View on Google.' },
                { name: 'sourceUrl', title: 'Public Reviews Link', type: 'url', description: 'Optional public link shown under the reviews heading. No API keys or Place IDs go here.' },
                {
                    name: 'sourceType',
                    title: 'Source Type',
                    type: 'string',
                    initialValue: 'manual',
                    options: {
                        list: [
                            { title: 'Manual Reviews', value: 'manual' },
                            { title: 'Google Reviews (Automatic)', value: 'google' }
                        ],
                        layout: 'radio'
                    }
                },
                {
                    name: 'maxItems',
                    title: 'Maximum Reviews to Show',
                    type: 'number',
                    initialValue: 9,
                    hidden: ({ parent }) => parent?.sourceType !== 'google',
                    validation: (Rule) => Rule.min(3).max(20)
                },
                {
                    name: 'items',
                    title: 'Manual Reviews / Fallback',
                    description: 'Used when Source Type is Manual Reviews, and kept as backup if Google reviews are unavailable.',
                    type: 'array',
                    of: [{
                        type: 'object',
                        fields: [
                            { name: 'author', title: 'Author', type: 'string' },
                            { name: 'rating', title: 'Rating', type: 'number', validation: (Rule) => Rule.min(1).max(5) },
                            { name: 'text', title: 'Text', type: 'text', rows: 4 },
                            { name: 'dateLabel', title: 'Date Label', type: 'string' }
                        ]
                    }],
                    options: {
                        disableActions: ['duplicate', 'copy']
                    }
                }
            ]
        }
    ],
    preview: {
        select: {
            title: 'hero.headline'
        },
        prepare({ title }) {
            return { title: title || 'Homepage' };
        }
    }
};
