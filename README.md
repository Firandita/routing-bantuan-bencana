# SIGAP Rute DIY — Multi-Role (Warga / Relawan / Admin)

Frontend sistem integrasi data & rute adaptif bantuan bencana banjir dan longsor di DIY. Dibangun dengan **Vue 3 + Vite + Tailwind CSS + Leaflet**, seluruh data masih **dummy/mock** dan siap diganti API sungguhan.

## Menjalankan project

```bash
npm install
npm run dev       # jalankan di http://localhost:5173
npm run build     # build production ke folder dist/
```

## Struktur Role

Ada 3 role yang bisa dipilih lewat switcher di sidebar (tersimpan di localStorage browser):

### Warga (`/warga/*`)
- Peta Utama, Lapor Bantuan, Cek Status Laporan, Info & Edukasi, Tentang & Sumber Data

### Relawan (`/relawan/*`)
- Dashboard Tugas, Rute Aktif, Update Status, Riwayat Tugas, Profil Saya

### Admin/Posko (`/admin/*`) — dikelompokkan di sidebar:
- **Menu Utama**: Dashboard Ringkasan, Peta Operasional
- **Perencanaan Rute**: Simulasi Rute Bantuan (BARU), Manajemen Rute
- **Data & Laporan**: Manajemen Laporan, Zona Terdampak, Status Jaringan Jalan
- **Sumber Daya**: Gudang Logistik, Manajemen Relawan, Laporan & Statistik
- **Sistem**: Integrasi & Sumber Data, Pengaturan

## Fitur Baru: Simulasi Rute Bantuan

Halaman `/admin/simulasi-rute` — pilih titik bencana (tujuan), posko/gudang asal, jenis bantuan, dan moda transportasi (Darat / Darat+Udara), lalu sistem menampilkan **beberapa kandidat rute berwarna berbeda** di peta, dengan satu rute otomatis ditandai sebagai rekomendasi (bisa diubah manual dengan klik kartu rute atau klik garis di peta).

**Penting**: fitur ini masih berupa **simulasi tampilan**, algoritma pencarian rute sesungguhnya (Dijkstra/A*/lainnya) belum diimplementasikan. Logikanya sengaja diisolasi di satu file: `src/services/routeEngine.js` — fungsi `findRoutes()` di file itu adalah **satu-satunya titik yang perlu diganti** saat algoritma/backend asli sudah siap. Kontrak input/output-nya sudah dirancang stabil supaya tidak perlu mengubah kode UI.

## Struktur folder penting

```
src/
├─ components/       Komponen reusable (Sidebar, Topbar, RouteMap, LeafletMap, StatCard, dll)
├─ views/
│  ├─ warga/          5 halaman role Warga
│  ├─ relawan/        5 halaman role Relawan
│  └─ admin/          11 halaman role Admin
├─ services/
│  └─ routeEngine.js  Titik integrasi algoritma pencarian rute (lihat penjelasan di atas)
├─ composables/
│  ├─ useRole.js      State role aktif (Warga/Relawan/Admin), persisten di localStorage
│  └─ useToast.js     Notifikasi toast global
├─ router/            Definisi route per role (vue-router, hash history)
├─ data/dummyData.js  SEMUA data mock ada di satu file ini
└─ style.css          Setup Tailwind + design tokens (warna, komponen utility)
```

## Menyambungkan ke data/API asli

1. **Data dummy → API**: ganti isi `src/data/dummyData.js` dengan pemanggilan `fetch`/`axios` ke backend.
2. **Peta**: sudah menggunakan **Leaflet.js + OpenStreetMap** (`src/components/LeafletMap.vue` untuk titik, `src/components/RouteMap.vue` untuk multi-rute), fokus wilayah DIY dengan marker custom per jenis bencana. Titik bencana & gudang di `dummyData.js` sudah pakai koordinat `lat`/`lng` asli.
3. **Algoritma rute asli**: edit `src/services/routeEngine.js` — ganti isi fungsi `findRoutes()` dengan pemanggilan API backend yang menjalankan Dijkstra/A*/algoritma lain. Struktur data kandidat rute (`RouteCandidate`) sudah didokumentasikan di komentar file tersebut.

## Palet & tipografi

- Warna: navy gelap solid untuk sidebar & topbar (`#0B1730` / `#0F1E3D`), aksen biru (`#1E3A8A`)
- Tipografi: Plus Jakarta Sans (heading/angka) + Inter (body/tabel)
- Peta pakai tile OpenStreetMap berwarna asli (bukan ilustrasi)
- Badge sumber data (`SourceBadge.vue`) membedakan data "Terhubung", "Simulasi", dan "Data Internal" di seluruh halaman

## Catatan

- Untuk halaman Warga & Relawan, sebagian aksi (kirim laporan, mulai navigasi, dll) masih simulasi (toast notifikasi), belum terhubung ke backend nyata.
- Role tersimpan di localStorage browser — refresh halaman akan tetap mempertahankan role terakhir yang dipilih.
