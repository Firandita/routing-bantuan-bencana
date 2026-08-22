<script setup>
import { ref, computed } from 'vue'
import {
  ringkasanStats,
  trenBencana,
  statistikJenisBencana,
  kebutuhanBantuan,
  titikBencana,
  notifikasiTerbaru,
  laporanBantuan,
} from '../../data/dummyData'

// ===== Card 1: chart harian/bulanan/tahunan =====
const periodTabs = [
  { key: 'harian', label: 'Harian' },
  { key: 'bulanan', label: 'Bulanan' },
  { key: 'tahunan', label: 'Tahunan' },
]
const activePeriod = ref('bulanan')
const chartData = computed(() => trenBencana[activePeriod.value])
const chartSeries = computed(() => [
  { name: 'Longsor', color: '#EA580C', data: chartData.value.longsor },
  { name: 'Banjir', color: '#0284C7', data: chartData.value.banjir },
])

// ===== Card 7: donut jenis bencana =====
const donutData = [
  { label: 'Longsor', value: statistikJenisBencana.longsor, color: '#EA580C' },
  { label: 'Banjir', value: statistikJenisBencana.banjir, color: '#0284C7' },
]

// ===== Card 8: tabel + popup rincian bantuan =====
const selectedLaporan = ref(null)
const tabelData = computed(() => laporanBantuan.slice(0, 10))
</script>

