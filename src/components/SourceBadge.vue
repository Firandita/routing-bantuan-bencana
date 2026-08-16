<script setup>
defineProps({
  sumber: { type: String, required: true },
})
</script>

<template>
  <span v-if="sumber === 'Internal'" class="badge-internal">
    <Icon name="checkCircle" class="w-3 h-3" /> Data Internal
  </span>
  <span v-else class="badge-sumber">
    <Icon name="wifi" class="w-3 h-3" /> Sumber: {{ sumber }}
  </span>
</template>
