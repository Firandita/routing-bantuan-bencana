<script setup>
import { relawan } from '../data/dummyData'
</script>

<template>
  <div>
    <PageHeader title="Manajemen Relawan" subtitle="Daftar tim relawan dan status penugasan di lapangan.">
      <template #actions>
        <button class="btn-primary"><Icon name="users" class="w-4 h-4" /> Assign Tugas</button>
      </template>
    </PageHeader>

    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      <div v-for="r in relawan" :key="r.nama" class="card p-5">
        <div class="flex items-center justify-between mb-3">
          <div class="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
            <Icon name="users" class="w-5 h-5" />
          </div>
          <StatusPill :status="r.status" />
        </div>
        <h4 class="font-display font-bold text-navy-900">{{ r.nama }}</h4>
        <p class="text-xs text-slate-400 mt-0.5">{{ r.anggota }} anggota · {{ r.wilayahTugas }}</p>
        <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
          <p class="text-xs text-slate-500">{{ r.kontak }}</p>
          <button class="text-xs font-semibold text-brand-700 hover:text-brand-800">Detail →</button>
        </div>
      </div>
    </div>
  </div>
</template>
