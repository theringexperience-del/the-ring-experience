<template>
  <a v-if="enabled" href="https://www.google.com/preferences/source?q=theringexperience.lk"
    target="_blank" rel="noopener noreferrer"
    class="ui-button ui-button-outline inline-flex min-h-12 items-center justify-center px-5 py-3">
    Add as Preferred Source on Google <span class="ml-3" aria-hidden="true">↗</span>
  </a>
</template>
<script setup>
// Activate after confirming the domain appears in Google's source preferences tool.
const enabled = import.meta.env.VITE_GOOGLE_PREFERRED_SOURCE_ENABLED === 'true'
</script>
