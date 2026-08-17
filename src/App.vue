<script setup>
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Topbar from './components/Topbar.vue'

const sidebarOpen = ref(false)
</script>

<template>
  <div class="flex min-h-screen">
    <Sidebar :open="sidebarOpen" @close="sidebarOpen = false" />

    <div class="flex-1 min-w-0 flex flex-col">
      <Topbar @toggle-sidebar="sidebarOpen = true" />

      <main class="flex-1 px-4 sm:px-6 lg:px-8 py-6 -mt-3">
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>

      <footer class="px-4 sm:px-6 lg:px-8 py-5 text-center text-xs text-slate-400 border-t border-slate-100 bg-white">
        Sumber data: BNPB · BPBD DIY · InaRISK · DIBI-BNPB · INA-LOGPAL (mitra integrasi) —
        SIGAP Rute DIY, sistem integrator di atas platform kebencanaan resmi.
      </footer>
    </div>
  </div>
</template>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
