<script setup>
import { ref, computed } from 'vue'
import { useReportsStore } from '../stores/reports'
import Icon from '../components/Icon.vue'

const store = useReportsStore()
const filter = ref('semua')

const filtered = computed(() => {
  if (filter.value === 'semua') return store.reportsSorted
  return store.reportsSorted.filter(r => r.status === filter.value)
})

const badge = {
  baru: 'bg-secondary/10 text-secondary',
  diverifikasi: 'bg-warning/15 text-warning',
  diproses: 'bg-primary/10 text-primary',
  selesai: 'bg-success/15 text-success'
}

const stats = computed(() => [
  { icon: 'location_on', label: 'Titik aktif', value: store.totalAktif },
  { icon: 'groups', label: 'Total jiwa', value: store.totalJiwa },
  { icon: 'warehouse', label: 'Gudang logistik', value: store.gudang.length },
  { icon: 'priority_high', label: 'Skor tertinggi', value: store.reportsSorted[0]?.skor.toFixed(2), danger: true }
])
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <h1 class="font-heading font-bold text-2xl text-ink flex items-center gap-2">
        <Icon name="dashboard" :size="26" class="text-primary" />Dashboard posko / admin
      </h1>
      <select v-model="filter" class="border border-black/10 rounded-md px-3 py-2 text-sm">
        <option value="semua">Semua status</option>
        <option value="baru">Baru</option>
        <option value="diverifikasi">Terverifikasi</option>
        <option value="diproses">Diproses</option>
        <option value="selesai">Selesai</option>
      </select>
    </div>

    <div class="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div v-for="s in stats" :key="s.label" class="bg-white rounded-md p-4 shadow-sm">
        <p class="text-xs text-muted flex items-center gap-1.5">
          <Icon :name="s.icon" :size="16" />{{ s.label }}
        </p>
        <p class="font-heading font-bold text-xl mt-1" :class="s.danger ? 'text-danger' : 'text-ink'">{{ s.value }}</p>
      </div>
    </div>

    <div class="mt-4 bg-white rounded-md shadow-sm overflow-x-auto">
      <table class="w-full text-sm min-w-[640px]">
        <thead>
          <tr class="text-left text-muted border-b border-black/5">
            <th class="px-4 py-3">Jenis</th>
            <th class="px-4 py-3">Jiwa</th>
            <th class="px-4 py-3">Skor urgensi</th>
            <th class="px-4 py-3">Status</th>
            <th class="px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, i) in filtered" :key="r.id" :class="i % 2 ? 'bg-bg' : 'bg-white'">
            <td class="px-4 py-3 font-medium text-ink">{{ r.jenis }}</td>
            <td class="px-4 py-3">{{ r.jumlah_jiwa }}</td>
            <td class="px-4 py-3 tabular-nums">{{ r.skor.toFixed(2) }}</td>
            <td class="px-4 py-3">
              <span class="text-xs font-medium rounded-full px-2 py-1" :class="badge[r.status]">{{ r.status }}</span>
            </td>
            <td class="px-4 py-3 space-x-3">
              <button v-if="r.status !== 'diproses' && r.status !== 'selesai'"
                @click="store.updateStatus(r.id, 'diproses')"
                class="text-xs text-secondary font-medium hover:underline inline-flex items-center gap-1">
                <Icon name="play_arrow" :size="14" />Proses
              </button>
              <button v-if="r.status !== 'selesai'"
                @click="store.updateStatus(r.id, 'selesai')"
                class="text-xs text-success font-medium hover:underline inline-flex items-center gap-1">
                <Icon name="check" :size="14" />Selesai
              </button>
              <router-link :to="`/rute/${r.id}`" class="text-xs text-primary font-medium hover:underline inline-flex items-center gap-1">
                <Icon name="route" :size="14" />Rute
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
