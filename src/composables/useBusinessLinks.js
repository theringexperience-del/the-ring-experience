import { computed, onMounted, ref } from 'vue';
import { initialContent, fetchContentByType } from '../utils/sanity.js';
export function useBusinessLinks() {
 const settings = ref(initialContent('SITE_APPEARANCE_QUERY')?.contactLinks ?? {});
 onMounted(async () => { const content = await fetchContentByType('SITE_APPEARANCE_QUERY'); if (content?.contactLinks) settings.value = content.contactLinks; });
 return computed(() => settings.value);
}
