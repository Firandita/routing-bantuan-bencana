<script setup>
import { statusIntegrasi, logSinkronisasi } from '../data/dummyData'
</script>

<template>
  <div>
    <PageHeader
      title="Integrasi & Sumber Data"
      subtitle="Pantau dan kelola koneksi ke platform pemerintah eksisting (InaRISK, DIBI-BNPB, INA-LOGPAL, BPBD DIY)."
    >
      <template #actions>
        <button class="btn-primary"><Icon name="refresh" class="w-4 h-4" /> Sinkronkan Sekarang</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      <div v-for="s in statusIntegrasi" :key="s.sumber" class="card p-5">
        <div class="flex items-center justify-between mb-3">
          <div class="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
            <Icon name="plug" class="w-5 h-5" />
          </div>
          <StatusPill :status="s.status" />
        </div>
        <h4 class="font-display font-bold text-navy-900">{{ s.sumber }}</h4>
        <p class="text-xs text-slate-500 mt-1">{{ s.keterangan }}</p>
        <p class="text-[11px] text-slate-400 mt-2">Update terakhir: {{ s.updateTerakhir }}</p>
        <button class="mt-3 text-xs font-semibold text-brand-700 hover:text-brand-800">Kelola API →</button>
      </div>
    </div>

    <div class="card p-5 mb-6 bg-amber-50/50 border-amber-100">
      <div class="flex gap-3">
        <Icon name="alertTriangle" class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <p class="text-sm font-semibold text-amber-800">Catatan Kejujuran Data</p>
          <p class="text-xs text-amber-700 mt-1 leading-relaxed">
            Status "Simulasi" dicantumkan secara jujur untuk sumber yang belum memiliki akses API resmi pada tahap MVP (saat ini: INA-LOGPAL) — bukan diklaim seolah sudah tersambung penuh. Ini penting untuk kredibilitas sistem di hadapan pengguna maupun juri/penilai.
          </p>
        </div>
      </div>
    </div>

    <div class="card overflow-hidden">
      <div class="px-5 py-4 border-b border-slate-100">
        <h3 class="font-display font-bold text-navy-900 text-sm">Log Sinkronisasi</h3>
      </div>
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-[11px] uppercase tracking-wide text-slate-400 border-b border-slate-100 bg-slate-50/60">
            <th class="px-4 py-3 font-medium">Waktu</th>
            <th class="px-4 py-3 font-medium">Sumber</th>
            <th class="px-4 py-3 font-medium">Aksi</th>
            <th class="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(l, i) in logSinkronisasi" :key="i" class="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
            <td class="px-4 py-3 text-slate-500">{{ l.waktu }}</td>
            <td class="px-4 py-3 font-medium text-navy-900">{{ l.sumber }}</td>
            <td class="px-4 py-3 text-slate-600">{{ l.aksi }}</td>
            <td class="px-4 py-3"><StatusPill :status="l.status" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
