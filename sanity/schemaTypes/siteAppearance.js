export default {
    name: 'siteAppearance',
    title: 'Site Appearance',
    type: 'document',
    fields: [
        {
            name: 'globalBackgroundImage',
            title: 'Global Background Image (WEBP)',
            type: 'image',
            options: {
                hotspot: true,
                accept: 'image/webp'
            }
        }
    ],
    preview: {
        prepare() {
            return { title: 'Site Appearance' };
        }
    }
};
