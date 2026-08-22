<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  origin: { type: Object, default: null }, // { lat, lng, nama }
  destination: { type: Object, default: null }, // { lat, lng, nama }
  routes: { type: Array, default: () => [] }, // RouteCandidate[]
  selectedId: { type: String, default: '' },
  height: { type: String, default: '420px' },
})
const emit = defineEmits(['select-route'])

const mapEl = ref(null)
let map = null
let layer = null

function endpointIcon(color, iconSvgPath) {
  return L.divIcon({
    className: '',
    html: `<div style="width:34px;height:34px;border-radius:50%;background:${color};box-shadow:0 2px 8px rgba(11,23,48,.4);border:3px solid white;display:flex;align-items:center;justify-content:center;">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${iconSvgPath}</svg>
           </div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -17],
  })
}

const originIconPath = '<path d="M3 9.5 12 4l9 5.5V20H3z"/><path d="M9 20v-6h6v6"/>'
const destIconPath = '<path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.3"/>'

function render() {
  if (!map) return
  if (layer) layer.clearLayers()
  else layer = L.layerGroup().addTo(map)

  const boundsPts = []

  if (props.origin) {
    L.marker([props.origin.lat, props.origin.lng], { icon: endpointIcon('#0B1730', originIconPath) })
      .bindPopup(`<b>${props.origin.nama}</b><br/><span style="font-size:11px;color:#64748B;">Posko Asal</span>`)
      .addTo(layer)
    boundsPts.push([props.origin.lat, props.origin.lng])
  }
  if (props.destination) {
    L.marker([props.destination.lat, props.destination.lng], { icon: endpointIcon('#DC2626', destIconPath) })
      .bindPopup(`<b>${props.destination.nama}</b><br/><span style="font-size:11px;color:#64748B;">Titik Bencana</span>`)
      .addTo(layer)
    boundsPts.push([props.destination.lat, props.destination.lng])
  }

  // Render non-selected routes first, selected route last (drawn on top)
  const sorted = [...props.routes].sort((a, b) => (a.id === props.selectedId ? 1 : b.id === props.selectedId ? -1 : 0))

  sorted.forEach((r) => {
    const isSelected = r.id === props.selectedId
    const line = L.polyline(r.waypoints, {
      color: r.color,
      weight: isSelected ? 6 : 3.5,
      opacity: isSelected ? 0.95 : 0.55,
      dashArray: r.dashed ? '2,10' : isSelected ? null : '6,6',
      lineCap: 'round',
      lineJoin: 'round',
    })
    line.bindPopup(
      `<div style="font-family:'Inter',sans-serif;min-width:160px;">
         <p style="margin:0 0 3px 0;font-weight:700;font-size:12.5px;color:#0B1730;">${r.label}</p>
         <p style="margin:0 0 2px 0;font-size:11px;color:${r.color};font-weight:600;">${r.moda} · ${r.jarakKm} km</p>
         <p style="margin:0;font-size:10.5px;color:#94A3B8;">${r.status}</p>
       </div>`
    )
    line.on('click', () => emit('select-route', r.id))
    line.addTo(layer)
    r.waypoints.forEach((p) => boundsPts.push(p))
  })

  if (boundsPts.length) {
    map.fitBounds(L.latLngBounds(boundsPts), { padding: [36, 36] })
  }
}

onMounted(() => {
  map = L.map(mapEl.value, {
    center: [-7.7972, 110.3688],
    zoom: 10,
    scrollWheelZoom: false,
    attributionControl: false,
  })
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map)
  L.control.attribution({ prefix: false, position: 'bottomright' }).addAttribution('© OpenStreetMap contributors').addTo(map)

  render()
  nextTick(() => setTimeout(() => map.invalidateSize(), 60))
})

watch(() => [props.routes, props.selectedId, props.origin, props.destination], render, { deep: true })

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
  </div>
</template>

<style>
.leaflet-popup-content-wrapper { border-radius: 12px; }
.leaflet-container { font-family: 'Inter', sans-serif; background: #eef2fb; }
</style>
