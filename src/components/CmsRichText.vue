<template>
  <div>
    <p v-for="block in blocks || []" :key="block._key" class="cms-paragraph">
      <template v-for="span in block.children || []" :key="span._key">
        <component :is="link(block, span) ? 'a' : 'span'" :href="link(block, span) || undefined"
          :class="{ 'underline underline-offset-4': link(block, span), 'font-bold': span.marks?.includes('strong'), italic: span.marks?.includes('em') }">{{ span.text }}</component>
      </template>
    </p>
  </div>
</template>
<script setup>
defineProps({ blocks: Array });
const link = (block, span) => {
  const href = block.markDefs?.find(mark => span.marks?.includes(mark._key) && mark._type === 'link')?.href;
  return typeof href === 'string' && /^(\/|#|https:\/\/|mailto:|tel:)/.test(href) ? href : null;
};
</script>
<style scoped>
.cms-paragraph + .cms-paragraph { margin-top: 1rem; }
</style>
