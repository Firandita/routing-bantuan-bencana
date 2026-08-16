<script setup>
defineProps({
  title: String,
  subtitle: String,
})
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
    <div>
      <h2 class="page-title">{{ title }}</h2>
      <p v-if="subtitle" class="text-sm text-slate-500 mt-1 max-w-2xl">{{ subtitle }}</p>
    </div>
    <div class="flex items-center gap-2 shrink-0">
      <slot name="actions" />
    </div>
  </div>
</template>
