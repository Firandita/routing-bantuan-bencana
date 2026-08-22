<script setup>
import { ref } from 'vue'
import { tugasRelawan } from '../../data/dummyData'
import { useToast } from '../../composables/useToast'

const { showToast } = useToast()
const tujuan = ref(tugasRelawan[0])

function mulaiNavigasi() {
  showToast(`Navigasi ke ${tujuan.value.lokasi} dimulai (simulasi)`, 'info')
}
</script>

<template>
  <div>
    <PageHeader title="Rute Aktif" subtitle="Rute yang sedang kamu jalani menuju titik tugas." />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      <div class="card p-5 lg:col-span-2">
        <h3 class="font-display font-bold text-navy-900 mb-4">Rute Menuju {{ tujuan.lokasi }}</h3>
        <LeafletMap :points="[{ ...tujuan, jenis: 'Longsor', nama: tujuan.lokasi, sumber: 'Internal' }]" height="420px" :center="[tujuan.lat, tujuan.lng]" :zoom="13" />
      </div>

      <div class="card p-5 flex flex-col">
        <h3 class="font-display font-bold text-navy-900 mb-3">Ringkasan Rute</h3>
        <div class="space-y-0.5 flex-1">
          <div class="flex justify-between py-2.5 border-b border-slate-100 text-sm">
            <span class="text-slate-500">Asal</span>
            <span class="font-medium text-navy-900">Gudang Logistik Terdekat</span>
          </div>
          <div class="flex justify-between py-2.5 border-b border-slate-100 text-sm">
            <span class="text-slate-500">Tujuan</span>
            <span class="font-medium text-navy-900">{{ tujuan.lokasi }}</span>
          </div>
          <div class="flex justify-between py-2.5 border-b border-slate-100 text-sm">
            <span class="text-slate-500">Jarak</span>
            <span class="font-medium text-navy-900">{{ tujuan.jarak }} km</span>
          </div>
          <div class="flex justify-between py-2.5 border-b border-slate-100 text-sm">
            <span class="text-slate-500">Estimasi Waktu</span>
            <span class="font-medium text-navy-900">±{{ Math.round(tujuan.jarak * 4) }} menit</span>
          </div>
          <div class="flex justify-between py-2.5 text-sm">
            <span class="text-slate-500">Status Ruas Jalan</span>
            <StatusPill status="Lancar" />
          </div>
        </div>
        <button class="btn-primary w-full justify-center mt-4" @click="mulaiNavigasi">
          <Icon name="route" class="w-4 h-4" /> Mulai Navigasi
        </button>
      </div>
    </div>
  </div>
</template>
