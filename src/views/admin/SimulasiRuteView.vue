<script setup>
import { ref, reactive, computed } from 'vue'
import { titikBencana, gudangLogistik, kebutuhanBantuan } from '../../data/dummyData'
import { findRoutes } from '../../services/routeEngine'
import { useToast } from '../../composables/useToast'

const { showToast } = useToast()

const form = reactive({
  destinationId: titikBencana[0].id,
  originIdx: 0,
  jenisBantuan: 'Semua',
  moda: 'Darat & Udara',
})

const destination = computed(() => {
  const t = titikBencana.find((t) => t.id === form.destinationId)
  return t ? { lat: t.lat, lng: t.lng, nama: t.nama, jenisBencana: t.jenis, urgensi: t.urgensi } : null
})
const origin = computed(() => {
  const g = gudangLogistik[form.originIdx]
  return g ? { lat: g.lat, lng: g.lng, nama: g.nama } : null
})

const loading = ref(false)
const hasSearched = ref(false)
const routes = ref([])
const selectedId = ref('')

async function cariRute() {
  if (!origin.value || !destination.value) return
  loading.value = true
  hasSearched.value = true
  const result = await findRoutes({
    origin: origin.value,
    destination: destination.value,
    jenisBantuan: form.jenisBantuan,
    moda: form.moda === 'Darat' ? 'Darat' : 'Darat & Udara',
  })
  routes.value = result.candidates
  selectedId.value = result.recommendedId
  loading.value = false
  showToast(`${result.candidates.length} kandidat rute ditemukan`)
}

function pilihRute(id) {
  selectedId.value = id
}

function gunakanRute() {
  showToast('Rute disiapkan untuk ditugaskan lewat Manajemen Rute', 'info')
}

const selectedRoute = computed(() => routes.value.find((r) => r.id === selectedId.value))

const statusTone = {
  'Direkomendasikan': 'aman',
  'Bisa Dilalui': 'proses',
  'Direkomendasikan untuk barang ringan': 'aman',
  'Tidak Disarankan': 'darurat',
}
</script>

