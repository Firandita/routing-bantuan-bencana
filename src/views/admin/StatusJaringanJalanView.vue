<script setup>
import { ref, reactive } from 'vue'
import { statusJaringanJalan } from '../../data/dummyData'
import { useToast } from '../../composables/useToast'

const { showToast } = useToast()
const rows = ref(statusJaringanJalan)
const kondisiOptions = ['Lancar', 'Tertutup Sebagian', 'Tertutup Total', 'Tergenang']

// ===== Modal: Edit ruas =====
const editIndex = ref(null)
const editForm = reactive({ ruas: '', kondisi: '', jenisGangguan: '' })

function openEdit(i) {
  editIndex.value = i
  Object.assign(editForm, rows.value[i])
}
function saveEdit() {
  rows.value[editIndex.value] = { ...rows.value[editIndex.value], ...editForm, updateTerakhir: 'Baru saja' }
  editIndex.value = null
  showToast('Status ruas jalan diperbarui')
}

// ===== Modal: Tambah ruas =====
const showAdd = ref(false)
const addForm = reactive({ ruas: '', kondisi: 'Lancar', jenisGangguan: '' })

function submitAdd() {
  if (!addForm.ruas.trim()) {
    showToast('Nama ruas jalan wajib diisi', 'error')
    return
  }
  rows.value.unshift({ ...addForm, updateTerakhir: 'Baru saja', sumber: 'Internal' })
  addForm.ruas = ''
  addForm.kondisi = 'Lancar'
  addForm.jenisGangguan = ''
  showAdd.value = false
  showToast('Update ruas jalan ditambahkan')
}
</script>

<template>
  <div>
    <PageHeader
      title="Status Jaringan Jalan"
      subtitle="Perbarui kondisi ruas jalan agar bobot rute pada Manajemen Rute selalu mengikuti kondisi terkini."
    >
      <template #actions>
        <button class="btn-primary" @click="showAdd = true"><Icon name="road" class="w-4 h-4" /> Tambah Update Ruas</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
      <div v-for="k in kondisiOptions" :key="k" class="card p-4">
        <p class="section-label mb-1">{{ k }}</p>
        <p class="font-display font-bold text-xl text-navy-900">{{ rows.filter(r => r.kondisi === k).length }} ruas</p>
      </div>
    </div>

    <div class="card overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-[11px] uppercase tracking-wide text-slate-400 border-b border-slate-100 bg-slate-50/60">
            <th class="px-4 py-3 font-medium">Ruas Jalan</th>
            <th class="px-4 py-3 font-medium">Kondisi</th>
            <th class="px-4 py-3 font-medium">Jenis Gangguan</th>
            <th class="px-4 py-3 font-medium">Update Terakhir</th>
            <th class="px-4 py-3 font-medium">Sumber</th>
            <th class="px-4 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, i) in rows" :key="i" class="border-b border-slate-50 last:border-0 hover:bg-slate-50/60">
            <td class="px-4 py-3 font-medium text-navy-900">{{ r.ruas }}</td>
            <td class="px-4 py-3"><StatusPill :status="r.kondisi" /></td>
            <td class="px-4 py-3 text-slate-500">{{ r.jenisGangguan }}</td>
            <td class="px-4 py-3 text-slate-400">{{ r.updateTerakhir }}</td>
            <td class="px-4 py-3"><SourceBadge :sumber="r.sumber" /></td>
            <td class="px-4 py-3 text-right">
              <button @click="openEdit(i)" class="text-xs font-semibold text-brand-700 hover:text-brand-800">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Edit -->
    <ModalShell v-if="editIndex !== null" title="Edit Status Ruas Jalan" @close="editIndex = null">
      <div class="space-y-4">
        <div>
          <label class="section-label block mb-1.5">Ruas Jalan</label>
          <input v-model="editForm.ruas" type="text" class="input-field" />
        </div>
        <div>
          <label class="section-label block mb-1.5">Kondisi</label>
          <select v-model="editForm.kondisi" class="input-field">
            <option v-for="k in kondisiOptions" :key="k">{{ k }}</option>
          </select>
        </div>
        <div>
          <label class="section-label block mb-1.5">Jenis Gangguan</label>
          <input v-model="editForm.jenisGangguan" type="text" class="input-field" placeholder="mis. Material longsoran" />
        </div>
        <div class="flex gap-2 pt-2">
          <button class="btn-secondary flex-1" @click="editIndex = null">Batal</button>
          <button class="btn-primary flex-1" @click="saveEdit">Simpan</button>
        </div>
      </div>
    </ModalShell>

    <!-- Modal Tambah -->
    <ModalShell v-if="showAdd" title="Tambah Update Ruas Jalan" @close="showAdd = false">
      <div class="space-y-4">
        <div>
          <label class="section-label block mb-1.5">Ruas Jalan</label>
          <input v-model="addForm.ruas" type="text" class="input-field" placeholder="mis. Posko Bantul — Dlingo" />
        </div>
        <div>
          <label class="section-label block mb-1.5">Kondisi</label>
          <select v-model="addForm.kondisi" class="input-field">
            <option v-for="k in kondisiOptions" :key="k">{{ k }}</option>
          </select>
        </div>
        <div>
          <label class="section-label block mb-1.5">Jenis Gangguan</label>
          <input v-model="addForm.jenisGangguan" type="text" class="input-field" placeholder="mis. Genangan 40 cm" />
        </div>
        <div class="flex gap-2 pt-2">
          <button class="btn-secondary flex-1" @click="showAdd = false">Batal</button>
          <button class="btn-primary flex-1" @click="submitAdd">Tambahkan</button>
        </div>
      </div>
    </ModalShell>
  </div>
</template>
