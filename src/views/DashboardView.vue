<script setup>
import { ringkasanStats, statusIntegrasi, trenBencana, titikBencana, notifikasiTerbaru, laporanBantuan } from '../data/dummyData'

const trenSeries = [
  { name: 'Longsor', color: '#EA580C', data: trenBencana.longsor },
  { name: 'Banjir', color: '#0284C7', data: trenBencana.banjir },
]
</script>

<template>
  <div>
    <!-- Stat cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
      <StatCard v-for="s in ringkasanStats" :key="s.label" v-bind="s" />
    </div>

    <!-- Status integrasi -->
    <div class="card p-5 mb-6">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="font-display font-bold text-navy-900">Status Integrasi Data</h3>
          <p class="text-xs text-slate-400 mt-0.5">Koneksi sistem ke platform pemerintah eksisting</p>
        </div>
        <RouterLink to="/integrasi-sumber-data" class="text-xs font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1">
          Kelola <Icon name="chevronRight" class="w-3.5 h-3.5" />
        </RouterLink>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <div v-for="s in statusIntegrasi" :key="s.sumber" class="rounded-xl border border-slate-100 p-3.5 bg-slate-50/60">
          <div class="flex items-center justify-between mb-2">
            <p class="text-sm font-semibold text-navy-900">{{ s.sumber }}</p>
            <StatusPill :status="s.status" />
          </div>
          <p class="text-xs text-slate-500">{{ s.keterangan }}</p>
          <p class="text-[11px] text-slate-400 mt-1">Update: {{ s.updateTerakhir }}</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-5 gap-6 mb-6">
      <!-- Trend chart -->
      <div class="card p-5 xl:col-span-2">
        <h3 class="font-display font-bold text-navy-900 mb-1">Tren Kejadian per Bulan</h3>
        <p class="text-xs text-slate-400 mb-4">Longsor mendominasi awal tahun, sejalan data BPBD DIY</p>
        <LineChart :labels="trenBencana.bulan" :series="trenSeries" />
      </div>

      <!-- Map -->
      <div class="card p-5 xl:col-span-3">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="font-display font-bold text-navy-900">Peta Sebaran Titik Bencana</h3>
            <p class="text-xs text-slate-400 mt-0.5">Klik titik untuk detail singkat</p>
          </div>
          <span class="badge-sumber">Sumber: InaRISK</span>
        </div>
        <MapMock :points="titikBencana" height="260px" />
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-5 gap-6">
      <!-- Notifikasi -->
      <div class="card p-5 xl:col-span-2">
        <h3 class="font-display font-bold text-navy-900 mb-4">Notifikasi Terbaru</h3>
        <div class="space-y-3">
          <div v-for="n in notifikasiTerbaru" :key="n.id" class="flex gap-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
            <div class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              :class="n.jenis === 'Longsor' ? 'bg-orange-50 text-orange-600' : 'bg-sky-50 text-sky-600'">
              <Icon name="alertTriangle" class="w-4 h-4" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium text-navy-900 leading-tight">{{ n.judul }}</p>
              <p class="text-xs text-slate-400 mt-0.5">{{ n.lokasi }} · {{ n.waktu }}</p>
              <SourceBadge :sumber="n.sumber" class="mt-1.5" />
            </div>
          </div>
        </div>
      </div>

      <!-- Laporan table -->
      <div class="card p-5 xl:col-span-3">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-display font-bold text-navy-900">Daftar Laporan Bantuan</h3>
          <RouterLink to="/manajemen-laporan" class="text-xs font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1">
            Lebih lengkap <Icon name="chevronRight" class="w-3.5 h-3.5" />
          </RouterLink>
        </div>
        <div class="overflow-x-auto -mx-1">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-[11px] uppercase tracking-wide text-slate-400 border-b border-slate-100">
                <th class="px-1 py-2 font-medium">Nama Bencana</th>
                <th class="px-1 py-2 font-medium">Penerima</th>
                <th class="px-1 py-2 font-medium">Jarak</th>
                <th class="px-1 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="l in laporanBantuan.slice(0, 5)" :key="l.id" class="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
                <td class="px-1 py-2.5">
                  <p class="font-medium text-navy-900">{{ l.nama }}</p>
                  <p class="text-xs text-slate-400">{{ l.id }}</p>
                </td>
                <td class="px-1 py-2.5 text-slate-600">{{ l.penerima }}</td>
                <td class="px-1 py-2.5 text-slate-600">{{ l.jarak }} km</td>
                <td class="px-1 py-2.5"><StatusPill :status="l.status" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
