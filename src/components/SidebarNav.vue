<script setup>
import Icon from './Icon.vue'

const links = [
  { to: '/', label: 'Peta utama', icon: 'map' },
  { to: '/lapor', label: 'Lapor bantuan', icon: 'campaign' },
  { to: '/dashboard', label: 'Dashboard admin', icon: 'dashboard' },
  { to: '/status', label: 'Status laporan', icon: 'fact_check' }
]
</script>

<template>
  <!-- Desktop sidebar -->
  <aside class="hidden md:flex md:flex-col md:w-60 md:shrink-0 bg-[#0B2338] text-white h-screen sticky top-0">
    <div class="h-16 flex items-center gap-2 px-5 border-b border-white/10">
      <Icon name="emergency_home" :size="26" class="text-secondary" />
      <span class="font-heading font-bold text-lg tracking-tight">SIGAP Peta</span>
    </div>

    <nav class="flex-1 py-4 px-3 space-y-1">
      <router-link
        v-for="l in links" :key="l.to" :to="l.to"
        class="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors"
        active-class="!bg-secondary/15 !text-white"
      >
        <Icon :name="l.icon" :size="20" />
        {{ l.label }}
      </router-link>
    </nav>

    <div class="px-5 py-4 border-t border-white/10 text-xs text-white/40">
      Wilayah studi: Daerah Istimewa Yogyakarta
    </div>
  </aside>

  <!-- Mobile top bar -->
  <header class="md:hidden bg-[#0B2338] text-white h-14 flex items-center px-4 sticky top-0 z-[1000]">
    <Icon name="emergency_home" :size="24" class="text-secondary" />
    <span class="font-heading font-bold text-base ml-2">SIGAP Peta</span>
  </header>

  <!-- Mobile bottom tab bar -->
  <nav class="md:hidden fixed bottom-0 left-0 right-0 z-[1000] bg-[#0B2338] border-t border-white/10 flex">
    <router-link
      v-for="l in links" :key="l.to" :to="l.to"
      class="flex-1 flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium text-white/60"
      active-class="!text-white"
    >
      <Icon :name="l.icon" :size="22" />
      {{ l.label.split(' ')[0] }}
    </router-link>
  </nav>
</template>
