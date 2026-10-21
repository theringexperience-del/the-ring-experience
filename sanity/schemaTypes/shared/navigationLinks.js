export const navigationLinks = (name, title, max) => ({
 name, title, type:'array', of:[{type:'object',fields:[
  {name:'label',title:'Label',type:'string',validation:Rule=>Rule.required()},
  {name:'to',title:'Destination',type:'string',validation:Rule=>Rule.required().regex(/^(\/|https:\/\/)/)},
 ],preview:{select:{title:'label',subtitle:'to'}}}],
 ...(max?{validation:Rule=>Rule.max(max)}:{}),
});
