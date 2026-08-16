<script setup>
import { ref } from 'vue'
import { useReportsStore } from '../stores/reports'
import Icon from '../components/Icon.vue'

const store = useReportsStore()
const id = ref('')
const result = ref(null)
const searched = ref(false)

const statusLabel = {
  baru: 'Laporan diterima, menunggu verifikasi',
  diverifikasi: 'Terverifikasi, menunggu penanganan',
  diproses: 'Sedang diproses tim lapangan',
  selesai: 'Selesai ditangani'
}

function cari() {
  searched.value = true
  result.value = store.reports.find(r => r.id === Number(id.value)) || null
}
</script>

<template>
  <div class="max-w-md mx-auto px-4 py-10">
    <h1 class="font-heading font-bold text-2xl text-ink flex items-center gap-2">
      <Icon name="fact_check" :size="26" class="text-primary" />Cek status laporan
    </h1>
    <p class="text-sm text-muted mt-1">Masukkan ID laporan yang kamu terima saat lapor.</p>

    <form class="mt-5 flex gap-2" @submit.prevent="cari">
      <input v-model="id" type="number" placeholder="mis. 1"
        class="flex-1 border border-black/10 rounded-md px-3 py-2 text-sm" />
      <button type="submit" class="flex items-center gap-1.5 bg-primary text-white text-sm font-medium rounded-md px-4 py-2 hover:bg-primary/90">
        <Icon name="search" :size="18" />Cek
      </button>
    </form>

    <div v-if="searched" class="mt-5">
      <div v-if="result" class="bg-white rounded-md shadow-sm p-4 space-y-2">
        <p class="text-xs text-muted">Laporan #{{ result.id }}</p>
        <p class="font-heading font-semibold text-ink">{{ statusLabel[result.status] }}</p>
        <p class="text-sm text-muted">{{ result.jenis }} · {{ result.jumlah_jiwa }} jiwa</p>
      </div>
      <div v-else class="bg-danger/10 text-danger text-sm rounded-md p-4 flex items-center gap-1.5">
        <Icon name="error" :size="18" />ID laporan tidak ditemukan.
      </div>
    </div>
  </div>
</template>
