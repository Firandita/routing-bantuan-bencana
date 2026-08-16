<script setup>
import { computed } from 'vue'

const props = defineProps({
  labels: { type: Array, required: true },
  series: { type: Array, required: true }, // [{ name, color, data: [] }]
  height: { type: Number, default: 220 },
})

const W = 640
const H = props.height
const padL = 28
const padB = 24
const padT = 16
const padR = 8

const maxVal = computed(() => {
  const all = props.series.flatMap((s) => s.data)
  return Math.max(...all) * 1.15
})

const stepX = computed(() => (W - padL - padR) / (props.labels.length - 1))

function points(data) {
  return data
    .map((v, i) => {
      const x = padL + i * stepX.value
      const y = H - padB - (v / maxVal.value) * (H - padB - padT)
      return `${x},${y}`
    })
    .join(' ')
}

function areaPoints(data) {
  const line = points(data)
  const lastX = padL + (data.length - 1) * stepX.value
  return `${padL},${H - padB} ${line} ${lastX},${H - padB}`
}

const gridLines = computed(() => {
  const n = 4
  return Array.from({ length: n + 1 }, (_, i) => {
    const y = padT + (i * (H - padB - padT)) / n
    const val = Math.round(maxVal.value - (i * maxVal.value) / n)
    return { y, val }
  })
})
</script>

<template>
  <div class="w-full">
    <svg :viewBox="`0 0 ${W} ${H}`" class="w-full" :style="{ height: height + 'px' }" preserveAspectRatio="none">
      <!-- grid -->
      <g v-for="(g, i) in gridLines" :key="i">
        <line :x1="padL" :x2="W - padR" :y1="g.y" :y2="g.y" stroke="#EEF2FB" stroke-width="1" />
        <text :x="0" :y="g.y + 3" font-size="9" fill="#94A3B8">{{ g.val }}</text>
      </g>

      <!-- areas + lines -->
      <template v-for="(s, i) in series" :key="s.name">
        <polygon :points="areaPoints(s.data)" :fill="s.color" opacity="0.08" />
        <polyline :points="points(s.data)" fill="none" :stroke="s.color" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        <circle
          v-for="(v, j) in s.data"
          :key="j"
          :cx="padL + j * stepX"
          :cy="H - padB - (v / maxVal) * (H - padB - padT)"
          r="3"
          :fill="s.color"
        />
      </template>

      <!-- x labels -->
      <text
        v-for="(l, i) in labels"
        :key="l"
        :x="padL + i * stepX"
        :y="H - 6"
        font-size="9"
        fill="#94A3B8"
        text-anchor="middle"
      >{{ l }}</text>
    </svg>

    <div class="flex items-center gap-4 mt-2 flex-wrap">
      <div v-for="s in series" :key="s.name" class="flex items-center gap-1.5 text-xs text-slate-500">
        <span class="w-2.5 h-2.5 rounded-full" :style="{ background: s.color }" />
        {{ s.name }}
      </div>
    </div>
  </div>
</template>
