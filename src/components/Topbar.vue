<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'

defineEmits(['toggle-sidebar'])
const route = useRoute()

const now = ref(new Date())
let timer
onMounted(() => {
  timer = setInterval(() => (now.value = new Date()), 1000 * 30)
})
onUnmounted(() => clearInterval(timer))

const greeting = computed(() => {
  const h = now.value.getHours()
  if (h < 11) return 'Selamat Pagi'
  if (h < 15) return 'Selamat Siang'
  if (h < 18) return 'Selamat Sore'
  return 'Selamat Malam'
})

const tanggal = computed(() =>
  now.value.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
)
const jam = computed(() => now.value.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }))
</script>

<template>
  <header class="relative bg-navy-900">
    <div class="relative px-4 sm:px-6 lg:px-8 pt-6 pb-7">
      <div class="flex items-start justify-between gap-4">
        <div class="flex items-center gap-3 min-w-0">
          <button
            class="lg:hidden w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center text-white shrink-0"
            @click="$emit('toggle-sidebar')"
          >
            <Icon name="menu" class="w-5 h-5" />
          </button>
          <div class="min-w-0">
            <p class="text-white/70 text-xs font-medium tracking-wide uppercase">{{ route.meta?.title || 'Dashboard' }}</p>
            <h1 class="font-display font-bold text-white text-xl sm:text-2xl truncate">
              {{ greeting }}, Admin
            </h1>
            <p class="text-white/70 text-xs sm:text-sm mt-0.5">{{ tanggal }} · {{ jam }} WIB</p>
          </div>
        </div>

        <div class="flex items-center gap-2 sm:gap-3 shrink-0">
          <div class="hidden md:flex items-center gap-2 bg-white/15 backdrop-blur rounded-xl px-3 py-2 text-white/90 text-xs">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            Sinkron data aktif
          </div>
          <button class="w-9 h-9 rounded-lg bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors">
            <Icon name="bell" class="w-[18px] h-[18px]" />
          </button>
          <div class="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-brand-800 font-display font-bold text-sm">
            A
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
