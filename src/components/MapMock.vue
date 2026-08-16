<script setup>
defineProps({
  points: { type: Array, default: () => [] },
  height: { type: String, default: '360px' },
})

const jenisColor = {
  Longsor: '#EA580C',
  Banjir: '#0284C7',
}
</script>

<template>
  <div
    class="relative w-full rounded-2xl overflow-hidden ring-1 ring-slate-200"
    :style="{ height }"
  >
    <!-- terrain-like backdrop -->
    <div class="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-brand-100" />
    <svg class="absolute inset-0 w-full h-full opacity-[0.35]" preserveAspectRatio="none">
      <defs>
        <pattern id="contour" width="80" height="80" patternUnits="userSpaceOnUse">
          <circle cx="40" cy="40" r="30" fill="none" stroke="#AFC9F2" stroke-width="1" />
          <circle cx="40" cy="40" r="14" fill="none" stroke="#AFC9F2" stroke-width="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#contour)" />
    </svg>

    <!-- markers -->
    <div
      v-for="p in points"
      :key="p.id"
      class="absolute -translate-x-1/2 -translate-y-full group"
      :style="{ left: p.x + '%', top: p.y + '%' }"
    >
      <div class="relative flex flex-col items-center cursor-pointer">
        <div
          class="w-7 h-7 rounded-full flex items-center justify-center text-white shadow-md ring-2 ring-white transition-transform group-hover:scale-110"
          :style="{ background: jenisColor[p.jenis] || '#64748B' }"
        >
          <Icon name="mapPin" class="w-3.5 h-3.5" />
        </div>
        <div class="w-1.5 h-1.5 rounded-full bg-navy-900/30 -mt-0.5" />

        <!-- tooltip -->
        <div class="absolute bottom-full mb-2 hidden group-hover:block w-48 bg-white rounded-xl shadow-card-hover ring-1 ring-slate-100 p-3 text-left z-10">
          <p class="text-xs font-semibold text-navy-900">{{ p.nama }}</p>
          <div class="flex items-center gap-1.5 mt-1">
            <StatusPill :status="p.jenis" />
            <StatusPill v-if="p.urgensi" :status="p.urgensi" />
          </div>
          <p class="text-[10px] text-slate-400 mt-1.5">Sumber: {{ p.sumber }}</p>
        </div>
      </div>
    </div>

    <!-- legend -->
    <div class="absolute bottom-3 left-3 bg-white/90 backdrop-blur rounded-xl px-3 py-2 shadow-sm ring-1 ring-slate-100 flex items-center gap-3 text-[11px] text-slate-600">
      <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-orange-600" />Longsor</div>
      <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-sky-600" />Banjir</div>
    </div>

    <div class="absolute top-3 right-3 badge-sumber bg-white/90 backdrop-blur">
      Peta ilustratif — siap disambungkan ke Leaflet.js
    </div>
  </div>
</template>
