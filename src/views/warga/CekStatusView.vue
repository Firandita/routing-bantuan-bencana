<script setup>
import { ref } from 'vue'
import { useToast } from '../../composables/useToast'

const { showToast } = useToast()
const idLaporan = ref('')
const hasil = ref(null)

function cek() {
  if (!idLaporan.value.trim()) {
    showToast('Masukkan ID laporan terlebih dahulu', 'error')
    return
  }
  // dummy — nanti diganti pemanggilan API status laporan sungguhan
  hasil.value = {
    step: 3,
    urgensi: 'Tinggi',
    relawan: 'Tim Posko Umbulharjo',
    estimasi: '±25 menit',
  }
}

const steps = ['Diterima', 'Diverifikasi', 'Diproses', 'Selesai']
</script>

<template>
  <div>
    <PageHeader title="Cek Status Laporan" subtitle="Pantau progres tindak lanjut laporan bantuan yang sudah kamu kirim." />

    <div class="card p-5 max-w-lg">
      <div class="flex gap-2 mb-2">
        <input v-model="idLaporan" type="text" placeholder="Contoh: LP-2026-0417" class="input-field flex-1" @keyup.enter="cek" />
        <button class="btn-primary shrink-0" @click="cek">Cek Status</button>
      </div>

      <template v-if="hasil">
        <div class="divider" />
        <div class="flex items-center mb-6">
          <div v-for="(s, i) in steps" :key="s" class="flex-1 text-center relative">
            <div
              v-if="i > 0"
              class="absolute top-[13px] left-[-50%] w-full h-0.5"
              :class="i <= hasil.step ? 'bg-brand-700' : 'bg-slate-200'"
            />
            <div
              class="relative z-10 w-7 h-7 rounded-full mx-auto mb-1.5 flex items-center justify-center text-xs font-bold"
              :class="i <= hasil.step ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-400'"
            >
              <Icon v-if="i < hasil.step" name="check" class="w-3.5 h-3.5" />
              <span v-else>{{ i + 1 }}</span>
            </div>
            <p class="text-[10.5px] font-semibold text-slate-500">{{ s }}</p>
          </div>
        </div>

        <div class="space-y-0.5">
          <div class="flex justify-between items-center py-2 border-b border-slate-100 text-sm">
            <span class="text-slate-500">Skor urgensi</span>
            <StatusPill :status="hasil.urgensi" />
          </div>
          <div class="flex justify-between py-2 border-b border-slate-100 text-sm">
            <span class="text-slate-500">Relawan ditugaskan</span>
            <span class="font-medium text-navy-900">{{ hasil.relawan }}</span>
          </div>
          <div class="flex justify-between py-2 text-sm">
            <span class="text-slate-500">Estimasi tiba</span>
            <span class="font-medium text-navy-900">{{ hasil.estimasi }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.divider { height: 1px; background: #EEF2F7; margin: 16px 0; }
</style>
