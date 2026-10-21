export const pageSection = { type: 'object', name: 'pageSection', fields: [
  { name: 'key', title: 'Section', type: 'string', readOnly: true, validation: Rule => Rule.required() },
  { name: 'eyebrow', title: 'Subtitle', type: 'string' },
  { name: 'heading', title: 'Heading', type: 'string' },
  { name: 'body', title: 'Text', type: 'array', of: [{ type: 'block', styles: [{ title: 'Paragraph', value: 'normal' }], lists: [], marks: { decorators: [{ title: 'Bold', value: 'strong' }, { title: 'Italic', value: 'em' }], annotations: [{ name: 'link', type: 'object', fields: [{ name: 'href', title: 'Link', type: 'string', validation: Rule => Rule.regex(/^(\/|#|https:\/\/|mailto:|tel:)/) }] }] } }] },
  { name: 'image', title: 'Photograph', type: 'image', options: { hotspot: true, accept: 'image/webp' } },
  { name: 'imageAlt', title: 'Image description', type: 'string' },
  { name: 'caption', title: 'Photo caption', type: 'string' },
  { name: 'links', title: 'Links and buttons', type: 'array', of: [{ type: 'object', fields: [
    { name: 'label', title: 'Label', type: 'string' },
    { name: 'href', title: 'Destination', type: 'string', validation: Rule => Rule.regex(/^(\/|#|https:\/\/|mailto:|tel:)/) },
  ], preview: { select: { title: 'label' } } }] },
], preview: { select: { title: 'heading', subtitle: 'key' } } };
export default {
  name: 'editorialPage', title: 'Guides and page sections', type: 'document',
  fields: [
    { name: 'title', title: 'Page name', type: 'string', validation: Rule => Rule.required() },
    { name: 'path', title: 'Page URL', type: 'string', validation: Rule => Rule.required().regex(/^\//) },
    { name: 'seoTitle', title: 'SEO title', type: 'string' },
    { name: 'description', title: 'SEO description', type: 'text', rows: 3 },
    { name: 'choices', title: 'Ring planner choices', type: 'array', of: [{ type: 'object', fields: [ { name: 'key', title: 'Field', type: 'string', readOnly: true }, { name: 'label', title: 'Label', type: 'string' }, { name: 'options', title: 'Options', type: 'array', of: [{type:'string'}] } ], preview: {select:{title:'label'}} }] },
    { name: 'sections', title: 'Page sections', type: 'array', of: [pageSection] },
  ], preview: { select: { title: 'title', subtitle: 'path' } },
};