<template>
  <div>
    <PageHeader
      title="Simulasi Rute Bantuan"
      subtitle="Visualisasikan beberapa kandidat jalur dari posko ke titik bencana, lalu pilih rute yang paling memungkinkan."
    />

    <div class="card p-4 mb-6 bg-brand-50/60 border-brand-100 flex gap-3">
      <Icon name="compass" class="w-5 h-5 text-brand-700 shrink-0 mt-0.5" />
      <p class="text-xs text-brand-800 leading-relaxed">
        Halaman ini masih menampilkan <b>rute simulasi</b> (bukan hasil algoritma pencarian jalur sesungguhnya). Tampilan dan alur interaksinya sudah dirancang untuk langsung mendukung integrasi algoritma pencarian rute (mis. Dijkstra atau lainnya) pada tahap pengembangan berikutnya — cukup ganti sumber data di <code>routeEngine.js</code>.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
      <!-- Panel kontrol -->
      <div class="card p-5 lg:col-span-1">
        <h3 class="font-display font-bold text-navy-900 text-sm mb-4">Parameter Simulasi</h3>

        <div class="space-y-4">
          <div>
            <label class="section-label block mb-1.5">Titik Bencana (Tujuan)</label>
            <select v-model="form.destinationId" class="input-field">
              <option v-for="t in titikBencana" :key="t.id" :value="t.id">{{ t.nama }}</option>
            </select>
            <div v-if="destination" class="flex items-center gap-1.5 mt-2">
              <StatusPill :status="destination.jenisBencana" />
              <StatusPill :status="destination.urgensi" />
            </div>
          </div>

          <div>
            <label class="section-label block mb-1.5">Posko / Gudang Asal</label>
            <select v-model.number="form.originIdx" class="input-field">
              <option v-for="(g, i) in gudangLogistik" :key="g.nama" :value="i">{{ g.nama }}</option>
            </select>
          </div>

          <div>
            <label class="section-label block mb-1.5">Jenis Bantuan</label>
            <select v-model="form.jenisBantuan" class="input-field">
              <option>Semua</option>
              <option v-for="k in kebutuhanBantuan" :key="k.item">{{ k.item }}</option>
            </select>
          </div>

          <div>
            <label class="section-label block mb-1.5">Moda Transportasi</label>
            <div class="flex gap-2">
              <button
                type="button"
                @click="form.moda = 'Darat'"
                class="flex-1 rounded-xl border text-sm font-medium py-2 transition-colors"
                :class="form.moda === 'Darat' ? 'border-brand-700 bg-brand-50 text-brand-700' : 'border-slate-200 text-slate-600 hover:border-brand-200'"
              >
                Darat
              </button>
              <button
                type="button"
                @click="form.moda = 'Darat & Udara'"
                class="flex-1 rounded-xl border text-sm font-medium py-2 transition-colors"
                :class="form.moda === 'Darat & Udara' ? 'border-brand-700 bg-brand-50 text-brand-700' : 'border-slate-200 text-slate-600 hover:border-brand-200'"
              >
                Darat + Udara
              </button>
            </div>
            <p class="text-[11px] text-slate-400 mt-1.5">Jalur laut belum didukung pada versi ini.</p>
          </div>

          <button class="btn-primary w-full justify-center" :disabled="loading" @click="cariRute">
            <Icon name="compass" class="w-4 h-4" :class="loading ? 'animate-spin' : ''" />
            {{ loading ? 'Mencari rute...' : 'Cari Rute' }}
          </button>
        </div>
      </div>

      <!-- Peta + hasil -->
      <div class="lg:col-span-3 flex flex-col gap-6">
        <div class="card p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-display font-bold text-navy-900 text-sm">Peta Kandidat Rute</h3>
            <div class="flex flex-wrap gap-3 text-[11px] text-slate-500">
              <span class="flex items-center gap-1.5"><span class="w-3 h-0.5 rounded bg-navy-900 inline-block" /> Posko Asal</span>
              <span class="flex items-center gap-1.5"><span class="w-3 h-0.5 rounded bg-red-600 inline-block" /> Titik Bencana</span>
            </div>
          </div>
          <RouteMap :origin="origin" :destination="destination" :routes="routes" :selected-id="selectedId" height="420px" @select-route="pilihRute" />
        </div>

        <div v-if="hasSearched" class="space-y-4">
          <div
            v-for="r in routes"
            :key="r.id"
            class="card p-5 cursor-pointer transition-all"
            :class="r.id === selectedId ? 'ring-2 ring-brand-500 border-brand-200' : 'hover:shadow-card-hover'"
            @click="pilihRute(r.id)"
          >
            <div class="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-3 h-3 rounded-full shrink-0" :style="{ background: r.color }" />
                <div>
                  <p class="font-display font-bold text-navy-900 text-sm">{{ r.label }}</p>
                  <p class="text-xs text-slate-400">{{ r.moda }}</p>
                </div>
              </div>
              <span v-if="r.id === selectedId" class="badge-internal shrink-0"><Icon name="check" class="w-3 h-3" /> Rute Terpilih</span>
            </div>

            <div class="grid grid-cols-3 gap-3 mb-3">
              <div class="rounded-lg bg-slate-50 p-2.5 text-center">
                <p class="text-[10px] text-slate-400 uppercase">Jarak</p>
                <p class="text-sm font-semibold text-navy-900">{{ r.jarakKm }} km</p>
              </div>
              <div class="rounded-lg bg-slate-50 p-2.5 text-center">
                <p class="text-[10px] text-slate-400 uppercase">Estimasi</p>
                <p class="text-sm font-semibold text-navy-900">{{ r.estimasiMenit }} mnt</p>
              </div>
              <div class="rounded-lg bg-slate-50 p-2.5 text-center">
                <p class="text-[10px] text-slate-400 uppercase">Status</p>
                <p class="text-sm font-semibold text-navy-900 truncate">{{ r.status }}</p>
              </div>
            </div>

            <p class="text-xs text-slate-500 mb-2">{{ r.catatan }}</p>

            <div class="flex flex-wrap gap-1.5">
              <span v-for="b in r.bantuanKompatibel" :key="b" class="badge-sumber">{{ b }}</span>
            </div>
          </div>

          <button v-if="selectedRoute" class="btn-primary w-full justify-center" @click="gunakanRute">
            <Icon name="route" class="w-4 h-4" /> Gunakan {{ selectedRoute.label }} → Kirim ke Manajemen Rute
          </button>
        </div>

        <div v-else class="card p-10 text-center text-sm text-slate-400">
          Pilih titik bencana, posko asal, dan parameter lain di sebelah kiri, lalu klik <b>Cari Rute</b> untuk melihat kandidat jalur.
        </div>
      </div>
    </div>
  </div>
</template>
