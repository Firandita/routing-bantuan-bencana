<script setup>
import { tugasRelawan } from '../../data/dummyData'
</script>

<template>
  <div>
    <PageHeader title="Dashboard Tugas" subtitle="Titik tugas yang ditugaskan untukmu, diurutkan berdasarkan skor urgensi." />

    <div class="card overflow-hidden">
      <div class="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h3 class="font-display font-bold text-navy-900">Titik Tugas Anda</h3>
        <span class="text-xs text-slate-400">{{ tugasRelawan.length }} titik aktif</span>
      </div>
      <div class="divide-y divide-slate-100">
        <div v-for="t in tugasRelawan" :key="t.id" class="flex items-center justify-between gap-4 px-5 py-4">
          <div class="min-w-0">
            <p class="font-medium text-navy-900">{{ t.lokasi }}</p>
            <p class="text-xs text-slate-500 mt-0.5">{{ t.jiwa }} jiwa · {{ t.kebutuhan }} · {{ t.jarak }} km dari lokasimu</p>
          </div>
          <StatusPill :status="t.urgensi" />
        </div>
      </div>
    </div>
  </div>
</template>
