import { ref } from 'vue';
import { fetchContentByType, initialContent } from '../utils/sanity.js';
export const journalPosts = ref(initialContent('JOURNAL_POSTS_QUERY') ?? []);
let request;
export function loadJournal() {
  if (typeof window === 'undefined') return Promise.resolve(journalPosts.value);
  return request ??= fetchContentByType('JOURNAL_POSTS_QUERY').then(posts => {
    if (Array.isArray(posts)) journalPosts.value = posts;
    return journalPosts.value;
  });
}
export const getJournalPost = slug => journalPosts.value.find(post => post.slug === slug);
