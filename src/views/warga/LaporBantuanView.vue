<script setup>
import { reactive } from 'vue'
import { useToast } from '../../composables/useToast'

const { showToast } = useToast()

const form = reactive({
  jenis: 'Banjir',
  lokasi: '',
  jumlahJiwa: '',
  kondisi: 'Butuh evakuasi',
  noHp: '',
  detail: '',
})

function ambilGps() {
  showToast('Lokasi GPS berhasil diambil (simulasi)', 'info')
  form.lokasi = form.lokasi || 'Titik lokasi saat ini (GPS)'
}

function submit() {
  if (!form.lokasi.trim()) {
    showToast('Lokasi wajib diisi', 'error')
    return
  }
  showToast('Laporan berhasil dikirim ke posko terdekat')
  form.lokasi = ''
  form.jumlahJiwa = ''
  form.noHp = ''
  form.detail = ''
}
</script>

<template>
  <div>
    <PageHeader title="Lapor Bantuan" subtitle="Sampaikan kondisi terkini agar posko dapat menindaklanjuti dengan cepat." />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div class="card p-5 lg:col-span-2">
        <h3 class="font-display font-bold text-navy-900 mb-4">Form Laporan Bantuan</h3>

        <div class="space-y-4">
          <div>
            <label class="section-label block mb-1.5">Jenis Bencana</label>
            <select v-model="form.jenis" class="input-field">
              <option>Banjir</option>
              <option>Tanah Longsor</option>
              <option>Lainnya</option>
            </select>
            <p class="text-xs text-slate-400 mt-1.5">Pilihan ini menentukan parameter risiko yang dipakai sistem untuk memprioritaskan laporanmu.</p>
          </div>

          <div>
            <label class="section-label block mb-1.5">Lokasi</label>
            <div class="flex gap-2">
              <input v-model="form.lokasi" type="text" placeholder="Alamat / titik lokasi" class="input-field flex-1" />
              <button type="button" @click="ambilGps" class="btn-secondary shrink-0 whitespace-nowrap"><Icon name="mapPin" class="w-4 h-4" /> Ambil GPS</button>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label class="section-label block mb-1.5">Jumlah Jiwa</label>
              <input v-model="form.jumlahJiwa" type="number" placeholder="0" class="input-field" />
            </div>
            <div>
              <label class="section-label block mb-1.5">Kondisi</label>
              <select v-model="form.kondisi" class="input-field">
                <option>Butuh evakuasi</option>
                <option>Butuh logistik</option>
                <option>Aman, hanya lapor</option>
              </select>
            </div>
            <div>
              <label class="section-label block mb-1.5">No. HP</label>
              <input v-model="form.noHp" type="text" placeholder="08xx" class="input-field" />
            </div>
          </div>

          <div>
            <label class="section-label block mb-1.5">Detail Situasi</label>
            <textarea v-model="form.detail" rows="3" placeholder="Jelaskan kondisi terkini secara singkat..." class="input-field resize-none"></textarea>
          </div>

          <div>
            <label class="section-label block mb-1.5">Unggah Foto (opsional)</label>
            <input type="file" class="input-field" />
          </div>

          <button class="btn-primary w-full justify-center" @click="submit">Kirim Laporan</button>
        </div>
      </div>

      <div class="card p-5">
        <h3 class="font-display font-bold text-navy-900 mb-2">Kenapa data ini penting?</h3>
        <p class="text-sm text-slate-500 leading-relaxed">
          Laporanmu menjadi salah satu masukan utama bagi mesin skor urgensi sistem, digabungkan dengan data risiko wilayah (InaRISK) dan histori kejadian (DIBI) untuk menentukan prioritas penyaluran bantuan.
        </p>
        <div class="mt-4 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 text-xs p-3 leading-relaxed">
          Untuk kondisi darurat yang mengancam nyawa, tetap hubungi <b>112</b> terlebih dahulu. Form ini melengkapi, bukan menggantikan, jalur darurat resmi.
        </div>
      </div>
    </div>
  </div>
</template>
