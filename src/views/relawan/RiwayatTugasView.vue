<script setup>
import { riwayatTugasRelawan } from '../../data/dummyData'
</script>

<template>
  <div>
    <PageHeader title="Riwayat Tugas" subtitle="Rekap tugas yang sudah kamu selesaikan." />

    <div class="card overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-[11px] uppercase tracking-wide text-slate-400 border-b border-slate-100 bg-slate-50/60">
            <th class="px-5 py-3 font-medium">Tanggal</th>
            <th class="px-5 py-3 font-medium">Lokasi</th>
            <th class="px-5 py-3 font-medium">Jenis Bantuan</th>
            <th class="px-5 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, i) in riwayatTugasRelawan" :key="i" class="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
            <td class="px-5 py-3 text-slate-600">{{ r.tanggal }}</td>
            <td class="px-5 py-3 font-medium text-navy-900">{{ r.lokasi }}</td>
            <td class="px-5 py-3 text-slate-600">{{ r.jenis }}</td>
            <td class="px-5 py-3"><StatusPill :status="r.status" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
