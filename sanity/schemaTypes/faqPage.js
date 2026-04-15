import { routeField } from './shared/routeOptions';

export default {
    name: 'faqPage',
    title: 'FAQ',
    type: 'document',
    fields: [
        {
            name: 'hero',
            title: 'Hero',
            type: 'object',
            fields: [
                { name: 'eyebrow', title: 'Subtitle', type: 'string', initialValue: 'FAQ' },
                { name: 'title', title: 'Title', type: 'string', initialValue: 'Frequently Asked Questions' },
                { name: 'description', title: 'Description', type: 'text', rows: 3, initialValue: 'Use this section to answer the most common questions before guests book their ring-making experience.' }
            ]
        },
        {
            name: 'homepageSection',
            title: 'Homepage FAQ Preview',
            type: 'object',
            fields: [
                { name: 'enabled', title: 'Enabled', type: 'boolean', initialValue: true },
                { name: 'eyebrow', title: 'Subtitle', type: 'string', initialValue: 'Most asked' },
                { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Quick answers before you book' },
                { name: 'ctaLabel', title: 'CTA Label', type: 'string', initialValue: 'See all FAQs' },
                routeField({ name: 'ctaLink', title: 'CTA Link', initialValue: '/faq' })
            ]
        },
        {
            name: 'items',
            title: 'FAQ Items',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() },
                    { name: 'answer', title: 'Answer', type: 'text', rows: 5, validation: (Rule) => Rule.required() },
                    { name: 'showOnHomepage', title: 'Show in Homepage Preview', type: 'boolean', initialValue: false },
                    { name: 'homepageOrder', title: 'Homepage Order', type: 'number', initialValue: 99 }
                ],
                preview: {
                    select: {
                        title: 'question',
                        subtitle: 'showOnHomepage'
                    },
                    prepare({ title, subtitle }) {
                        return {
                            title: title || 'FAQ item',
                            subtitle: subtitle ? 'Homepage preview enabled' : 'FAQ page only'
                        };
                    }
                }
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
            return { title: title || 'FAQ' };
        }
    }
};
