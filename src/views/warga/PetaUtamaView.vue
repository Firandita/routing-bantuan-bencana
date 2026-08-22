<script setup>
import { titikBencana } from '../../data/dummyData'
</script>

<template>
  <div>
    <PageHeader title="Peta Utama" subtitle="Pantau sebaran titik bantuan dan zona terdampak bencana di wilayah DIY secara real-time." />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      <div class="card p-5 lg:col-span-2">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-display font-bold text-navy-900">Peta Sebaran Bantuan &amp; Zona Terdampak</h3>
          <span class="badge-internal"><Icon name="wifi" class="w-3 h-3" /> Live</span>
        </div>
        <LeafletMap :points="titikBencana" height="440px" />
      </div>

      <div class="card p-5 flex flex-col">
        <h3 class="font-display font-bold text-navy-900 mb-3">Legenda</h3>
        <div class="space-y-2 text-sm text-slate-600">
          <div class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-orange-600" /> Titik Longsor</div>
          <div class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-sky-600" /> Titik Banjir</div>
        </div>

        <div class="divider" />

        <p class="section-label mb-2">Sumber Layer Aktif</p>
        <div class="flex flex-col gap-1.5 items-start">
          <span class="badge-sumber">Zona Risiko — InaRISK</span>
          <span class="badge-internal">Titik Bantuan — Data Internal</span>
        </div>

        <div class="flex-1" />

        <div class="divider" />
        <RouterLink to="/warga/lapor-bantuan" class="btn-primary w-full justify-center">
          <Icon name="alertTriangle" class="w-4 h-4" /> Buat Laporan Bantuan
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.divider { height: 1px; background: #EEF2F7; margin: 16px 0; }
</style>
