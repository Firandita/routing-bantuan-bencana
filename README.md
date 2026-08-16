# SIGAP Rute DIY — Dashboard Admin/Posko

Frontend dashboard admin untuk sistem integrasi data & rute adaptif bantuan bencana banjir dan longsor di DIY, sesuai PRD v2 dan wireframe yang dilampirkan. Dibangun dengan **Vue 3 + Vite + Tailwind CSS**, seluruh data masih **dummy/mock** (lihat `src/data/dummyData.js`) dan siap diganti dengan pemanggilan API sungguhan.

## Menjalankan project

```bash
npm install
npm run dev       # jalankan di http://localhost:5173
npm run build     # build production ke folder dist/
npm run preview   # preview hasil build
```

## Struktur halaman (sesuai sidebar admin di PRD 3.3)

- **Beranda / Dashboard Ringkasan** — kartu ringkasan, status integrasi 4 sumber data, tren kejadian, peta sebaran, notifikasi, daftar laporan
- **Peta Operasional** — kontrol layer (Zona Risiko/InaRISK, Histori/DIBI, Titik Bantuan, Status Jalan, Rute Aktif) + peta
- **Manajemen Laporan** — tab Semua/Menunggu Verifikasi/Terverifikasi/Selesai + tabel detail + drawer detail laporan
- **Manajemen Rute** — form parameter rute Dijkstra + kartu rekomendasi 3 skenario (normal, sebagian tertutup, terputus total)
- **Zona Terdampak** — klasifikasi kerusakan + pembanding citra sebelum-sesudah
- **Status Jaringan Jalan** — tabel kondisi ruas jalan
- **Gudang Logistik** — stok per gudang (badge "Sumber: INA-LOGPAL (simulasi)")
- **Manajemen Relawan** — daftar tim & status penugasan
- **Laporan & Statistik** — rekap per wilayah + tren pembanding DIBI-BNPB
- **Integrasi & Sumber Data** — status koneksi 4 platform + log sinkronisasi
- **Pengaturan** — profil akun & role/izin pengguna

## Struktur folder penting

```
src/
├─ components/       Komponen reusable (Sidebar, Topbar, StatCard, MapMock, LineChart, StatusPill, SourceBadge, dll)
├─ views/             1 file per halaman sidebar
├─ router/            Definisi route (vue-router, hash history)
├─ data/dummyData.js  SEMUA data mock ada di satu file ini
└─ style.css          Setup Tailwind + design tokens (warna, komponen utility)
```

## Menyambungkan ke data/API asli

1. **Data dummy → API**: ganti isi `src/data/dummyData.js` dengan pemanggilan `fetch`/`axios` ke backend (disarankan di dalam `onMounted` masing-masing view, atau dipindah ke Pinia store bila state makin kompleks).
2. **Peta mock → Leaflet asli**: komponen `src/components/MapMock.vue` sudah menerima props `points` berformat `{ id, nama, jenis, urgensi, x, y, sumber }`. Untuk Leaflet asli, install `leaflet` (`npm install leaflet`), ganti `x`/`y` persentase dengan `lat`/`lng`, dan render `<l-map>`/marker sesuai dokumentasi Leaflet.
3. **Rute Dijkstra asli**: `src/views/ManajemenRuteView.vue` saat ini menampilkan hasil dari `rekomendasiRute` (dummy). Sambungkan tombol "Cari Rute Optimal" ke endpoint backend yang menjalankan algoritma Dijkstra + pembobotan multikriteria (lihat Bab 2.5–2.6 KTI).

## Palet & tipografi (mengikuti PRD Bab 5)

- Warna: gradasi biru `#0B1D51 → #1E3A8A → #3B62C4 → #AFC9F2 → putih`, status urgensi merah/kuning/hijau
- Tipografi: Plus Jakarta Sans (heading/angka) + Inter (body/tabel)
- Semua layer peta & entri data eksternal diberi badge sumber (`SourceBadge.vue`) mengikuti prinsip transparansi data PRD 4.1

## Belum termasuk di build ini

Sesuai kesepakatan awal, build ini fokus pada **sidebar Admin/Posko** saja (bukan sidebar Warga/Relawan), dan peta masih berupa **mock visual ilustratif** (belum Leaflet + OSM asli). Kedua hal ini bisa dikembangkan lanjutan mengikuti struktur folder di atas.
