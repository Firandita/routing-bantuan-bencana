<script setup>
import { reactive } from 'vue'
import { useToast } from '../../composables/useToast'

const { showToast } = useToast()

const form = reactive({
  nama: 'Bimo Aji Nugroho',
  tim: 'Relawan Independen — Cluster Umbulharjo',
  noHp: '0812xxxxxxx',
})

function simpan() {
  showToast('Profil berhasil diperbarui')
}
</script>

<template>
  <div>
    <PageHeader title="Profil Saya" subtitle="Kelola data diri dan afiliasi timmu." />

    <div class="card p-5 max-w-lg">
      <div class="space-y-4">
        <div>
          <label class="section-label block mb-1.5">Nama</label>
          <input v-model="form.nama" type="text" class="input-field" />
        </div>
        <div>
          <label class="section-label block mb-1.5">Tim / Organisasi</label>
          <input v-model="form.tim" type="text" class="input-field" />
        </div>
        <div>
          <label class="section-label block mb-1.5">No. HP</label>
          <input v-model="form.noHp" type="text" class="input-field" />
        </div>
        <button class="btn-primary" @click="simpan">Simpan Perubahan</button>
      </div>
    </div>
  </div>
</template>
