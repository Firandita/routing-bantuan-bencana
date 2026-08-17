<script setup>
import { ref, computed } from 'vue'
import { laporanBantuan } from '../data/dummyData'

const tabs = ['Semua Laporan', 'Menunggu Verifikasi', 'Terverifikasi', 'Selesai']
const activeTab = ref('Semua Laporan')
const search = ref('')

const filtered = computed(() => {
  let data = laporanBantuan
  if (activeTab.value !== 'Semua Laporan') {
    data = data.filter((l) => l.status === activeTab.value)
  }
  if (search.value.trim()) {
    const q = search.value.toLowerCase()
    data = data.filter((l) => l.nama.toLowerCase().includes(q) || l.penerima.toLowerCase().includes(q) || l.alamat.toLowerCase().includes(q))
  }
  return data
})

const counts = computed(() =>
  Object.fromEntries(tabs.map((t) => [t, t === 'Semua Laporan' ? laporanBantuan.length : laporanBantuan.filter((l) => l.status === t).length]))
)

const selected = ref(null)
const bantuanModal = ref(null)
</script>

<template>
  <div>
    <PageHeader
      title="Manajemen Laporan"
      subtitle="Verifikasi laporan warga dan pantau progres penyaluran bantuan — data primer/internal sistem."
    >
      <template #actions>
        <button class="btn-secondary"><Icon name="download" class="w-4 h-4" /> Ekspor</button>
        <button class="btn-primary"><Icon name="filter" class="w-4 h-4" /> Filter Lanjutan</button>
      </template>
    </PageHeader>

    <!-- Tabs -->
    <div class="flex flex-wrap items-center gap-2 mb-5">
      <button
        v-for="t in tabs"
        :key="t"
        @click="activeTab = t"
        class="px-4 py-2 rounded-xl text-sm font-medium transition-colors border"
        :class="activeTab === t ? 'bg-brand-700 text-white border-brand-700 shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:border-brand-200'"
      >
        {{ t }} <span class="opacity-70">({{ counts[t] }})</span>
      </button>

      <div class="ml-auto relative">
        <Icon name="search" class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input v-model="search" type="text" placeholder="Cari nama, penerima, alamat…" class="input-field pl-9 w-64" />
      </div>
    </div>

    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-[11px] uppercase tracking-wide text-slate-400 border-b border-slate-100 bg-slate-50/60">
              <th class="px-4 py-3 font-medium">No / ID</th>
              <th class="px-4 py-3 font-medium">Nama Bencana</th>
              <th class="px-4 py-3 font-medium">Penerima</th>
              <th class="px-4 py-3 font-medium">Daftar Bantuan</th>
              <th class="px-4 py-3 font-medium">Jarak / km</th>
              <th class="px-4 py-3 font-medium">Durasi</th>
              <th class="px-4 py-3 font-medium">Alamat</th>
              <th class="px-4 py-3 font-medium">Status</th>
              <th class="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(l, i) in filtered" :key="l.id" class="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
              <td class="px-4 py-3">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    :class="l.jenis === 'Longsor' ? 'bg-orange-50 text-orange-600' : 'bg-sky-50 text-sky-600'">
                    <Icon name="alertTriangle" class="w-3.5 h-3.5" />
                  </div>
                  <span class="text-xs text-slate-400">{{ l.id }}</span>
                </div>
              </td>
              <td class="px-4 py-3 font-medium text-navy-900">{{ l.nama }}</td>
              <td class="px-4 py-3 text-slate-600">{{ l.penerima }}</td>
              <td class="px-4 py-3">
                <button
                  @click="bantuanModal = l"
                  class="text-xs font-semibold text-brand-700 hover:text-brand-800 bg-brand-50 hover:bg-brand-100 px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                >
                  Lihat Daftar ({{ l.rincianBantuan.length }})
                </button>
              </td>
              <td class="px-4 py-3 text-slate-600">{{ l.jarak }}</td>
              <td class="px-4 py-3 text-slate-600">{{ l.durasi }}</td>
              <td class="px-4 py-3 text-slate-500 max-w-[200px] truncate" :title="l.alamat">{{ l.alamat }}</td>
              <td class="px-4 py-3"><StatusPill :status="l.status" /></td>
              <td class="px-4 py-3 text-right">
                <button @click="selected = l" class="text-xs font-semibold text-brand-700 hover:text-brand-800 whitespace-nowrap">
                  Lebih lengkap →
                </button>
              </td>
            </tr>
            <tr v-if="filtered.length === 0">
              <td colspan="9" class="px-4 py-10 text-center text-sm text-slate-400">Tidak ada laporan yang cocok.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Detail drawer -->
    <div v-if="selected" class="fixed inset-0 z-50 flex justify-end">
      <div class="absolute inset-0 bg-navy-950/40 backdrop-blur-sm" @click="selected = null" />
      <div class="relative w-full max-w-md h-full bg-white shadow-2xl p-6 overflow-y-auto">
        <div class="flex items-center justify-between mb-5">
          <h3 class="font-display font-bold text-lg text-navy-900">Detail Laporan</h3>
          <button @click="selected = null" class="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center">
            <Icon name="x" class="w-4 h-4" />
          </button>
        </div>
        <div class="space-y-4 text-sm">
          <div><p class="section-label">ID Laporan</p><p class="font-medium text-navy-900">{{ selected.id }}</p></div>
          <div><p class="section-label">Nama Bencana</p><p class="font-medium text-navy-900">{{ selected.nama }}</p></div>
          <div class="flex items-center gap-2">
            <StatusPill :status="selected.jenis" />
            <StatusPill :status="selected.status" />
          </div>
          <div><p class="section-label">Penerima</p><p class="text-slate-700">{{ selected.penerima }}</p></div>
          <div><p class="section-label">Alamat</p><p class="text-slate-700">{{ selected.alamat }}</p></div>
          <div>
            <p class="section-label mb-1.5">Daftar Bantuan</p>
            <div class="space-y-1.5">
              <div v-for="(r, i) in selected.rincianBantuan" :key="i" class="flex items-center justify-between text-sm bg-slate-50 rounded-lg px-3 py-2">
                <span class="text-slate-700">{{ r.item }}</span>
                <span class="font-medium text-navy-900">{{ r.jumlah }} {{ r.satuan }}</span>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div><p class="section-label">Jarak</p><p class="text-slate-700">{{ selected.jarak }} km</p></div>
            <div><p class="section-label">Estimasi Durasi</p><p class="text-slate-700">{{ selected.durasi }}</p></div>
          </div>
          <div class="pt-4 border-t border-slate-100 flex gap-2">
            <button class="btn-primary flex-1">Verifikasi</button>
            <button class="btn-secondary flex-1">Tandai Selesai</button>
          </div>
        </div>
      </div>
    </div>

    <BantuanDetailModal :laporan="bantuanModal" @close="bantuanModal = null" />
  </div>
</template>
