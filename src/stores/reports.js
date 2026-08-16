import { defineStore } from 'pinia'

// Data dummy di sekitar DIY, sesuai catatan developer di dokumen (30-50 titik demo)
const dummyReports = [
  { id: 1, lat: -7.7956, lng: 110.3695, jenis: 'Evakuasi', jumlah_jiwa: 42, status: 'baru', skor: 0.92, waktu: '2026-08-16T06:12:00' },
  { id: 2, lat: -7.8014, lng: 110.3644, jenis: 'Makanan', jumlah_jiwa: 18, status: 'diverifikasi', skor: 0.71, waktu: '2026-08-16T05:40:00' },
  { id: 3, lat: -7.8102, lng: 110.3781, jenis: 'Obat', jumlah_jiwa: 9, status: 'diproses', skor: 0.55, waktu: '2026-08-16T04:55:00' },
  { id: 4, lat: -7.7890, lng: 110.3550, jenis: 'Evakuasi', jumlah_jiwa: 27, status: 'diverifikasi', skor: 0.84, waktu: '2026-08-16T06:02:00' },
  { id: 5, lat: -7.8203, lng: 110.3402, jenis: 'Makanan', jumlah_jiwa: 12, status: 'selesai', skor: 0.31, waktu: '2026-08-15T22:10:00' },
  { id: 6, lat: -7.7745, lng: 110.3820, jenis: 'Obat', jumlah_jiwa: 6, status: 'baru', skor: 0.44, waktu: '2026-08-16T07:01:00' }
]

const dummyGudang = [
  { id: 1, nama: 'Posko BPBD DIY', lat: -7.7972, lng: 110.3688, stok: { makanan: 320, obat: 150, tenda: 40 } },
  { id: 2, nama: 'Gudang Logistik Sleman', lat: -7.7180, lng: 110.3520, stok: { makanan: 180, obat: 90, tenda: 20 } }
]

function urgencyColor(skor) {
  if (skor >= 0.7) return '#E63946' // danger
  if (skor >= 0.4) return '#F4A261' // warning
  return '#2A9D8F' // success
}

export const useReportsStore = defineStore('reports', {
  state: () => ({
    reports: dummyReports,
    gudang: dummyGudang
  }),
  getters: {
    reportsSorted: (state) => [...state.reports].sort((a, b) => b.skor - a.skor),
    totalJiwa: (state) => state.reports.reduce((sum, r) => sum + r.jumlah_jiwa, 0),
    totalAktif: (state) => state.reports.filter(r => r.status !== 'selesai').length
  },
  actions: {
    urgencyColor,
    updateStatus(id, status) {
      const r = this.reports.find(r => r.id === id)
      if (r) r.status = status
    },
    addReport(payload) {
      const nextId = Math.max(...this.reports.map(r => r.id)) + 1
      this.reports.push({
        id: nextId,
        status: 'baru',
        skor: 0.5,
        waktu: new Date().toISOString(),
        ...payload
      })
      return nextId
    }
  }
})
