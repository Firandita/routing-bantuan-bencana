<script setup>
import { gudangLogistik } from '../data/dummyData'
</script>

<template>
  <div>
    <PageHeader
      title="Gudang Logistik"
      subtitle="Stok ringkas dari tiap gudang. Status koneksi ke INA-LOGPAL masih simulasi hingga akses API resmi tersedia."
    >
      <template #actions>
        <span class="badge-sumber">Sumber: INA-LOGPAL (simulasi)</span>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div v-for="g in gudangLogistik" :key="g.nama" class="card p-5">
        <div class="flex items-start gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
            <Icon name="warehouse" class="w-5 h-5" />
          </div>
          <div class="min-w-0">
            <h4 class="font-display font-bold text-navy-900 leading-tight">{{ g.nama }}</h4>
            <p class="text-xs text-slate-400 mt-0.5">{{ g.lokasi }}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2.5 mb-4">
          <div class="rounded-lg bg-slate-50 p-2.5">
            <p class="text-[10px] text-slate-400 uppercase">Sembako</p>
            <p class="text-sm font-semibold text-navy-900">{{ g.stok.sembako }} paket</p>
          </div>
          <div class="rounded-lg bg-slate-50 p-2.5">
            <p class="text-[10px] text-slate-400 uppercase">Terpal</p>
            <p class="text-sm font-semibold text-navy-900">{{ g.stok.terpal }} lembar</p>
          </div>
          <div class="rounded-lg bg-slate-50 p-2.5">
            <p class="text-[10px] text-slate-400 uppercase">Obat-obatan</p>
            <p class="text-sm font-semibold text-navy-900">{{ g.stok.obat }} paket</p>
          </div>
          <div class="rounded-lg bg-slate-50 p-2.5">
            <p class="text-[10px] text-slate-400 uppercase">Air Bersih</p>
            <p class="text-sm font-semibold text-navy-900">{{ g.stok.airBersih }}</p>
          </div>
        </div>

        <SourceBadge :sumber="g.sumber" />
      </div>
    </div>
  </div>
</template>
