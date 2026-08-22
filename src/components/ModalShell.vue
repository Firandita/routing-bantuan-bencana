<script setup>
defineProps({
  title: String,
  subtitle: String,
  maxWidth: { type: String, default: 'max-w-md' },
})
defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-navy-950/40 backdrop-blur-sm" @click="$emit('close')" />
      <div class="relative w-full bg-white/90 backdrop-blur-xl rounded-2xl shadow-card-hover border border-white/80 p-6 max-h-[90vh] overflow-y-auto" :class="maxWidth">
        <div class="flex items-start justify-between mb-4 gap-3">
          <div class="min-w-0">
            <h3 class="font-display font-bold text-lg text-navy-900">{{ title }}</h3>
            <p v-if="subtitle" class="text-xs text-slate-500 mt-1">{{ subtitle }}</p>
          </div>
          <button @click="$emit('close')" class="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center shrink-0">
            <Icon name="x" class="w-4 h-4" />
          </button>
        </div>
        <slot />
      </div>
    </div>
  </Teleport>
</template>
