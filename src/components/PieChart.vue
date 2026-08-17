<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: { type: Array, required: true }, // [{ label, value, color }]
  size: { type: Number, default: 140 },
  thickness: { type: Number, default: 18 },
})

const total = computed(() => props.data.reduce((a, d) => a + d.value, 0))
const radius = computed(() => (props.size - props.thickness) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)

const segments = computed(() => {
  let offset = 0
  return props.data.map((d) => {
    const fraction = total.value === 0 ? 0 : d.value / total.value
    const length = fraction * circumference.value
    const seg = { ...d, length, offset, fraction }
    offset += length
    return seg
  })
})
</script>

<template>
  <div class="flex items-center gap-5">
    <div class="relative shrink-0" :style="{ width: size + 'px', height: size + 'px' }">
      <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" class="-rotate-90">
        <circle
          :cx="size / 2"
          :cy="size / 2"
          :r="radius"
          fill="none"
          stroke="#EEF2FB"
          :stroke-width="thickness"
        />
        <circle
          v-for="(s, i) in segments"
          :key="i"
          :cx="size / 2"
          :cy="size / 2"
          :r="radius"
          fill="none"
          :stroke="s.color"
          :stroke-width="thickness"
          stroke-linecap="round"
          :stroke-dasharray="`${s.length} ${circumference - s.length}`"
          :stroke-dashoffset="-s.offset"
          style="transition: stroke-dasharray 0.4s ease"
        />
      </svg>
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <p class="font-display font-bold text-xl text-navy-900 leading-none">{{ total }}</p>
        <p class="text-[10px] text-slate-400 mt-1">Total Laporan</p>
      </div>
    </div>

    <div class="flex-1 space-y-2.5 min-w-0">
      <div v-for="(d, i) in data" :key="i" class="flex items-center gap-2 text-sm">
        <span class="w-2.5 h-2.5 rounded-full shrink-0" :style="{ background: d.color }" />
        <span class="text-slate-600 truncate flex-1">{{ d.label }}</span>
        <span class="font-semibold text-navy-900">{{ d.value }}</span>
      </div>
    </div>
  </div>
</template>
