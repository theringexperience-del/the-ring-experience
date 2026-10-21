import { navigationLinks } from './shared/navigationLinks';
export default {
    name: 'navbar',
    title: 'Navbar',
    type: 'document',
    fields: [
        navigationLinks('primaryLinks','Primary navigation',5),
        navigationLinks('studioLinks','Studio navigation'),
        {name:'bookingLabel',title:'Booking button label',type:'string'},
        {name:'bookingLink',title:'Booking destination',type:'string'},
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
