<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MapView from '../components/MapView.vue'
import Icon from '../components/Icon.vue'
import { useReportsStore } from '../stores/reports'

const route = useRoute()
const store = useReportsStore()

const tujuan = computed(() => store.reports.find(r => r.id === Number(route.params.id)) || store.reportsSorted[0])
const asal = computed(() => store.gudang[0])

const routeCoords = computed(() => tujuan.value ? [
  [asal.value.lat, asal.value.lng],
  [tujuan.value.lat, tujuan.value.lng]
] : null)

function haversineKm(a, b) {
  const R = 6371
  const dLat = (b[0] - a[0]) * Math.PI / 180
  const dLng = (b[1] - a[1]) * Math.PI / 180
  const la1 = a[0] * Math.PI / 180
  const la2 = b[0] * Math.PI / 180
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

const jarakKm = computed(() => tujuan.value ? haversineKm(
  [asal.value.lat, asal.value.lng], [tujuan.value.lat, tujuan.value.lng]
) : 0)
const estimasiMenit = computed(() => Math.round((jarakKm.value / 30) * 60))
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
    <MapView height="70vh" :route-coords="routeCoords" />

    <aside class="bg-white rounded-md p-4 shadow-sm space-y-4" v-if="tujuan">
      <div>
        <p class="text-xs text-muted uppercase tracking-wide flex items-center gap-1.5">
          <Icon name="warehouse" :size="16" />Rute dari
        </p>
        <p class="font-heading font-semibold text-ink">{{ asal.nama }}</p>
      </div>
      <div>
        <p class="text-xs text-muted uppercase tracking-wide flex items-center gap-1.5">
          <Icon name="location_on" :size="16" />Menuju
        </p>
        <p class="font-heading font-semibold text-ink">Titik #{{ tujuan.id }} — {{ tujuan.jenis }}</p>
        <p class="text-sm text-muted">{{ tujuan.jumlah_jiwa }} jiwa terdampak</p>
      </div>
      <div class="border-t border-black/5 pt-4 grid grid-cols-2 gap-3">
        <div>
          <p class="text-xs text-muted flex items-center gap-1.5"><Icon name="social_distance" :size="15" />Jarak</p>
          <p class="font-heading font-bold text-lg text-ink">{{ jarakKm.toFixed(1) }} km</p>
        </div>
        <div>
          <p class="text-xs text-muted flex items-center gap-1.5"><Icon name="schedule" :size="15" />Estimasi waktu</p>
          <p class="font-heading font-bold text-lg text-ink">{{ estimasiMenit }} menit</p>
        </div>
      </div>
      <p class="text-xs text-muted border-t border-black/5 pt-3 flex items-start gap-1.5">
        <Icon name="info" :size="15" class="shrink-0 mt-0.5" />
        Simulasi rute garis lurus. Di produksi, jalur ini dihitung dari graph jalan OSM
        dengan Dijkstra/A*, menghindari ruas berstatus rusak/putus.
      </p>
    </aside>
  </div>
</template>
