<script setup>
import { relawan } from '../../data/dummyData'
const roles = [
  { nama: 'Admin Posko', jumlah: 4, deskripsi: 'Akses penuh: verifikasi laporan, kelola rute, kelola integrasi data' },
  { nama: 'Admin Teknis', jumlah: 2, deskripsi: 'Akses khusus menu Integrasi & Sumber Data' },
  { nama: 'Relawan Lapangan', jumlah: relawan.reduce((a, r) => a + r.anggota, 0), deskripsi: 'Akses dashboard tugas dan update status penyaluran' },
]
</script>

<template>
  <div>
    <PageHeader title="Pengaturan" subtitle="Kelola akun, role, dan izin pengguna sistem." />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card p-5">
        <h3 class="font-display font-bold text-navy-900 text-sm mb-4">Profil Akun</h3>
        <div class="space-y-4">
          <div>
            <label class="section-label block mb-1.5">Nama</label>
            <input type="text" value="Admin Posko" class="input-field" />
          </div>
          <div>
            <label class="section-label block mb-1.5">Instansi</label>
            <input type="text" value="BPBD DIY" class="input-field" />
          </div>
          <div>
            <label class="section-label block mb-1.5">Email</label>
            <input type="email" value="admin.posko@bpbd.jogjaprov.go.id" class="input-field" />
          </div>
          <button class="btn-primary">Simpan Perubahan</button>
        </div>
      </div>

      <div class="card p-5">
        <h3 class="font-display font-bold text-navy-900 text-sm mb-4">Role & Izin Pengguna</h3>
        <div class="space-y-3">
          <div v-for="r in roles" :key="r.nama" class="rounded-xl border border-slate-100 p-3.5">
            <div class="flex items-center justify-between mb-1">
              <p class="text-sm font-semibold text-navy-900">{{ r.nama }}</p>
              <span class="badge-internal">{{ r.jumlah }} pengguna</span>
            </div>
            <p class="text-xs text-slate-500">{{ r.deskripsi }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
