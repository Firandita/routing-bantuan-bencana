<script setup>
import { ref } from 'vue'
import { tugasRelawan } from '../../data/dummyData'
import { useToast } from '../../composables/useToast'

const { showToast } = useToast()
const tujuan = tugasRelawan[0]
const step = ref(2) // 0=Ditugaskan, 1=Menuju lokasi, 2=Sampai, 3=Selesai
const steps = ['Ditugaskan', 'Menuju Lokasi', 'Sampai', 'Selesai']

function nextStep() {
  if (step.value < steps.length - 1) {
    step.value++
    showToast(`Status diperbarui: ${steps[step.value]}`)
  }
}
</script>

<template>
  <div>
    <PageHeader title="Update Status" subtitle="Perbarui progres penyaluran bantuan secara real-time." />

    <div class="card p-5 max-w-lg">
      <p class="text-sm text-slate-500 mb-5">{{ tujuan.lokasi }} — {{ tujuan.jiwa }} jiwa</p>

      <div class="flex items-center mb-6">
        <div v-for="(s, i) in steps" :key="s" class="flex-1 text-center relative">
          <div v-if="i > 0" class="absolute top-[13px] left-[-50%] w-full h-0.5" :class="i <= step ? 'bg-brand-700' : 'bg-slate-200'" />
          <div
            class="relative z-10 w-7 h-7 rounded-full mx-auto mb-1.5 flex items-center justify-center text-xs font-bold"
            :class="i <= step ? 'bg-brand-700 text-white' : 'bg-slate-100 text-slate-400'"
          >
            <Icon v-if="i < step" name="check" class="w-3.5 h-3.5" />
            <span v-else>{{ i + 1 }}</span>
          </div>
          <p class="text-[10.5px] font-semibold text-slate-500">{{ s }}</p>
        </div>
      </div>

      <button v-if="step < steps.length - 1" class="btn-primary w-full justify-center" @click="nextStep">
        Tandai "{{ steps[step + 1] }}"
      </button>
      <div v-else class="text-center text-sm font-semibold text-green-600 flex items-center justify-center gap-1.5">
        <Icon name="checkCircle" class="w-4 h-4" /> Tugas telah selesai
      </div>
    </div>
  </div>
</template>
