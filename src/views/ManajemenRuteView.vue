<script setup>
import { ref } from 'vue'
import { rekomendasiRute, titikBencana } from '../data/dummyData'

const tab = ref('Buat Rute Baru')
const tabs = ['Buat Rute Baru', 'Rute Berjalan', 'Riwayat Rute']

const skenarioTone = {
  'Normal': 'aman',
  'Sebagian tertutup': 'proses',
  'Terputus total': 'darurat',
}
</script>

<template>
  <div>
    <PageHeader
      title="Manajemen Rute"
      subtitle="Rekomendasi rute berbasis Algoritma Dijkstra dengan pembobotan multikriteria sesuai jenis bencana."
    >
      <template #actions>
        <button class="btn-primary"><Icon name="route" class="w-4 h-4" /> Hitung Rute Baru</button>
      </template>
    </PageHeader>

    <div class="flex flex-wrap gap-2 mb-5">
      <button
        v-for="t in tabs"
        :key="t"
        @click="tab = t"
        class="px-4 py-2 rounded-xl text-sm font-medium transition-colors border"
        :class="tab === t ? 'bg-brand-700 text-white border-brand-700 shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:border-brand-200'"
      >
        {{ t }}
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <!-- Form ringkas -->
      <div class="card p-5 lg:col-span-2 h-fit">
        <h3 class="font-display font-bold text-navy-900 mb-4 text-sm">Parameter Rute</h3>
        <div class="space-y-4">
          <div>
            <label class="section-label block mb-1.5">Titik Asal</label>
            <select class="input-field">
              <option>Posko Utama BPBD DIY</option>
              <option>Posko Cabang Kulon Progo</option>
              <option>Posko Cabang Gunungkidul</option>
            </select>
          </div>
          <div>
            <label class="section-label block mb-1.5">Titik Tujuan</label>
            <select class="input-field">
              <option v-for="p in titikBencana" :key="p.id">{{ p.nama }}</option>
            </select>
          </div>
          <div>
            <label class="section-label block mb-1.5">Jenis Bencana</label>
            <div class="flex gap-2">
              <button class="flex-1 rounded-xl border border-orange-200 bg-orange-50 text-orange-700 text-sm font-medium py-2">Longsor</button>
              <button class="flex-1 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium py-2 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700">Banjir</button>
            </div>
          </div>
          <p class="text-xs text-slate-400 leading-relaxed">
            Bobot dihitung dari jarak dasar × faktor koreksi kondisi jalan (material longsoran, ketinggian genangan, kemiringan lereng) mengikuti Tabel 1 kerangka penelitian.
          </p>
          <button class="btn-primary w-full">Cari Rute Optimal</button>
        </div>
      </div>

      <!-- Hasil -->
      <div class="lg:col-span-3 space-y-4">
        <div v-for="r in rekomendasiRute" :key="r.id" class="card p-5">
          <div class="flex items-start justify-between gap-3 mb-3">
            <div>
              <p class="text-xs text-slate-400">{{ r.id }}</p>
              <h4 class="font-display font-bold text-navy-900">{{ r.tujuan }}</h4>
            </div>
            <div class="flex items-center gap-1.5">
              <StatusPill :status="r.jenisBencana" />
              <StatusPill :status="r.skenario" />
            </div>
          </div>
          <p class="text-sm text-slate-600 mb-3">{{ r.rute }}</p>
          <div class="grid grid-cols-3 gap-3 mb-3">
            <div class="rounded-lg bg-slate-50 p-2.5 text-center">
              <p class="text-[10px] text-slate-400 uppercase">Jarak</p>
              <p class="text-sm font-semibold text-navy-900">{{ r.jarak }}</p>
            </div>
            <div class="rounded-lg bg-slate-50 p-2.5 text-center">
              <p class="text-[10px] text-slate-400 uppercase">Estimasi</p>
              <p class="text-sm font-semibold text-navy-900">{{ r.estimasi }}</p>
            </div>
            <div class="rounded-lg bg-slate-50 p-2.5 text-center">
              <p class="text-[10px] text-slate-400 uppercase">Moda</p>
              <p class="text-sm font-semibold text-navy-900 truncate" :title="r.moda">{{ r.moda }}</p>
            </div>
          </div>
          <p class="text-xs text-slate-500 bg-brand-50/60 rounded-lg p-2.5 border border-brand-100">{{ r.catatan }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
