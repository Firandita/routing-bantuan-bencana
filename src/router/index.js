import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', name: 'dashboard', component: () => import('../views/DashboardView.vue'), meta: { title: 'Dashboard Ringkasan' } },
  { path: '/peta-operasional', name: 'peta-operasional', component: () => import('../views/PetaOperasionalView.vue'), meta: { title: 'Peta Operasional' } },
  { path: '/manajemen-laporan', name: 'manajemen-laporan', component: () => import('../views/ManajemenLaporanView.vue'), meta: { title: 'Manajemen Laporan' } },
  { path: '/manajemen-rute', name: 'manajemen-rute', component: () => import('../views/ManajemenRuteView.vue'), meta: { title: 'Manajemen Rute' } },
  { path: '/zona-terdampak', name: 'zona-terdampak', component: () => import('../views/ZonaTerdampakView.vue'), meta: { title: 'Zona Terdampak' } },
  { path: '/status-jaringan-jalan', name: 'status-jaringan-jalan', component: () => import('../views/StatusJaringanJalanView.vue'), meta: { title: 'Status Jaringan Jalan' } },
  { path: '/gudang-logistik', name: 'gudang-logistik', component: () => import('../views/GudangLogistikView.vue'), meta: { title: 'Gudang Logistik' } },
  { path: '/manajemen-relawan', name: 'manajemen-relawan', component: () => import('../views/ManajemenRelawanView.vue'), meta: { title: 'Manajemen Relawan' } },
  { path: '/laporan-statistik', name: 'laporan-statistik', component: () => import('../views/LaporanStatistikView.vue'), meta: { title: 'Laporan & Statistik' } },
  { path: '/integrasi-sumber-data', name: 'integrasi-sumber-data', component: () => import('../views/IntegrasiSumberDataView.vue'), meta: { title: 'Integrasi & Sumber Data' } },
  { path: '/pengaturan', name: 'pengaturan', component: () => import('../views/PengaturanView.vue'), meta: { title: 'Pengaturan' } },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
