export default {
    name: 'aboutUs',
    title: 'About Us',
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
            name: 'approach',
            title: 'Content Block One',
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
            name: 'origin',
            title: 'Content Block Two',
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
            name: 'reasonToExist',
            title: 'Reason To Exist',
            type: 'object',
            fields: [
                { name: 'eyebrow', title: 'Subtitle', type: 'string' },
                { name: 'heading', title: 'Heading', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 3 }
            ]
        }
    ],
    preview: {
        select: {
            title: 'hero.title'
        },
        prepare({ title }) {
            return { title: title || 'About Us' };
        }
    }
};

