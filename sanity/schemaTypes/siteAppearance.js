export default {
    name: 'siteAppearance',
    title: 'Site Appearance',
    type: 'document',
    fields: [
        { name:'contactLinks',title:'Public contact and review links',type:'object',fields:[
          {name:'googleMapsUrl',title:'Google Maps and reviews',type:'url'},
          {name:'whatsappUrl',title:'WhatsApp',type:'url'},
          {name:'instagramUrl',title:'Instagram',type:'url'},
        ] },
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
