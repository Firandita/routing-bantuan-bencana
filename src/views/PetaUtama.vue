<script setup>
import { ref } from 'vue'
import MapView from '../components/MapView.vue'
import Icon from '../components/Icon.vue'
import { useReportsStore } from '../stores/reports'

const store = useReportsStore()
const selected = ref(null)

const statusLabel = {
  baru: 'Baru masuk',
  diverifikasi: 'Terverifikasi',
  diproses: 'Sedang diproses',
  selesai: 'Selesai ditangani'
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-4 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
    <MapView height="75vh" @select="r => selected = r" />

    <aside class="space-y-4">
      <div class="bg-white rounded-md p-4 shadow-sm">
        <p class="text-xs text-muted uppercase tracking-wide flex items-center gap-1.5">
          <Icon name="query_stats" :size="16" />Ringkasan
        </p>
        <p class="font-heading font-bold text-2xl text-ink mt-1">{{ store.totalAktif }} titik aktif</p>
        <p class="text-sm text-muted">{{ store.totalJiwa }} jiwa terdampak tercatat</p>
      </div>

      <div class="bg-white rounded-md p-4 shadow-sm min-h-[200px]">
        <p class="text-xs text-muted uppercase tracking-wide mb-2 flex items-center gap-1.5">
          <Icon name="location_on" :size="16" />Titik terpilih
        </p>
        <template v-if="selected">
          <p class="font-heading font-semibold text-ink">{{ selected.jenis }}</p>
          <ul class="text-sm text-muted mt-2 space-y-1">
            <li>Jumlah jiwa: <span class="text-ink font-medium">{{ selected.jumlah_jiwa }}</span></li>
            <li>Skor urgensi: <span class="text-ink font-medium">{{ selected.skor.toFixed(2) }}</span></li>
            <li>Status: <span class="text-ink font-medium">{{ statusLabel[selected.status] }}</span></li>
          </ul>
          <router-link
            :to="`/rute/${selected.id}`"
            class="mt-4 inline-flex items-center gap-1.5 bg-primary text-white text-sm font-medium rounded-md px-4 py-2 hover:bg-primary/90"
          ><Icon name="route" :size="18" />Lihat rute ke titik ini</router-link>
        </template>
        <p v-else class="text-sm text-muted">Klik salah satu titik di peta untuk lihat detail.</p>
      </div>
    </aside>
  </div>
</template>
