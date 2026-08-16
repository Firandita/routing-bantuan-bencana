<script setup>
import { reactive, ref } from 'vue'
import { useReportsStore } from '../stores/reports'
import { useRouter } from 'vue-router'
import Icon from '../components/Icon.vue'

const store = useReportsStore()
const router = useRouter()
const submitted = ref(false)
const locating = ref(false)

const form = reactive({
  lat: null,
  lng: null,
  jenis: 'Makanan',
  jumlah_jiwa: null,
  foto_name: ''
})

function ambilLokasi() {
  if (!navigator.geolocation) return
  locating.value = true
  navigator.geolocation.getCurrentPosition(
    pos => {
      form.lat = pos.coords.latitude
      form.lng = pos.coords.longitude
      locating.value = false
    },
    () => { locating.value = false },
    { enableHighAccuracy: true, timeout: 8000 }
  )
}

function onFile(e) {
  form.foto_name = e.target.files?.[0]?.name || ''
}

function submit() {
  if (form.lat == null || form.lng == null || !form.jumlah_jiwa) return
  store.addReport({
    lat: form.lat,
    lng: form.lng,
    jenis: form.jenis,
    jumlah_jiwa: Number(form.jumlah_jiwa)
  })
  submitted.value = true
  setTimeout(() => router.push('/'), 1500)
}
</script>

<template>
  <div class="max-w-xl mx-auto px-4 py-8">
    <h1 class="font-heading font-bold text-2xl text-ink flex items-center gap-2">
      <Icon name="campaign" :size="26" class="text-primary" />Lapor butuh bantuan
    </h1>
    <p class="text-sm text-muted mt-1">Isi data secepat mungkin, tim posko akan memverifikasi laporanmu.</p>

    <form v-if="!submitted" class="mt-6 bg-white rounded-md shadow-sm p-5 space-y-5" @submit.prevent="submit">
      <div>
        <label class="text-sm font-medium text-ink">Lokasi</label>
        <div class="mt-1 flex items-center gap-3">
          <button type="button" @click="ambilLokasi"
            class="flex items-center gap-1.5 bg-secondary/10 text-secondary text-sm font-medium rounded-md px-3 py-2 hover:bg-secondary/20">
            <Icon name="my_location" :size="18" />
            {{ locating ? 'Mengambil lokasi…' : 'Gunakan lokasi saat ini (GPS)' }}
          </button>
          <span v-if="form.lat" class="text-xs text-muted">
            {{ form.lat.toFixed(4) }}, {{ form.lng.toFixed(4) }}
          </span>
        </div>
      </div>

      <div>
        <label class="text-sm font-medium text-ink">Jenis bantuan</label>
        <select v-model="form.jenis" class="mt-1 w-full border border-black/10 rounded-md px-3 py-2 text-sm">
          <option>Makanan</option>
          <option>Obat</option>
          <option>Evakuasi</option>
          <option>Tenda / Selimut</option>
        </select>
      </div>

      <div>
        <label class="text-sm font-medium text-ink">Jumlah jiwa terdampak</label>
        <input v-model="form.jumlah_jiwa" type="number" min="1" required
          class="mt-1 w-full border border-black/10 rounded-md px-3 py-2 text-sm" placeholder="mis. 12" />
      </div>

      <div>
        <label class="text-sm font-medium text-ink">Foto kondisi (opsional)</label>
        <input type="file" accept="image/*" @change="onFile"
          class="mt-1 w-full text-sm text-muted" />
        <p v-if="form.foto_name" class="text-xs text-muted mt-1">{{ form.foto_name }}</p>
      </div>

      <button type="submit"
        class="w-full flex items-center justify-center gap-1.5 bg-primary text-white font-medium rounded-md py-2.5 hover:bg-primary/90 disabled:opacity-50"
        :disabled="!form.lat || !form.jumlah_jiwa">
        <Icon name="send" :size="18" />Kirim laporan
      </button>
    </form>

    <div v-else class="mt-6 bg-success/10 border border-success/30 text-success rounded-md p-5 text-sm font-medium flex items-center gap-2">
      <Icon name="check_circle" :size="20" />Laporan terkirim. Kamu akan diarahkan ke peta…
    </div>
  </div>
</template>
