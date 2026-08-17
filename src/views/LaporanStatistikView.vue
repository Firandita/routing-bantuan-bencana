<script setup>
import { rekapWilayah, trenBencana } from '../data/dummyData'

const trenSeries = [
  { name: 'Longsor', color: '#EA580C', data: trenBencana.bulanan.longsor },
  { name: 'Banjir', color: '#0284C7', data: trenBencana.bulanan.banjir },
]

function pct(a, b) {
  return b === 0 ? 0 : Math.round((a / b) * 100)
}
</script>

<template>
  <div>
    <PageHeader title="Laporan & Statistik" subtitle="Rekap per wilayah dan data pembanding historis dari DIBI-BNPB.">
      <template #actions>
        <button class="btn-primary"><Icon name="download" class="w-4 h-4" /> Ekspor Data</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
      <div class="card p-5 lg:col-span-2">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-display font-bold text-navy-900 text-sm">Tren Kejadian (Pembanding DIBI-BNPB)</h3>
          <span class="badge-sumber">Sumber: DIBI-BNPB</span>
        </div>
        <LineChart :labels="trenBencana.bulanan.label" :series="trenSeries" />
      </div>

      <div class="card p-5 lg:col-span-3">
        <h3 class="font-display font-bold text-navy-900 text-sm mb-4">Rekap per Wilayah</h3>
        <div class="space-y-3">
          <div v-for="w in rekapWilayah" :key="w.wilayah">
            <div class="flex items-center justify-between text-sm mb-1">
              <span class="font-medium text-navy-900">{{ w.wilayah }}</span>
              <span class="text-slate-400 text-xs">{{ w.tersalurkan }}/{{ w.totalLaporan }} tersalurkan</span>
            </div>
            <div class="h-2 rounded-full bg-slate-100 overflow-hidden">
              <div class="h-full bg-gradient-to-r from-brand-500 to-brand-700 rounded-full" :style="{ width: pct(w.tersalurkan, w.totalLaporan) + '%' }" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-[11px] uppercase tracking-wide text-slate-400 border-b border-slate-100 bg-slate-50/60">
            <th class="px-4 py-3 font-medium">Wilayah</th>
            <th class="px-4 py-3 font-medium">Total Laporan</th>
            <th class="px-4 py-3 font-medium">Tersalurkan</th>
            <th class="px-4 py-3 font-medium">Belum Tersalurkan</th>
            <th class="px-4 py-3 font-medium">% Progres</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="w in rekapWilayah" :key="w.wilayah" class="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
            <td class="px-4 py-3 font-medium text-navy-900">{{ w.wilayah }}</td>
            <td class="px-4 py-3 text-slate-600">{{ w.totalLaporan }}</td>
            <td class="px-4 py-3 text-green-600 font-medium">{{ w.tersalurkan }}</td>
            <td class="px-4 py-3 text-amber-600 font-medium">{{ w.belum }}</td>
            <td class="px-4 py-3 text-slate-600">{{ pct(w.tersalurkan, w.totalLaporan) }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
