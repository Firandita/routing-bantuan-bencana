<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useRole, roleLabel, roleHomePath } from '../composables/useRole'

defineProps({
  open: { type: Boolean, default: false },
})
defineEmits(['close'])

const router = useRouter()
const { currentRole, setRole } = useRole()

function switchRole(role) {
  setRole(role)
  router.push(roleHomePath[role])
}

const navConfig = {
  warga: {
    groups: [
      {
        label: 'Menu Utama',
        items: [
          { to: '/warga/peta-utama', label: 'Peta Utama', icon: 'map' },
          { to: '/warga/lapor-bantuan', label: 'Lapor Bantuan', icon: 'alertTriangle' },
          { to: '/warga/cek-status', label: 'Cek Status Laporan', icon: 'search' },
          { to: '/warga/info-edukasi', label: 'Info & Edukasi', icon: 'book' },
          { to: '/warga/tentang', label: 'Tentang & Sumber Data', icon: 'wifi', badge: 'BARU' },
        ],
      },
    ],
  },
  relawan: {
    groups: [
      {
        label: 'Menu Utama',
        items: [
          { to: '/relawan/dashboard-tugas', label: 'Dashboard Tugas', icon: 'home' },
          { to: '/relawan/rute-aktif', label: 'Rute Aktif', icon: 'route' },
          { to: '/relawan/update-status', label: 'Update Status', icon: 'checkCircle' },
          { to: '/relawan/riwayat-tugas', label: 'Riwayat Tugas', icon: 'clock' },
          { to: '/relawan/profil', label: 'Profil Saya', icon: 'users' },
        ],
      },
    ],
  },
  admin: {
    groups: [
      {
        label: 'Menu Utama',
        items: [
          { to: '/admin/dashboard', label: 'Dashboard Ringkasan', icon: 'home' },
          { to: '/admin/peta-operasional', label: 'Peta Operasional', icon: 'map' },
        ],
      },
      {
        label: 'Perencanaan Rute',
        items: [
          { to: '/admin/simulasi-rute', label: 'Simulasi Rute Bantuan', icon: 'compass', badge: 'BARU' },
          { to: '/admin/manajemen-rute', label: 'Manajemen Rute', icon: 'route' },
        ],
      },
      {
        label: 'Data & Laporan',
        items: [
          { to: '/admin/manajemen-laporan', label: 'Manajemen Laporan', icon: 'clipboard' },
          { to: '/admin/zona-terdampak', label: 'Zona Terdampak', icon: 'alertTriangle' },
          { to: '/admin/status-jaringan-jalan', label: 'Status Jaringan Jalan', icon: 'road' },
        ],
      },
      {
        label: 'Sumber Daya',
        items: [
          { to: '/admin/gudang-logistik', label: 'Gudang Logistik', icon: 'warehouse' },
          { to: '/admin/manajemen-relawan', label: 'Manajemen Relawan', icon: 'users' },
          { to: '/admin/laporan-statistik', label: 'Laporan & Statistik', icon: 'barChart' },
        ],
      },
      {
        label: 'Sistem',
        items: [
          { to: '/admin/integrasi-sumber-data', label: 'Integrasi & Sumber Data', icon: 'plug', badge: 'BARU' },
          { to: '/admin/pengaturan', label: 'Pengaturan', icon: 'settings' },
        ],
      },
    ],
  },
}

const groups = computed(() => navConfig[currentRole.value].groups)

const roleInitial = computed(() => roleLabel[currentRole.value][0])
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 bg-navy-950/50 backdrop-blur-sm z-30 lg:hidden"
    @click="$emit('close')"
  />

  <aside
    class="fixed lg:sticky top-0 left-0 h-screen w-72 z-40 bg-sidebar-gradient text-white flex flex-col
           transition-transform duration-300 ease-out shrink-0"
    :class="open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
  >
    <!-- Brand -->
    <div class="flex items-center gap-3 px-5 pt-5 pb-4">
      <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center shrink-0">
        <Icon name="layers" class="w-4.5 h-4.5 text-white" />
      </div>
      <div class="min-w-0">
        <p class="font-display font-bold text-[15px] leading-tight truncate">SIGAP Rute DIY</p>
        <p class="text-[10.5px] text-brand-200/80 truncate mt-0.5">Posko Bantuan Bencana</p>
      </div>
      <button class="ml-auto lg:hidden text-white/70 hover:text-white" @click="$emit('close')">
        <Icon name="x" class="w-5 h-5" />
      </button>
    </div>

    <!-- Role switcher -->
    <div class="mx-4 mb-3 bg-white/[0.06] rounded-[10px] p-1 flex gap-0.5">
      <button
        v-for="r in ['warga', 'relawan', 'admin']"
        :key="r"
        @click="switchRole(r)"
        class="flex-1 text-[11.5px] font-semibold py-1.5 rounded-[7px] transition-colors"
        :class="currentRole === r ? 'bg-white text-navy-800' : 'text-brand-200/80 hover:text-white'"
      >
        {{ roleLabel[r] }}
      </button>
    </div>

    <!-- Nav -->
    <nav class="flex-1 overflow-y-auto scrollbar-none px-3 py-1">
      <template v-for="group in groups" :key="group.label">
        <p class="section-label text-brand-200/60 px-3 pt-3.5 pb-1.5">{{ group.label }}</p>
        <RouterLink
          v-for="item in group.items"
          :key="item.to"
          :to="item.to"
          class="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.4px] font-medium text-brand-100/85 hover:bg-white/[0.06] hover:text-white transition-colors mb-0.5"
          active-class="!bg-white !text-navy-800 shadow-sm"
          @click="$emit('close')"
        >
          <Icon :name="item.icon" class="w-[17px] h-[17px] shrink-0 opacity-85" />
          <span class="truncate">{{ item.label }}</span>
          <span v-if="item.badge" class="ml-auto text-[8.5px] font-bold bg-amber-500 text-amber-950 px-1.5 py-0.5 rounded">{{ item.badge }}</span>
        </RouterLink>
      </template>
    </nav>

    <!-- User / sync -->
    <div class="px-4 py-4 border-t border-white/10">
      <div class="flex items-center gap-2 text-[11px] text-brand-200/80 mb-3">
        <span class="relative flex h-1.5 w-1.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
        </span>
        3 dari 4 sumber data tersambung
      </div>
      <div class="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/[0.06] cursor-pointer transition-colors">
        <div class="w-9 h-9 rounded-full bg-brand-500 flex items-center justify-center text-sm font-semibold shrink-0">{{ roleInitial }}</div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium truncate">{{ currentRole === 'admin' ? 'Admin Posko' : currentRole === 'relawan' ? 'Relawan Lapangan' : 'Warga' }}</p>
          <p class="text-[11px] text-brand-200/80 truncate">{{ roleLabel[currentRole] }} · BPBD DIY</p>
        </div>
        <Icon name="logOut" class="w-4 h-4 text-brand-200/80 shrink-0" />
      </div>
    </div>
  </aside>
</template>
