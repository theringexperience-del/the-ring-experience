export default {
 name:'preferredResources',title:'Studio notebook links',type:'document',
 fields:[{name:'eyebrow',title:'Subtitle',type:'string'},{name:'heading',title:'Heading',type:'string'},
 {name:'links',title:'Links',type:'array',of:[{type:'object',fields:[{name:'label',title:'Label',type:'string'},{name:'href',title:'Destination',type:'string',validation:Rule=>Rule.regex(/^(\/|https:\/\/)/)}],preview:{select:{title:'label'}}}]}],
};
