<script setup>
import { ref, reactive } from 'vue'
import { relawan, titikBencana } from '../../data/dummyData'
import { useToast } from '../../composables/useToast'

const { showToast } = useToast()

const detail = ref(null)

const showAssign = ref(false)
const assignForm = reactive({ relawan: relawan[0]?.nama || '', titik: titikBencana[0]?.nama || '' })

function submitAssign() {
  showAssign.value = false
  showToast(`${assignForm.relawan} ditugaskan ke ${assignForm.titik}`)
}
</script>

<template>
  <div>
    <PageHeader title="Manajemen Relawan" subtitle="Daftar tim relawan dan status penugasan di lapangan.">
      <template #actions>
        <button class="btn-primary" @click="showAssign = true"><Icon name="users" class="w-4 h-4" /> Assign Tugas</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      <div v-for="r in relawan" :key="r.nama" class="card p-5">
        <div class="flex items-center justify-between mb-3">
          <div class="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
            <Icon name="users" class="w-5 h-5" />
          </div>
          <StatusPill :status="r.status" />
        </div>
        <h4 class="font-display font-bold text-navy-900">{{ r.nama }}</h4>
        <p class="text-xs text-slate-400 mt-0.5">{{ r.anggota }} anggota · {{ r.wilayahTugas }}</p>
        <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
          <p class="text-xs text-slate-500">{{ r.kontak }}</p>
          <button @click="detail = r" class="text-xs font-semibold text-brand-700 hover:text-brand-800">Detail →</button>
        </div>
      </div>
    </div>

    <!-- Modal Detail -->
    <ModalShell v-if="detail" title="Detail Relawan" @close="detail = null">
      <div class="space-y-3 text-sm">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
            <Icon name="users" class="w-6 h-6" />
          </div>
          <div>
            <p class="font-display font-bold text-navy-900">{{ detail.nama }}</p>
            <StatusPill :status="detail.status" />
          </div>
        </div>
        <div class="kv-row"><span class="text-slate-500">Jumlah Anggota</span><span class="font-medium text-navy-900">{{ detail.anggota }} orang</span></div>
        <div class="kv-row"><span class="text-slate-500">Wilayah Tugas</span><span class="font-medium text-navy-900">{{ detail.wilayahTugas }}</span></div>
        <div class="kv-row"><span class="text-slate-500">Kontak</span><span class="font-medium text-navy-900">{{ detail.kontak }}</span></div>
        <button class="btn-secondary w-full mt-3" @click="detail = null">Tutup</button>
      </div>
    </ModalShell>

    <!-- Modal Assign -->
    <ModalShell v-if="showAssign" title="Assign Tugas Relawan" @close="showAssign = false">
      <div class="space-y-4">
        <div>
          <label class="section-label block mb-1.5">Pilih Relawan</label>
          <select v-model="assignForm.relawan" class="input-field">
            <option v-for="r in relawan" :key="r.nama">{{ r.nama }}</option>
          </select>
        </div>
        <div>
          <label class="section-label block mb-1.5">Titik Tugas</label>
          <select v-model="assignForm.titik" class="input-field">
            <option v-for="t in titikBencana" :key="t.id">{{ t.nama }}</option>
          </select>
        </div>
        <div class="flex gap-2 pt-2">
          <button class="btn-secondary flex-1" @click="showAssign = false">Batal</button>
          <button class="btn-primary flex-1" @click="submitAssign">Tugaskan</button>
        </div>
      </div>
    </ModalShell>
  </div>
</template>

<style scoped>
.kv-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #F1F5F9;
}
.kv-row:last-of-type { border-bottom: none; }
</style>
