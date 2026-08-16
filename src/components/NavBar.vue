<script setup>
import { ref } from 'vue'
const open = ref(false)
const links = [
  { to: '/', label: 'Peta Utama' },
  { to: '/lapor', label: 'Lapor Bantuan' },
  { to: '/dashboard', label: 'Dashboard Admin' },
  { to: '/status', label: 'Status Laporan' }
]
</script>

<template>
  <header class="bg-primary text-white sticky top-0 z-[1000]">
    <div class="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
      <router-link to="/" class="font-heading font-bold text-lg tracking-tight">
        SIGAP <span class="text-secondary">Peta</span>
      </router-link>

      <nav class="hidden md:flex items-center gap-6 text-sm font-medium">
        <router-link
          v-for="l in links" :key="l.to" :to="l.to"
          class="hover:text-secondary transition-colors"
          active-class="text-secondary"
        >{{ l.label }}</router-link>
      </nav>

      <button class="md:hidden" @click="open = !open" aria-label="Buka menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <nav v-if="open" class="md:hidden bg-primary border-t border-white/10 px-4 pb-3 flex flex-col gap-2 text-sm font-medium">
      <router-link v-for="l in links" :key="l.to" :to="l.to" @click="open = false" class="py-2">
        {{ l.label }}
      </router-link>
    </nav>
  </header>
</template>
