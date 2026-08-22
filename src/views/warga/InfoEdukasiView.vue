<script setup>
import { ref } from 'vue'

const panduan = [
  { judul: 'Saat terjadi tanah longsor', isi: 'Segera menjauh dari lereng dan tebing curam, waspadai retakan tanah dan suara gemuruh yang tidak biasa. Menuju titik kumpul terdekat melalui jalur yang sudah ditentukan posko, dan hindari melintasi area yang baru saja longsor karena berpotensi longsor susulan.' },
  { judul: 'Saat terjadi banjir', isi: 'Pindahkan barang berharga ke tempat lebih tinggi, matikan aliran listrik utama, dan pantau ketinggian air melalui laporan resmi sebelum memutuskan evakuasi mandiri.' },
  { judul: 'Menyiapkan tas siaga bencana', isi: 'Siapkan dokumen penting, obat-obatan pribadi, senter, air minum, dan pakaian ganti dalam satu tas yang mudah dibawa sewaktu-waktu.' },
]
const openIndex = ref(0)

function toggle(i) {
  openIndex.value = openIndex.value === i ? -1 : i
}

const posko = [
  { nama: 'Posko BPBD DIY', wilayah: 'Kota Yogyakarta', kontak: '(0274) 555-0102' },
  { nama: 'Posko Sleman', wilayah: 'Sleman', kontak: '(0274) 555-0177' },
  { nama: 'Posko Kulon Progo', wilayah: 'Kulon Progo', kontak: '(0274) 555-0143' },
]
</script>

<template>
  <div>
    <PageHeader title="Info & Edukasi" subtitle="Panduan tanggap darurat dan kontak posko terdekat." />

    <div class="card p-5 mb-6">
      <h3 class="font-display font-bold text-navy-900 mb-4">Panduan Tanggap Darurat</h3>
      <div class="space-y-2">
        <div v-for="(p, i) in panduan" :key="p.judul" class="rounded-xl border border-slate-100 overflow-hidden">
          <button
            @click="toggle(i)"
            class="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-semibold text-navy-900 hover:bg-slate-50/60 transition-colors"
          >
            {{ p.judul }}
            <Icon name="chevronDown" class="w-4 h-4 text-slate-400 transition-transform" :class="openIndex === i ? 'rotate-180' : ''" />
          </button>
          <div v-if="openIndex === i" class="px-4 pb-4 text-sm text-slate-500 leading-relaxed">
            {{ p.isi }}
          </div>
        </div>
      </div>
    </div>

    <div class="card overflow-hidden">
      <div class="px-5 py-4 border-b border-slate-100">
        <h3 class="font-display font-bold text-navy-900">Kontak Posko Terdekat</h3>
      </div>
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-[11px] uppercase tracking-wide text-slate-400 border-b border-slate-100 bg-slate-50/60">
            <th class="px-5 py-3 font-medium">Posko</th>
            <th class="px-5 py-3 font-medium">Wilayah</th>
            <th class="px-5 py-3 font-medium">Kontak</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in posko" :key="p.nama" class="border-b border-slate-50 last:border-0">
            <td class="px-5 py-3 font-medium text-navy-900">{{ p.nama }}</td>
            <td class="px-5 py-3 text-slate-600">{{ p.wilayah }}</td>
            <td class="px-5 py-3 text-slate-600">{{ p.kontak }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
