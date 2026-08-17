<script setup>
defineProps({
  laporan: { type: Object, default: null },
})
defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <div v-if="laporan" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-navy-950/40 backdrop-blur-sm" @click="$emit('close')" />
      <div class="relative w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-card-hover border border-white/80 p-6">
        <div class="flex items-start justify-between mb-1">
          <div>
            <p class="text-xs text-slate-400">{{ laporan.id }}</p>
            <h3 class="font-display font-bold text-lg text-navy-900">{{ laporan.nama }}</h3>
          </div>
          <button @click="$emit('close')" class="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center shrink-0">
            <Icon name="x" class="w-4 h-4" />
          </button>
        </div>
        <p class="text-xs text-slate-500 mb-4">Penerima: {{ laporan.penerima }}</p>

        <div class="rounded-xl border border-slate-100 overflow-hidden">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-[11px] uppercase tracking-wide text-slate-400 bg-slate-50/80 border-b border-slate-100">
                <th class="px-3 py-2.5 font-medium">Item</th>
                <th class="px-3 py-2.5 font-medium">Jumlah</th>
                <th class="px-3 py-2.5 font-medium">Catatan</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(r, i) in laporan.rincianBantuan" :key="i" class="border-b border-slate-50 last:border-0">
                <td class="px-3 py-2.5 font-medium text-navy-900">{{ r.item }}</td>
                <td class="px-3 py-2.5 text-slate-600 whitespace-nowrap">{{ r.jumlah }} {{ r.satuan }}</td>
                <td class="px-3 py-2.5 text-slate-500">{{ r.catatan }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button class="btn-secondary w-full mt-4" @click="$emit('close')">Tutup</button>
      </div>
    </div>
  </Teleport>
</template>
