<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import L from 'leaflet'
import 'leaflet.markercluster'
import { useReportsStore } from '../stores/reports'

const props = defineProps({
  height: { type: String, default: '70vh' },
  routeCoords: { type: Array, default: null }
})
const emit = defineEmits(['select'])

const store = useReportsStore()
const mapEl = ref(null)
let map, clusterGroup, layerGudang, layerRoute
const showReports = ref(true)
const showGudang = ref(true)

function severityClass(skor) {
  if (skor >= 0.7) return 'danger'
  if (skor >= 0.4) return 'warning'
  return 'success'
}

function severityHex(skor) {
  if (skor >= 0.7) return '#E63946'
  if (skor >= 0.4) return '#F4A261'
  return '#2A9D8F'
}

function clusterIcon(cluster) {
  const markers = cluster.getAllChildMarkers()
  const worst = markers.reduce((acc, m) => Math.max(acc, m.options.skor || 0), 0)
  const cls = severityClass(worst)
  return L.divIcon({
    html: `<div>${cluster.getChildCount()}</div>`,
    className: `marker-cluster marker-cluster-${cls}`,
    iconSize: L.point(40, 40)
  })
}

function buildMarkers() {
  clusterGroup.clearLayers()
  store.reports.forEach(r => {
    const marker = L.circleMarker([r.lat, r.lng], {
      radius: 9,
      color: '#fff',
      weight: 2,
      fillColor: severityHex(r.skor),
      fillOpacity: 0.95,
      skor: r.skor
    }).bindPopup(
      `<div style="font-family:Inter,sans-serif;min-width:160px">
        <p style="font-weight:600;margin:0 0 4px;color:#1D2939">${r.jenis}</p>
        <p style="margin:2px 0;color:#667085;font-size:13px">Jiwa terdampak: <b style="color:#1D2939">${r.jumlah_jiwa}</b></p>
        <p style="margin:2px 0;color:#667085;font-size:13px">Skor urgensi: <b style="color:#1D2939">${r.skor.toFixed(2)}</b></p>
        <p style="margin:2px 0;color:#667085;font-size:13px">Status: <b style="color:#1D2939">${r.status}</b></p>
      </div>`
    )
    marker.on('click', () => emit('select', r))
    clusterGroup.addLayer(marker)
  })
}

function buildGudang() {
  layerGudang.clearLayers()
  store.gudang.forEach(g => {
    L.marker([g.lat, g.lng], {
      icon: L.divIcon({
        className: '',
        html: `<div style="background:#1F4E79;color:#fff;border-radius:8px;padding:4px 8px 4px 6px;font-size:12px;font-weight:600;white-space:nowrap;display:flex;align-items:center;gap:4px;font-family:Inter,sans-serif;box-shadow:0 1px 3px rgba(0,0,0,.25)">
          <span class="msi" style="font-size:16px">warehouse</span>${g.nama}
        </div>`
      })
    }).addTo(layerGudang)
  })
}

function buildRoute() {
  if (layerRoute) layerRoute.remove()
  if (props.routeCoords && props.routeCoords.length) {
    layerRoute = L.polyline(props.routeCoords, { color: '#4A90D9', weight: 5, opacity: 0.9 }).addTo(map)
    map.fitBounds(layerRoute.getBounds(), { padding: [30, 30] })
  }
}

onMounted(() => {
  map = L.map(mapEl.value, { zoomControl: false }).setView([-7.7972, 110.3688], 12)
  L.control.zoom({ position: 'topleft' }).addTo(map)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  clusterGroup = L.markerClusterGroup({
    iconCreateFunction: clusterIcon,
    maxClusterRadius: 50,
    spiderfyOnMaxZoom: true
  }).addTo(map)
  layerGudang = L.layerGroup().addTo(map)

  buildMarkers()
  buildGudang()
  buildRoute()
})

watch(showReports, v => v ? map.addLayer(clusterGroup) : map.removeLayer(clusterGroup))
watch(showGudang, v => v ? map.addLayer(layerGudang) : map.removeLayer(layerGudang))
watch(() => props.routeCoords, buildRoute)

onBeforeUnmount(() => map && map.remove())
</script>

<template>
  <div class="relative w-full rounded-md overflow-hidden border border-black/5" :style="{ height }">
    <div ref="mapEl" class="w-full h-full"></div>

    <div class="absolute top-3 right-3 z-[1000] bg-white/95 rounded-md shadow-md p-3 text-sm space-y-2 min-w-[160px]">
      <p class="font-heading font-semibold text-ink flex items-center gap-1.5">
        <span class="msi" style="font-size:18px">layers</span>Layer
      </p>
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" v-model="showReports" /> Titik bantuan
      </label>
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" v-model="showGudang" /> Gudang logistik
      </label>
      <div class="border-t border-black/5 pt-2 mt-2 space-y-1 text-xs text-muted">
        <p class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-danger inline-block"></span>Urgensi tinggi</p>
        <p class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-warning inline-block"></span>Urgensi sedang</p>
        <p class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-success inline-block"></span>Urgensi rendah</p>
      </div>
    </div>
  </div>
</template>
