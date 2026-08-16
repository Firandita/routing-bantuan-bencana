<script setup>
import { ref } from 'vue'
import { statusJaringanJalan } from '../data/dummyData'

const rows = ref(statusJaringanJalan)
const kondisiOptions = ['Lancar', 'Tertutup Sebagian', 'Tertutup Total', 'Tergenang']
</script>

<template>
  <div>
    <PageHeader
      title="Status Jaringan Jalan"
      subtitle="Perbarui kondisi ruas jalan agar bobot rute pada Manajemen Rute selalu mengikuti kondisi terkini."
    >
      <template #actions>
        <button class="btn-primary"><Icon name="road" class="w-4 h-4" /> Tambah Update Ruas</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
      <div v-for="k in kondisiOptions" :key="k" class="card p-4">
        <p class="section-label mb-1">{{ k }}</p>
        <p class="font-display font-bold text-xl text-navy-900">{{ rows.filter(r => r.kondisi === k).length }} ruas</p>
      </div>
    </div>

    <div class="card overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-[11px] uppercase tracking-wide text-slate-400 border-b border-slate-100 bg-slate-50/60">
            <th class="px-4 py-3 font-medium">Ruas Jalan</th>
            <th class="px-4 py-3 font-medium">Kondisi</th>
            <th class="px-4 py-3 font-medium">Jenis Gangguan</th>
            <th class="px-4 py-3 font-medium">Update Terakhir</th>
            <th class="px-4 py-3 font-medium">Sumber</th>
            <th class="px-4 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, i) in rows" :key="i" class="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
            <td class="px-4 py-3 font-medium text-navy-900">{{ r.ruas }}</td>
            <td class="px-4 py-3"><StatusPill :status="r.kondisi" /></td>
            <td class="px-4 py-3 text-slate-500">{{ r.jenisGangguan }}</td>
            <td class="px-4 py-3 text-slate-400">{{ r.updateTerakhir }}</td>
            <td class="px-4 py-3"><SourceBadge :sumber="r.sumber" /></td>
            <td class="px-4 py-3 text-right">
              <button class="text-xs font-semibold text-brand-700 hover:text-brand-800">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
