<script setup>
import { statusIntegrasi } from '../../data/dummyData'
</script>

<template>
  <div>
    <PageHeader title="Tentang &amp; Sumber Data" subtitle="Transparansi platform data yang menjadi rujukan sistem ini." />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
      <div class="card p-5">
        <h3 class="font-display font-bold text-navy-900 mb-3">Tentang Sistem</h3>
        <p class="text-sm text-slate-500 leading-relaxed">
          Sistem ini dikembangkan sebagai lapisan integrasi di atas platform kebencanaan yang sudah dikelola pemerintah. Tujuannya bukan menggantikan sistem yang ada, melainkan menyatukan data risiko, histori kejadian, logistik, dan laporan warga menjadi satu rekomendasi rute bantuan yang lebih cepat dan adaptif.
        </p>
        <div class="mt-4 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 text-xs p-3 leading-relaxed">
          Sebagian data pada versi ini bersifat simulasi karena keterbatasan akses API resmi — lihat status tiap sumber di tabel samping.
        </div>
      </div>

      <div class="card p-5">
        <h3 class="font-display font-bold text-navy-900 mb-3">Platform yang Menjadi Rujukan</h3>
        <div class="space-y-2">
          <div v-for="s in statusIntegrasi" :key="s.sumber" class="flex items-center justify-between rounded-xl border border-slate-100 px-3.5 py-3">
            <div>
              <p class="text-sm font-semibold text-navy-900">{{ s.sumber }}</p>
              <p class="text-xs text-slate-400 mt-0.5">{{ s.keterangan }}</p>
            </div>
            <StatusPill :status="s.status" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
