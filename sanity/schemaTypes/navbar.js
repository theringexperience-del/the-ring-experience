export default {
    name: 'navbar',
    title: 'Navbar',
    type: 'document',
    fields: [
        {
            name: 'logoSvg',
            title: 'Logo SVG',
            type: 'file',
            options: {
                accept: '.svg'
            },
            description: 'Upload only SVG format.'
        }
    ],
    preview: {
        prepare() {
            return { title: 'Navbar' };
        }
    }
};
