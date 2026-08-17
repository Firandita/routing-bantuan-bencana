<script setup>
defineProps({
  label: String,
  value: [String, Number],
  delta: String,
  icon: String,
  tone: { type: String, default: 'info' }, // aman | proses | darurat | info
})

const toneMap = {
  aman: { bg: 'bg-green-50', text: 'text-green-600', ring: 'ring-green-100' },
  proses: { bg: 'bg-amber-50', text: 'text-amber-600', ring: 'ring-amber-100' },
  darurat: { bg: 'bg-red-50', text: 'text-red-600', ring: 'ring-red-100' },
  info: { bg: 'bg-brand-50', text: 'text-brand-700', ring: 'ring-brand-100' },
}
</script>

<template>
  <div class="card p-5 flex items-start gap-4">
    <div
      class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ring-1"
      :class="[toneMap[tone].bg, toneMap[tone].text, toneMap[tone].ring]"
    >
      <Icon :name="icon" class="w-5 h-5" />
    </div>
    <div class="min-w-0">
      <p class="section-label">{{ label }}</p>
      <p class="font-display font-bold text-2xl text-navy-900 mt-1">{{ value }}</p>
      <p class="text-xs text-slate-400 mt-1 truncate">{{ delta }}</p>
    </div>
  </div>
</template>
