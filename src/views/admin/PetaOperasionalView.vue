<script setup>
import { ref } from 'vue'
import { titikBencana, statusJaringanJalan } from '../../data/dummyData'

const layers = ref([
  { key: 'zonaRisiko', label: 'Zona Risiko', sumber: 'InaRISK', active: true, internal: false },
  { key: 'historiKejadian', label: 'Histori Kejadian', sumber: 'DIBI-BNPB', active: true, internal: false },
  { key: 'titikBantuan', label: 'Titik Bantuan', sumber: 'Data Internal', active: true, internal: true },
  { key: 'statusJalan', label: 'Status Jalan', sumber: 'Data Internal', active: false, internal: true },
  { key: 'ruteAktif', label: 'Rute Aktif', sumber: 'Data Internal', active: false, internal: true },
])
</script>

<template>
  <div>
    <PageHeader
      title="Peta Operasional"
      subtitle="Layer risiko, histori kejadian, titik bantuan, status jalan, dan rute aktif dalam satu peta kerja."
    />

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Layer control -->
      <div class="card p-5 lg:col-span-1 h-fit">
        <h3 class="font-display font-bold text-navy-900 mb-1 text-sm">Kontrol Layer</h3>
        <p class="text-xs text-slate-400 mb-4">Aktifkan/nonaktifkan sumber data pada peta</p>
        <div class="space-y-3">
          <label
            v-for="l in layers"
            :key="l.key"
            class="flex items-start gap-3 rounded-xl border border-slate-100 p-3 cursor-pointer hover:bg-slate-50/60 transition-colors"
          >
            <input type="checkbox" v-model="l.active" class="mt-0.5 w-4 h-4 rounded accent-brand-700" />
            <div class="min-w-0">
              <p class="text-sm font-medium text-navy-900">{{ l.label }}</p>
              <SourceBadge :sumber="l.internal ? 'Internal' : l.sumber" class="mt-1" />
            </div>
          </label>
        </div>

        <div class="mt-5 pt-4 border-t border-slate-100">
          <p class="section-label mb-2">Legenda Jenis Bencana</p>
          <div class="space-y-1.5 text-xs text-slate-600">
            <div class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-orange-600" /> Longsor</div>
            <div class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-sky-600" /> Banjir</div>
          </div>
        </div>
      </div>

      <!-- Map -->
      <div class="card p-5 lg:col-span-3">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-display font-bold text-navy-900 text-sm">Peta Kerja Admin</h3>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="l in layers.filter((x) => x.active)" :key="l.key" class="badge-sumber">{{ l.label }}</span>
          </div>
        </div>
        <LeafletMap :points="titikBencana" height="460px" />
      </div>
    </div>

    <!-- Status jalan quick table -->
    <div class="card p-5 mt-6">
      <h3 class="font-display font-bold text-navy-900 mb-4 text-sm">Ringkasan Status Jaringan Jalan</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-[11px] uppercase tracking-wide text-slate-400 border-b border-slate-100">
              <th class="px-2 py-2 font-medium">Ruas Jalan</th>
              <th class="px-2 py-2 font-medium">Kondisi</th>
              <th class="px-2 py-2 font-medium">Gangguan</th>
              <th class="px-2 py-2 font-medium">Update</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(r, i) in statusJaringanJalan" :key="i" class="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
              <td class="px-2 py-2.5 font-medium text-navy-900">{{ r.ruas }}</td>
              <td class="px-2 py-2.5"><StatusPill :status="r.kondisi" /></td>
              <td class="px-2 py-2.5 text-slate-500">{{ r.jenisGangguan }}</td>
              <td class="px-2 py-2.5 text-slate-400">{{ r.updateTerakhir }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