<template>
  <div>
    <!-- ================= ROW 1: Chart + Stats (kiri) | Kebutuhan Bantuan (kanan) ================= -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 items-stretch">
      <!-- Kolom kiri: chart + 3 stat card -->
      <div class="lg:col-span-2 flex flex-col gap-6">
        <!-- Card 1: histori bencana -->
        <div class="card p-5">
          <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h3 class="font-display font-bold text-navy-900">Histori Bencana</h3>
              <p class="text-xs text-slate-400 mt-0.5">Jumlah kejadian longsor &amp; banjir</p>
            </div>
            <div class="flex gap-1 bg-slate-100/80 p-1 rounded-xl">
              <button
                v-for="t in periodTabs"
                :key="t.key"
                @click="activePeriod = t.key"
                class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                :class="activePeriod === t.key ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
              >
                {{ t.label }}
              </button>
            </div>
          </div>
          <LineChart :labels="chartData.label" :series="chartSeries" :height="220" />
        </div>

        <!-- Card 2,3,4: stat cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard v-for="s in ringkasanStats" :key="s.label" v-bind="s" />
        </div>
      </div>

      <!-- Card 5: daftar kebutuhan bantuan -->
      <div class="card p-5 flex flex-col h-full">
        <div class="mb-1">
          <h3 class="font-display font-bold text-navy-900">Kebutuhan Bantuan</h3>
          <p class="text-xs text-slate-400 mt-0.5">Agregat lintas laporan aktif</p>
        </div>
        <div class="flex-1 divide-y divide-slate-100 mt-3">
          <div v-for="k in kebutuhanBantuan" :key="k.item" class="flex items-center gap-3 py-3 first:pt-2">
            <div
              class="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              :class="{
                'bg-red-50 text-red-600': k.tone === 'darurat',
                'bg-amber-50 text-amber-600': k.tone === 'proses',
                'bg-green-50 text-green-600': k.tone === 'aman',
                'bg-brand-50 text-brand-700': k.tone === 'info',
              }"
            >
              <Icon :name="k.icon" class="w-4 h-4" />
            </div>
            <p class="text-sm font-medium text-navy-900 flex-1 min-w-0 truncate">{{ k.item }}</p>
            <p class="text-sm font-bold text-navy-900 shrink-0">{{ k.jumlah }} <span class="font-normal text-slate-400 text-xs">{{ k.satuan }}</span></p>
          </div>
        </div>
        <RouterLink
          to="/admin/gudang-logistik"
          class="mt-3 pt-3 border-t border-slate-100 text-xs font-semibold text-brand-700 hover:text-brand-800 flex items-center justify-center gap-1"
        >
          Lihat Selengkapnya <Icon name="chevronRight" class="w-3.5 h-3.5" />
        </RouterLink>
      </div>
    </div>

    <!-- ================= ROW 2: Peta (kiri) | Notifikasi + Donut (kanan) ================= -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 items-stretch">
      <!-- Card 6: peta titik bencana -->
      <div class="card p-5 lg:col-span-2 flex flex-col">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="font-display font-bold text-navy-900">Peta Titik Bencana</h3>
            <p class="text-xs text-slate-400 mt-0.5">Sebaran banjir &amp; longsor — DIY</p>
          </div>
          <span class="badge-sumber">Sumber: InaRISK</span>
        </div>
        <LeafletMap :points="titikBencana" height="100%" class="flex-1 min-h-[360px]" />
      </div>

      <!-- Card 7: notifikasi warga + donut -->
      <div class="card p-5 flex flex-col">
        <h3 class="font-display font-bold text-navy-900 mb-1">Notifikasi Warga</h3>
        <p class="text-xs text-slate-400 mb-4">Laporan masuk butuh bantuan</p>

        <PieChart :data="donutData" :size="120" :thickness="16" />

        <div class="mt-4 pt-4 border-t border-slate-100 flex-1 overflow-y-auto scrollbar-none space-y-3 max-h-[220px]">
          <div v-for="n in notifikasiTerbaru" :key="n.id" class="flex gap-2.5">
            <span
              class="w-2 h-2 rounded-full mt-1.5 shrink-0"
              :style="{ background: n.jenis === 'Longsor' ? '#EA580C' : '#0284C7' }"
            />
            <div class="min-w-0">
              <p class="text-xs font-medium text-navy-900 leading-snug">{{ n.judul }}</p>
              <p class="text-[11px] text-slate-400 mt-0.5">{{ n.lokasi }} · {{ n.waktu }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= ROW 3: Tabel Ringkasan Laporan ================= -->
    <div class="card overflow-hidden">
      <div class="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div>
          <h3 class="font-display font-bold text-navy-900">Ringkasan Laporan Bantuan</h3>
          <p class="text-xs text-slate-400 mt-0.5">Menampilkan 10 laporan terbaru</p>
        </div>
        <RouterLink to="/admin/manajemen-laporan" class="text-xs font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1 shrink-0">
          Lihat Selengkapnya <Icon name="chevronRight" class="w-3.5 h-3.5" />
        </RouterLink>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-[11px] uppercase tracking-wide text-slate-400 border-b border-slate-100 bg-slate-50/60">
              <th class="px-4 py-3 font-medium">Nama Bencana</th>
              <th class="px-4 py-3 font-medium">Penerima</th>
              <th class="px-4 py-3 font-medium">Daftar Bantuan</th>
              <th class="px-4 py-3 font-medium">Jarak/km</th>
              <th class="px-4 py-3 font-medium">Durasi</th>
              <th class="px-4 py-3 font-medium">Alamat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="l in tabelData" :key="l.id" class="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
              <td class="px-4 py-3">
                <div class="flex items-center gap-2.5">
                  <div
                    class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    :class="l.jenis === 'Longsor' ? 'bg-orange-50 text-orange-600' : 'bg-sky-50 text-sky-600'"
                  >
                    <Icon :name="l.jenis === 'Longsor' ? 'landslide' : 'waterDrop'" class="w-3.5 h-3.5" />
                  </div>
                  <div class="min-w-0">
                    <p class="font-medium text-navy-900 leading-tight">{{ l.nama }}</p>
                    <p class="text-[11px] text-slate-400">{{ l.id }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-slate-600 whitespace-nowrap">{{ l.penerima }}</td>
              <td class="px-4 py-3">
                <button
                  @click="selectedLaporan = l"
                  class="text-xs font-semibold text-brand-700 hover:text-brand-800 bg-brand-50 hover:bg-brand-100 px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                >
                  Lihat Daftar ({{ l.rincianBantuan.length }})
                </button>
              </td>
              <td class="px-4 py-3 text-slate-600 whitespace-nowrap">{{ l.jarak }} km</td>
              <td class="px-4 py-3 text-slate-600 whitespace-nowrap">{{ l.durasi }}</td>
              <td class="px-4 py-3 text-slate-500 max-w-[220px] truncate" :title="l.alamat">{{ l.alamat }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <BantuanDetailModal :laporan="selectedLaporan" @close="selectedLaporan = null" />
  </div>
</template>
