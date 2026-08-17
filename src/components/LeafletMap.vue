<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  points: { type: Array, default: () => [] },
  height: { type: String, default: '360px' },
  center: { type: Array, default: () => [-7.7972, 110.3688] }, // Yogyakarta
  zoom: { type: Number, default: 10 },
})

const mapEl = ref(null)
let map = null
let markersLayer = null

const jenisColor = {
  Longsor: '#EA580C',
  Banjir: '#0284C7',
}

// SVG path per jenis bencana (sinkron dengan Icon.vue)
const jenisPath = {
  Longsor: '<path d="M2 20 9 6l3.5 6.5L15 8l7 12H2Zm5-3 2.2-3.8M14.5 17l1.3-2.2" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  Banjir: '<path d="M12 3c3.5 4 7 8.2 7 12a7 7 0 1 1-14 0c0-3.8 3.5-8 7-12Z" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
}

function buildIcon(jenis) {
  const color = jenisColor[jenis] || '#64748B'
  const path = jenisPath[jenis] || ''
  return L.divIcon({
    className: '',
    html: `<div style="width:30px;height:30px;border-radius:50% 50% 50% 0;background:${color};transform:rotate(-45deg);box-shadow:0 2px 6px rgba(11,23,48,.35);border:2.5px solid white;display:flex;align-items:center;justify-content:center;">
             <svg width="15" height="15" viewBox="0 0 24 24" style="transform:rotate(45deg);">${path}</svg>
           </div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
  })
}

function renderMarkers() {
  if (!map) return
  if (markersLayer) markersLayer.clearLayers()
  else markersLayer = L.layerGroup().addTo(map)

  props.points.forEach((p) => {
    if (typeof p.lat !== 'number' || typeof p.lng !== 'number') return
    const marker = L.marker([p.lat, p.lng], { icon: buildIcon(p.jenis) })
    marker.bindPopup(
      `<div style="font-family:'Inter',sans-serif;min-width:170px;">
         <p style="margin:0 0 4px 0;font-weight:700;font-size:12.5px;color:#0B1730;">${p.nama}</p>
         <p style="margin:0 0 2px 0;font-size:11px;color:${jenisColor[p.jenis] || '#64748B'};font-weight:600;">${p.jenis}${p.urgensi ? ' · Urgensi ' + p.urgensi : ''}</p>
         <p style="margin:0;font-size:10.5px;color:#94A3B8;">Sumber: ${p.sumber || '—'}</p>
       </div>`
    )
    marker.addTo(markersLayer)
  })
}

onMounted(() => {
  map = L.map(mapEl.value, {
    center: props.center,
    zoom: props.zoom,
    scrollWheelZoom: false,
    attributionControl: false,
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map)

  L.control.attribution({ prefix: false, position: 'bottomright' })
    .addAttribution('© OpenStreetMap contributors')
    .addTo(map)

  renderMarkers()

  // pastikan tile ter-render penuh setelah container dapat ukuran final (mis. dari grid stretch)
  nextTick(() => setTimeout(() => map.invalidateSize(), 60))
})

watch(() => props.points, renderMarkers, { deep: true })

onBeforeUnmount(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<template>
  <div class="relative w-full rounded-2xl overflow-hidden ring-1 ring-slate-200" :style="{ height }">
    <div ref="mapEl" class="w-full h-full" />

    <!-- legend -->
    <div class="absolute bottom-3 left-3 bg-white/90 backdrop-blur rounded-xl px-3 py-2 shadow-sm ring-1 ring-slate-100 flex items-center gap-3 text-[11px] text-slate-600 z-[1000]">
      <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-orange-600" />Longsor</div>
      <div class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-sky-600" />Banjir</div>
    </div>
  </div>
</template>

<style>
.leaflet-popup-content-wrapper {
  border-radius: 12px;
}
.leaflet-container {
  font-family: 'Inter', sans-serif;
  background: #eef2fb;
}
</style>
