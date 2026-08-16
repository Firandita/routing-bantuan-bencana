<script setup>
import { zonaTerdampak } from '../data/dummyData'

const klasifikasiTone = { Berat: 'darurat', Sedang: 'proses', Ringan: 'aman' }
</script>

<template>
  <div>
    <PageHeader
      title="Zona Terdampak"
      subtitle="Klasifikasi kerusakan wilayah dan pembanding citra InaRISK sebagai baseline sebelum-sesudah."
    >
      <template #actions>
        <button class="btn-primary"><Icon name="upload" class="w-4 h-4" /> Unggah Data Analisis</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
      <div class="card p-5">
        <p class="section-label mb-1">Total Zona Terdampak</p>
        <p class="font-display font-bold text-2xl text-navy-900">{{ zonaTerdampak.length }} wilayah</p>
      </div>
      <div class="card p-5">
        <p class="section-label mb-1">Klasifikasi Berat</p>
        <p class="font-display font-bold text-2xl text-red-600">{{ zonaTerdampak.filter(z => z.klasifikasi === 'Berat').length }} wilayah</p>
      </div>
      <div class="card p-5">
        <p class="section-label mb-1">Total Luas Terdampak</p>
        <p class="font-display font-bold text-2xl text-navy-900">{{ zonaTerdampak.reduce((a, z) => a + z.luasHa, 0).toFixed(1) }} Ha</p>
      </div>
    </div>

    <div class="card p-5 mb-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-display font-bold text-navy-900 text-sm">Pembanding Kondisi Sebelum–Sesudah</h3>
        <span class="badge-sumber">Sumber: InaRISK (baseline)</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="rounded-xl overflow-hidden ring-1 ring-slate-200">
          <div class="bg-slate-100 h-40 flex items-center justify-center text-slate-400 text-xs gap-2">
            <Icon name="layers" class="w-5 h-5" /> Citra baseline (sebelum)
          </div>
          <div class="px-3 py-2 text-xs text-slate-500 bg-white">Citra InaRISK — kondisi normal</div>
        </div>
        <div class="rounded-xl overflow-hidden ring-1 ring-slate-200">
          <div class="bg-orange-50 h-40 flex items-center justify-center text-orange-400 text-xs gap-2">
            <Icon name="alertTriangle" class="w-5 h-5" /> Citra UAV (sesudah)
          </div>
          <div class="px-3 py-2 text-xs text-slate-500 bg-white">Citra UAV pascabencana — menunggu unggahan tim lapangan</div>
        </div>
      </div>
    </div>

    <div class="card overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-[11px] uppercase tracking-wide text-slate-400 border-b border-slate-100 bg-slate-50/60">
            <th class="px-4 py-3 font-medium">Wilayah</th>
            <th class="px-4 py-3 font-medium">Jenis</th>
            <th class="px-4 py-3 font-medium">Klasifikasi</th>
            <th class="px-4 py-3 font-medium">Luas (Ha)</th>
            <th class="px-4 py-3 font-medium">Sumber</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(z, i) in zonaTerdampak" :key="i" class="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
            <td class="px-4 py-3 font-medium text-navy-900">{{ z.wilayah }}</td>
            <td class="px-4 py-3"><StatusPill :status="z.jenis" /></td>
            <td class="px-4 py-3"><StatusPill :status="z.klasifikasi" /></td>
            <td class="px-4 py-3 text-slate-600">{{ z.luasHa }}</td>
            <td class="px-4 py-3"><SourceBadge :sumber="z.sumber" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
