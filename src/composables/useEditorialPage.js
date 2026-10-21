import { ref, computed, onMounted } from 'vue';
import { fetchContentByType, initialContent } from '../utils/sanity.js';
export function useEditorialPage(path) {
  const pages = ref(initialContent('EDITORIAL_PAGES_QUERY') ?? []);
  onMounted(async () => { const latest = await fetchContentByType('EDITORIAL_PAGES_QUERY'); if (Array.isArray(latest)) pages.value = latest; });
  const page = computed(() => pages.value.find(page => page.path === path));
  const section = key => page.value?.sections?.find(section => section.key === key) ?? { body: [], links: [] };
  return { page, section };
}
