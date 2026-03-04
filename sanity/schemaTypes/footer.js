export default {
    name: 'footer',
    title: 'Footer',
    type: 'document',
    fields: [
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'text', title: 'Text', type: 'text', rows: 3 },
        { name: 'phone', title: 'Phone', type: 'string' },
        { name: 'phoneLabel', title: 'Phone Label', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' }
    ],
    preview: {
        select: {
            title: 'title'
        },
        prepare({ title }) {
            return { title: title || 'Footer' };
        }
    }
};
