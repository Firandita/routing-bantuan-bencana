<script setup>
const props = defineProps({
  status: { type: String, required: true },
})

const map = {
  // Laporan
  'Menunggu Verifikasi': 'bg-amber-50 text-amber-700 ring-amber-200',
  'Terverifikasi': 'bg-brand-50 text-brand-700 ring-brand-200',
  'Selesai': 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  // Jalan
  'Lancar': 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'Tertutup Sebagian': 'bg-amber-50 text-amber-700 ring-amber-200',
  'Tertutup Total': 'bg-red-50 text-red-700 ring-red-200',
  'Tergenang': 'bg-sky-50 text-sky-700 ring-sky-200',
  // Urgensi / klasifikasi kerusakan
  'Tinggi': 'bg-red-50 text-red-700 ring-red-200',
  'Sedang': 'bg-amber-50 text-amber-700 ring-amber-200',
  'Rendah': 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'Berat': 'bg-red-50 text-red-700 ring-red-200',
  'Ringan': 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  // Relawan
  'Bertugas': 'bg-brand-50 text-brand-700 ring-brand-200',
  'Siaga': 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'Istirahat': 'bg-slate-100 text-slate-500 ring-slate-200',
  // Integrasi
  'Terhubung': 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'Simulasi': 'bg-amber-50 text-amber-700 ring-amber-200',
  'Berhasil': 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'Gagal — mode simulasi': 'bg-amber-50 text-amber-700 ring-amber-200',
  // Jenis bencana
  'Longsor': 'bg-orange-50 text-orange-700 ring-orange-200',
  'Banjir': 'bg-sky-50 text-sky-700 ring-sky-200',
}

const classes = map[props.status] || 'bg-slate-100 text-slate-600 ring-slate-200'
</script>

<template>
  <span class="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1" :class="classes">
    {{ status }}
  </span>
</template>
