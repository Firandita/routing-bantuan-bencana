<script setup>
import { useToast } from '../composables/useToast'

const { toasts } = useToast()

const toneMap = {
  success: { icon: 'check', classes: 'bg-navy-900 text-white' },
  error: { icon: 'x', classes: 'bg-red-600 text-white' },
  info: { icon: 'wifi', classes: 'bg-brand-700 text-white' },
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed bottom-5 right-5 z-[2000] flex flex-col gap-2 items-end">
      <TransitionGroup name="toast">
        <div
          v-for="t in toasts"
          :key="t.id"
          class="flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-card-hover text-sm font-medium max-w-xs"
          :class="toneMap[t.type]?.classes || toneMap.success.classes"
        >
          <Icon :name="toneMap[t.type]?.icon || 'check'" class="w-4 h-4 shrink-0" />
          <span>{{ t.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style>
.toast-enter-active, .toast-leave-active { transition: all 0.25s ease; }
.toast-enter-from { opacity: 0; transform: translateY(8px); }
.toast-leave-to { opacity: 0; transform: translateX(8px); }
</style>
