const text = (name, title, type = 'string') => ({ name, title, type });
export default {
  name: 'journalPost', title: 'Journal article', type: 'document',
  fields: [
    { ...text('title', 'Title'), validation: Rule => Rule.required() },
    { name: 'slug', title: 'URL slug', type: 'slug', options: { source: 'title' }, validation: Rule => Rule.required() },
    text('description', 'SEO description', 'text'), text('category', 'Category'),
    text('readingTime', 'Reading time'), text('published', 'Publication date', 'date'),
    text('intro', 'Introduction', 'text'),
    { name: 'sections', title: 'Article sections', type: 'array', of: [{ type: 'object', fields: [
      text('heading', 'Heading'), { name: 'paragraphs', title: 'Paragraphs', type: 'array', of: [{ type: 'text' }] },
      { name: 'source', title: 'Source', type: 'object', fields: [text('label', 'Link label'), text('href', 'URL', 'url')] },
    ], preview: { select: { title: 'heading' } } }] },
    { name: 'related', title: 'Related articles', type: 'array', of: [{ type: 'reference', to: [{ type: 'journalPost' }] }] },
  ], preview: { select: { title: 'title', subtitle: 'category' } },
};
