<script setup>
defineProps({
  open: { type: Boolean, default: false },
})
defineEmits(['close'])

const nav = [
  { to: '/dashboard', label: 'Beranda', icon: 'home' },
  { to: '/peta-operasional', label: 'Peta Operasional', icon: 'map' },
  { to: '/manajemen-laporan', label: 'Manajemen Laporan', icon: 'clipboard' },
  { to: '/manajemen-rute', label: 'Manajemen Rute', icon: 'route' },
  { to: '/zona-terdampak', label: 'Zona Terdampak', icon: 'alertTriangle' },
  { to: '/status-jaringan-jalan', label: 'Status Jaringan Jalan', icon: 'road' },
  { to: '/gudang-logistik', label: 'Gudang Logistik', icon: 'warehouse' },
  { to: '/manajemen-relawan', label: 'Manajemen Relawan', icon: 'users' },
  { to: '/laporan-statistik', label: 'Laporan & Statistik', icon: 'barChart' },
  { to: '/integrasi-sumber-data', label: 'Integrasi & Sumber Data', icon: 'plug' },
]
</script>

<template>
  <!-- Mobile overlay -->
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
    <div class="flex items-center gap-3 px-6 py-6 border-b border-white/10">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-200 to-white flex items-center justify-center shrink-0">
        <Icon name="layers" class="w-5 h-5 text-brand-800" />
      </div>
      <div class="min-w-0">
        <p class="font-display font-bold text-sm leading-tight truncate">SIGAP Rute DIY</p>
        <p class="text-[11px] text-brand-200 truncate">Posko Bantuan Bencana</p>
      </div>
      <button class="ml-auto lg:hidden text-white/70 hover:text-white" @click="$emit('close')">
        <Icon name="x" class="w-5 h-5" />
      </button>
    </div>

    <!-- Nav -->
    <nav class="flex-1 overflow-y-auto scrollbar-none px-3 py-4 space-y-1">
      <p class="section-label text-brand-200/70 px-3 pt-1 pb-2">Menu Utama</p>
      <RouterLink
        v-for="item in nav"
        :key="item.to"
        :to="item.to"
        class="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-brand-100/85 hover:bg-white/10 hover:text-white transition-colors"
        active-class="!bg-white !text-navy-900 shadow-sm"
        @click="$emit('close')"
      >
        <Icon :name="item.icon" class="w-[18px] h-[18px] shrink-0" />
        <span class="truncate">{{ item.label }}</span>
      </RouterLink>

      <p class="section-label text-brand-200/70 px-3 pt-4 pb-2">Lainnya</p>
      <RouterLink
        to="/pengaturan"
        class="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-brand-100/85 hover:bg-white/10 hover:text-white transition-colors"
        active-class="!bg-white !text-navy-900 shadow-sm"
        @click="$emit('close')"
      >
        <Icon name="settings" class="w-[18px] h-[18px] shrink-0" />
        <span>Pengaturan</span>
      </RouterLink>
    </nav>

    <!-- User / logout -->
    <div class="px-3 py-4 border-t border-white/10">
      <div class="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 cursor-pointer transition-colors">
        <div class="w-9 h-9 rounded-full bg-brand-400 flex items-center justify-center text-sm font-semibold shrink-0">A</div>
        <div class="min-w-0 flex-1">
          <p class="text-sm font-medium truncate">Admin Posko</p>
          <p class="text-[11px] text-brand-200 truncate">BPBD DIY</p>
        </div>
        <Icon name="logOut" class="w-4 h-4 text-brand-200 shrink-0" />
      </div>
    </div>
  </aside>
</template>
