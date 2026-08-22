import { createRouter, createWebHashHistory } from 'vue-router'
import { roleHomePath } from '../composables/useRole'

const routes = [
  { path: '/', redirect: () => roleHomePath.admin },

  // ===== WARGA =====
  { path: '/warga/peta-utama', name: 'w-peta', component: () => import('../views/warga/PetaUtamaView.vue'), meta: { title: 'Peta Utama', role: 'warga' } },
  { path: '/warga/lapor-bantuan', name: 'w-lapor', component: () => import('../views/warga/LaporBantuanView.vue'), meta: { title: 'Lapor Bantuan', role: 'warga' } },
  { path: '/warga/cek-status', name: 'w-cek', component: () => import('../views/warga/CekStatusView.vue'), meta: { title: 'Cek Status Laporan', role: 'warga' } },
  { path: '/warga/info-edukasi', name: 'w-info', component: () => import('../views/warga/InfoEdukasiView.vue'), meta: { title: 'Info & Edukasi', role: 'warga' } },
  { path: '/warga/tentang', name: 'w-tentang', component: () => import('../views/warga/TentangSumberDataView.vue'), meta: { title: 'Tentang & Sumber Data', role: 'warga' } },

  // ===== RELAWAN =====
  { path: '/relawan/dashboard-tugas', name: 'r-dashboard', component: () => import('../views/relawan/DashboardTugasView.vue'), meta: { title: 'Dashboard Tugas', role: 'relawan' } },
  { path: '/relawan/rute-aktif', name: 'r-rute', component: () => import('../views/relawan/RuteAktifView.vue'), meta: { title: 'Rute Aktif', role: 'relawan' } },
  { path: '/relawan/update-status', name: 'r-update', component: () => import('../views/relawan/UpdateStatusView.vue'), meta: { title: 'Update Status', role: 'relawan' } },
  { path: '/relawan/riwayat-tugas', name: 'r-riwayat', component: () => import('../views/relawan/RiwayatTugasView.vue'), meta: { title: 'Riwayat Tugas', role: 'relawan' } },
  { path: '/relawan/profil', name: 'r-profil', component: () => import('../views/relawan/ProfilSayaView.vue'), meta: { title: 'Profil Saya', role: 'relawan' } },

  // ===== ADMIN =====
  { path: '/admin/dashboard', name: 'a-dashboard', component: () => import('../views/admin/DashboardView.vue'), meta: { title: 'Dashboard Ringkasan', role: 'admin', group: 'Menu Utama' } },
  { path: '/admin/peta-operasional', name: 'a-peta', component: () => import('../views/admin/PetaOperasionalView.vue'), meta: { title: 'Peta Operasional', role: 'admin', group: 'Menu Utama' } },

  { path: '/admin/simulasi-rute', name: 'a-simulasi', component: () => import('../views/admin/SimulasiRuteView.vue'), meta: { title: 'Simulasi Rute Bantuan', role: 'admin', group: 'Perencanaan Rute', badge: 'BARU' } },
  { path: '/admin/manajemen-rute', name: 'a-rute', component: () => import('../views/admin/ManajemenRuteView.vue'), meta: { title: 'Manajemen Rute', role: 'admin', group: 'Perencanaan Rute' } },

  { path: '/admin/manajemen-laporan', name: 'a-laporan', component: () => import('../views/admin/ManajemenLaporanView.vue'), meta: { title: 'Manajemen Laporan', role: 'admin', group: 'Data & Laporan' } },
  { path: '/admin/zona-terdampak', name: 'a-zona', component: () => import('../views/admin/ZonaTerdampakView.vue'), meta: { title: 'Zona Terdampak', role: 'admin', group: 'Data & Laporan' } },
  { path: '/admin/status-jaringan-jalan', name: 'a-jalan', component: () => import('../views/admin/StatusJaringanJalanView.vue'), meta: { title: 'Status Jaringan Jalan', role: 'admin', group: 'Data & Laporan' } },

  { path: '/admin/gudang-logistik', name: 'a-gudang', component: () => import('../views/admin/GudangLogistikView.vue'), meta: { title: 'Gudang Logistik', role: 'admin', group: 'Sumber Daya' } },
  { path: '/admin/manajemen-relawan', name: 'a-relawan', component: () => import('../views/admin/ManajemenRelawanView.vue'), meta: { title: 'Manajemen Relawan', role: 'admin', group: 'Sumber Daya' } },
  { path: '/admin/laporan-statistik', name: 'a-statistik', component: () => import('../views/admin/LaporanStatistikView.vue'), meta: { title: 'Laporan & Statistik', role: 'admin', group: 'Sumber Daya' } },

  { path: '/admin/integrasi-sumber-data', name: 'a-integrasi', component: () => import('../views/admin/IntegrasiSumberDataView.vue'), meta: { title: 'Integrasi & Sumber Data', role: 'admin', group: 'Sistem', badge: 'BARU' } },
  { path: '/admin/pengaturan', name: 'a-pengaturan', component: () => import('../views/admin/PengaturanView.vue'), meta: { title: 'Pengaturan', role: 'admin', group: 'Sistem' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
