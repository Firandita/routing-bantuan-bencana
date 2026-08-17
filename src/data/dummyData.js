// =====================================================================
// DATA DUMMY — SIAP DIGANTI DENGAN PEMANGGILAN API SUNGGUHAN
// Setiap objek mencantumkan field `sumber` mengikuti prinsip transparansi
// data pada PRD v2 (InaRISK, DIBI-BNPB, INA-LOGPAL, BPBD DIY, atau Internal)
// =====================================================================

export const admin = {
  nama: 'Admin Posko',
  peran: 'Operator Utama — Posko BPBD DIY',
}

export const statusIntegrasi = [
  { sumber: 'InaRISK', status: 'Terhubung', updateTerakhir: '2 jam lalu', keterangan: 'Data risiko dasar', tone: 'aman' },
  { sumber: 'DIBI-BNPB', status: 'Terhubung', updateTerakhir: '1 hari lalu', keterangan: 'Data historis kejadian', tone: 'aman' },
  { sumber: 'INA-LOGPAL', status: 'Simulasi', updateTerakhir: '—', keterangan: 'Menunggu akses API resmi', tone: 'proses' },
  { sumber: 'BPBD DIY', status: 'Terhubung', updateTerakhir: 'Real-time', keterangan: 'Kanal pelaporan warga', tone: 'aman' },
]

export const ringkasanStats = [
  { label: 'Jumlah Titik Bencana', value: 47, delta: '+6 minggu ini', icon: 'mapPin', tone: 'darurat' },
  { label: 'Jumlah Bantuan Tersalurkan', value: 128, delta: '+18 hari ini', icon: 'check', tone: 'aman' },
  { label: 'Jumlah Bantuan Belum Tersalurkan', value: 34, delta: 'Perlu tindak lanjut', icon: 'clock', tone: 'proses' },
]

// Tren kejadian — 3 rentang waktu untuk toggle Harian / Bulanan / Tahunan pada chart Dashboard
export const trenBencana = {
  harian: {
    label: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    longsor: [4, 6, 3, 2, 5, 7, 4],
    banjir: [0, 1, 2, 0, 1, 3, 1],
  },
  bulanan: {
    label: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu'],
    longsor: [58, 82, 46, 24, 12, 9, 14, 21],
    banjir: [3, 3, 22, 8, 2, 1, 4, 6],
  },
  tahunan: {
    label: ['2021', '2022', '2023', '2024', '2025', '2026'],
    longsor: [210, 245, 190, 260, 300, 300],
    banjir: [18, 22, 15, 30, 19, 6],
  },
}

// Ringkasan jenis bencana untuk diagram lingkaran (donut) pada card notifikasi
export const statistikJenisBencana = {
  longsor: 32,
  banjir: 15,
}

// Daftar kebutuhan bantuan yang perlu disalurkan (agregat lintas laporan aktif)
export const kebutuhanBantuan = [
  { item: 'Sembako', jumlah: 186, satuan: 'paket', icon: 'truck', tone: 'darurat' },
  { item: 'Selimut', jumlah: 142, satuan: 'lembar', icon: 'layers', tone: 'proses' },
  { item: 'Obat-obatan', jumlah: 97, satuan: 'paket', icon: 'plug', tone: 'darurat' },
  { item: 'Air Bersih', jumlah: 64, satuan: 'jerigen', icon: 'wifi', tone: 'info' },
  { item: 'Pakaian Layak', jumlah: 58, satuan: 'paket', icon: 'users', tone: 'aman' },
  { item: 'Terpal', jumlah: 40, satuan: 'lembar', icon: 'warehouse', tone: 'proses' },
]

// Titik bencana untuk peta sebaran — koordinat asli wilayah DIY (siap dipakai Leaflet)
export const titikBencana = [
  { id: 'TB-001', nama: 'Samigaluh, Kulon Progo', jenis: 'Longsor', urgensi: 'Tinggi', lat: -7.6425, lng: 110.1567, sumber: 'InaRISK' },
  { id: 'TB-002', nama: 'Girimulyo, Kulon Progo', jenis: 'Longsor', urgensi: 'Tinggi', lat: -7.7386, lng: 110.1719, sumber: 'InaRISK' },
  { id: 'TB-003', nama: 'Pringgokusuman, Kota Yogyakarta', jenis: 'Banjir', urgensi: 'Sedang', lat: -7.7833, lng: 110.3639, sumber: 'Internal' },
  { id: 'TB-004', nama: 'Patuk, Gunungkidul', jenis: 'Longsor', urgensi: 'Tinggi', lat: -7.8781, lng: 110.5453, sumber: 'InaRISK' },
  { id: 'TB-005', nama: 'Imogiri, Bantul', jenis: 'Banjir', urgensi: 'Rendah', lat: -7.9439, lng: 110.3742, sumber: 'Internal' },
  { id: 'TB-006', nama: 'Cangkringan, Sleman', jenis: 'Longsor', urgensi: 'Sedang', lat: -7.6636, lng: 110.4472, sumber: 'DIBI-BNPB' },
  { id: 'TB-007', nama: 'Tepus, Gunungkidul', jenis: 'Longsor', urgensi: 'Rendah', lat: -8.1136, lng: 110.6539, sumber: 'InaRISK' },
]

export const notifikasiTerbaru = [
  { id: 1, judul: 'Longsor baru dilaporkan warga', lokasi: 'Samigaluh, Kulon Progo', waktu: '8 menit lalu', jenis: 'Longsor', sumber: 'Internal' },
  { id: 2, judul: 'Genangan naik di bantaran Sungai Winongo', lokasi: 'Pringgokusuman, Kota Yogyakarta', waktu: '34 menit lalu', jenis: 'Banjir', sumber: 'Internal' },
  { id: 3, judul: 'Ruas jalan tertutup material longsoran', lokasi: 'Girimulyo, Kulon Progo', waktu: '1 jam lalu', jenis: 'Longsor', sumber: 'BPBD DIY' },
  { id: 4, judul: 'Update citra UAV pascabencana tersedia', lokasi: 'Patuk, Gunungkidul', waktu: '2 jam lalu', jenis: 'Longsor', sumber: 'InaRISK' },
]

// Daftar laporan bantuan (tabel utama Dashboard & Manajemen Laporan)
// rincianBantuan = breakdown item per laporan, ditampilkan di popup saat tombol "Lihat Daftar" diklik
export const laporanBantuan = [
  { id: 'LP-2026-0236', nama: 'Longsor Nglanggeran', penerima: 'Kel. Nglanggeran', jarak: 33.8, durasi: '1 j 14 mnt', alamat: 'Dusun Doga, Patuk, Gunungkidul', status: 'Menunggu Verifikasi', jenis: 'Longsor',
    rincianBantuan: [
      { item: 'Sembako', jumlah: 25, satuan: 'paket', catatan: 'Prioritas lansia & balita' },
      { item: 'Terpal', jumlah: 10, satuan: 'lembar', catatan: '—' },
    ] },
  { id: 'LP-2026-0235', nama: 'Banjir Code', penerima: 'Kel. Cokrodiningratan', jarak: 3.2, durasi: '9 mnt', alamat: 'RW 02, Cokrodiningratan, Kota Yogyakarta', status: 'Terverifikasi', jenis: 'Banjir',
    rincianBantuan: [
      { item: 'Air Bersih', jumlah: 40, satuan: 'jerigen', catatan: '—' },
      { item: 'Selimut', jumlah: 15, satuan: 'lembar', catatan: 'Untuk pengungsi balai RW' },
    ] },
  { id: 'LP-2026-0234', nama: 'Longsor Kokap', penerima: 'Kel. Hargotirto', jarak: 29.5, durasi: '1 j 2 mnt', alamat: 'Dusun Sangon, Kokap, Kulon Progo', status: 'Selesai', jenis: 'Longsor',
    rincianBantuan: [
      { item: 'Sembako', jumlah: 18, satuan: 'paket', catatan: '—' },
      { item: 'Obat-obatan', jumlah: 12, satuan: 'paket', catatan: 'Termasuk obat luka' },
    ] },
  { id: 'LP-2026-0233', nama: 'Banjir Bantul Kota', penerima: 'Kel. Bantul', jarak: 9.6, durasi: '22 mnt', alamat: 'RT 04, Bantul, Bantul', status: 'Menunggu Verifikasi', jenis: 'Banjir',
    rincianBantuan: [
      { item: 'Air Bersih', jumlah: 30, satuan: 'jerigen', catatan: '—' },
      { item: 'Pakaian Layak', jumlah: 20, satuan: 'paket', catatan: '—' },
    ] },
  { id: 'LP-2026-0232', nama: 'Longsor Semin', penerima: 'Kel. Candirejo', jarak: 52.1, durasi: '1 j 48 mnt', alamat: 'Dusun Blimbing, Semin, Gunungkidul', status: 'Terverifikasi', jenis: 'Longsor',
    rincianBantuan: [
      { item: 'Sembako', jumlah: 22, satuan: 'paket', catatan: '—' },
      { item: 'Terpal', jumlah: 8, satuan: 'lembar', catatan: '—' },
      { item: 'Selimut', jumlah: 14, satuan: 'lembar', catatan: '—' },
    ] },
  { id: 'LP-2026-0231', nama: 'Longsor Samigaluh', penerima: 'Kel. Ngargosari', jarak: 18.4, durasi: '42 mnt', alamat: 'Dusun Plampang, Samigaluh, Kulon Progo', status: 'Menunggu Verifikasi', jenis: 'Longsor',
    rincianBantuan: [
      { item: 'Sembako', jumlah: 20, satuan: 'paket', catatan: '—' },
      { item: 'Terpal', jumlah: 6, satuan: 'lembar', catatan: '—' },
      { item: 'Obat-obatan', jumlah: 9, satuan: 'paket', catatan: 'Stok P3K menipis' },
    ] },
  { id: 'LP-2026-0230', nama: 'Banjir Winongo', penerima: 'Kel. Pringgokusuman', jarak: 4.1, durasi: '12 mnt', alamat: 'RW 05, Pringgokusuman, Kota Yogyakarta', status: 'Terverifikasi', jenis: 'Banjir',
    rincianBantuan: [
      { item: 'Air Bersih', jumlah: 25, satuan: 'jerigen', catatan: '—' },
      { item: 'Selimut', jumlah: 12, satuan: 'lembar', catatan: '—' },
    ] },
  { id: 'LP-2026-0229', nama: 'Longsor Girimulyo', penerima: 'Kel. Jatimulyo', jarak: 26.7, durasi: '58 mnt', alamat: 'Dusun Kayugede, Girimulyo, Kulon Progo', status: 'Selesai', jenis: 'Longsor',
    rincianBantuan: [
      { item: 'Sembako', jumlah: 16, satuan: 'paket', catatan: '—' },
      { item: 'Alat Berat Ringan', jumlah: 2, satuan: 'unit', catatan: 'Pinjam pakai dari Dinas PU' },
    ] },
  { id: 'LP-2026-0228', nama: 'Longsor Patuk', penerima: 'Kel. Nglanggeran', jarak: 31.2, durasi: '1 j 10 mnt', alamat: 'Dusun Doga, Patuk, Gunungkidul', status: 'Menunggu Verifikasi', jenis: 'Longsor',
    rincianBantuan: [
      { item: 'Terpal', jumlah: 9, satuan: 'lembar', catatan: '—' },
      { item: 'Obat-obatan', jumlah: 11, satuan: 'paket', catatan: '—' },
    ] },
  { id: 'LP-2026-0227', nama: 'Banjir Imogiri', penerima: 'Kel. Wukirsari', jarak: 14.9, durasi: '35 mnt', alamat: 'Dusun Cengkehan, Imogiri, Bantul', status: 'Terverifikasi', jenis: 'Banjir',
    rincianBantuan: [
      { item: 'Air Bersih', jumlah: 28, satuan: 'jerigen', catatan: '—' },
      { item: 'Sembako', jumlah: 17, satuan: 'paket', catatan: '—' },
    ] },
  { id: 'LP-2026-0226', nama: 'Longsor Cangkringan', penerima: 'Kel. Kepuharjo', jarak: 21.3, durasi: '48 mnt', alamat: 'Dusun Petung, Cangkringan, Sleman', status: 'Selesai', jenis: 'Longsor',
    rincianBantuan: [
      { item: 'Sembako', jumlah: 19, satuan: 'paket', catatan: '—' },
      { item: 'Selimut', jumlah: 13, satuan: 'lembar', catatan: '—' },
      { item: 'Obat-obatan', jumlah: 7, satuan: 'paket', catatan: '—' },
    ] },
  { id: 'LP-2026-0225', nama: 'Longsor Tepus', penerima: 'Kel. Sidoharjo', jarak: 44.6, durasi: '1 j 32 mnt', alamat: 'Dusun Winangun, Tepus, Gunungkidul', status: 'Menunggu Verifikasi', jenis: 'Longsor',
    rincianBantuan: [
      { item: 'Terpal', jumlah: 7, satuan: 'lembar', catatan: '—' },
      { item: 'Sembako', jumlah: 15, satuan: 'paket', catatan: '—' },
    ] },
]

export const statusJaringanJalan = [
  { ruas: 'Posko Kulon Progo — Samigaluh', kondisi: 'Tertutup Sebagian', jenisGangguan: 'Material longsoran', updateTerakhir: '18 menit lalu', sumber: 'BPBD DIY' },
  { ruas: 'Posko Kota — Pringgokusuman', kondisi: 'Tergenang', jenisGangguan: 'Banjir 30–50 cm', updateTerakhir: '40 menit lalu', sumber: 'Internal' },
  { ruas: 'Posko Gunungkidul — Patuk', kondisi: 'Lancar', jenisGangguan: '—', updateTerakhir: '1 jam lalu', sumber: 'InaRISK' },
  { ruas: 'Posko Kulon Progo — Girimulyo', kondisi: 'Tertutup Total', jenisGangguan: 'Longsor besar, perlu alat berat', updateTerakhir: '2 jam lalu', sumber: 'BPBD DIY' },
  { ruas: 'Posko Sleman — Cangkringan', kondisi: 'Lancar', jenisGangguan: '—', updateTerakhir: '3 jam lalu', sumber: 'DIBI-BNPB' },
  { ruas: 'Posko Bantul — Imogiri', kondisi: 'Tertutup Sebagian', jenisGangguan: 'Genangan tepi jalan', updateTerakhir: '3 jam lalu', sumber: 'Internal' },
]

export const rekomendasiRute = [
  {
    id: 'RT-014',
    tujuan: 'Ngargosari, Samigaluh',
    jenisBencana: 'Longsor',
    skenario: 'Sebagian tertutup',
    rute: 'Posko — Dusun Kalirejo — Dusun Plampang — Ngargosari',
    jarak: '18.4 km',
    estimasi: '42 menit',
    moda: 'Darat (rute alternatif)',
    catatan: 'Ruas utama tertutup material longsoran, dialihkan melalui Kalirejo.',
  },
  {
    id: 'RT-013',
    tujuan: 'Pringgokusuman, Kota Yogyakarta',
    jenisBencana: 'Banjir',
    skenario: 'Normal',
    rute: 'Posko — Jl. HOS Cokroaminoto — Pringgokusuman',
    jarak: '4.1 km',
    estimasi: '12 menit',
    moda: 'Darat',
    catatan: 'Genangan di bawah ambang batas, jalur utama masih dapat dilalui.',
  },
  {
    id: 'RT-012',
    tujuan: 'Jatimulyo, Girimulyo',
    jenisBencana: 'Longsor',
    skenario: 'Terputus total',
    rute: 'Tidak tersedia jalur darat',
    jarak: '—',
    estimasi: '—',
    moda: 'Udara / Jalan kaki tim ringan',
    catatan: 'Seluruh ruas darat menuju titik terputus, direkomendasikan drop logistik via udara.',
  },
]

export const zonaTerdampak = [
  { wilayah: 'Samigaluh, Kulon Progo', klasifikasi: 'Berat', luasHa: 12.4, jenis: 'Longsor', sumber: 'InaRISK' },
  { wilayah: 'Girimulyo, Kulon Progo', klasifikasi: 'Berat', luasHa: 8.1, jenis: 'Longsor', sumber: 'InaRISK' },
  { wilayah: 'Pringgokusuman, Kota Yogyakarta', klasifikasi: 'Sedang', luasHa: 3.6, jenis: 'Banjir', sumber: 'Internal' },
  { wilayah: 'Patuk, Gunungkidul', klasifikasi: 'Sedang', luasHa: 5.9, jenis: 'Longsor', sumber: 'InaRISK' },
  { wilayah: 'Imogiri, Bantul', klasifikasi: 'Ringan', luasHa: 2.2, jenis: 'Banjir', sumber: 'Internal' },
]

export const gudangLogistik = [
  { nama: 'Gudang Utama BPBD DIY', lokasi: 'Kota Yogyakarta', stok: { sembako: 420, terpal: 180, obat: 260, airBersih: '3.200 L' }, sumber: 'INA-LOGPAL (simulasi)' },
  { nama: 'Gudang Cabang Kulon Progo', lokasi: 'Wates, Kulon Progo', stok: { sembako: 150, terpal: 90, obat: 110, airBersih: '900 L' }, sumber: 'INA-LOGPAL (simulasi)' },
  { nama: 'Gudang Cabang Gunungkidul', lokasi: 'Wonosari, Gunungkidul', stok: { sembako: 95, terpal: 60, obat: 70, airBersih: '600 L' }, sumber: 'INA-LOGPAL (simulasi)' },
]

export const relawan = [
  { nama: 'Tim Reaksi Cepat 1', anggota: 6, wilayahTugas: 'Kulon Progo', status: 'Bertugas', kontak: '0812-xxxx-1101' },
  { nama: 'Tim Reaksi Cepat 2', anggota: 5, wilayahTugas: 'Kota Yogyakarta', status: 'Bertugas', kontak: '0812-xxxx-1102' },
  { nama: 'Tim Kampus Pendamping A', anggota: 8, wilayahTugas: 'Gunungkidul', status: 'Siaga', kontak: '0812-xxxx-1103' },
  { nama: 'Tim Kampus Pendamping B', anggota: 7, wilayahTugas: 'Bantul', status: 'Istirahat', kontak: '0812-xxxx-1104' },
  { nama: 'Tim Reaksi Cepat 3', anggota: 6, wilayahTugas: 'Sleman', status: 'Siaga', kontak: '0812-xxxx-1105' },
]

export const rekapWilayah = [
  { wilayah: 'Kulon Progo', totalLaporan: 21, tersalurkan: 16, belum: 5 },
  { wilayah: 'Gunungkidul', totalLaporan: 14, tersalurkan: 9, belum: 5 },
  { wilayah: 'Bantul', totalLaporan: 6, tersalurkan: 5, belum: 1 },
  { wilayah: 'Kota Yogyakarta', totalLaporan: 4, tersalurkan: 3, belum: 1 },
  { wilayah: 'Sleman', totalLaporan: 2, tersalurkan: 2, belum: 0 },
]

export const logSinkronisasi = [
  { waktu: '16 Agu 2026, 09:12', sumber: 'InaRISK', aksi: 'Tarik data zona risiko', status: 'Berhasil' },
  { waktu: '16 Agu 2026, 08:00', sumber: 'BPBD DIY', aksi: 'Sinkronisasi laporan warga', status: 'Berhasil' },
  { waktu: '15 Agu 2026, 22:40', sumber: 'DIBI-BNPB', aksi: 'Tarik data historis kejadian', status: 'Berhasil' },
  { waktu: '15 Agu 2026, 20:15', sumber: 'INA-LOGPAL', aksi: 'Percobaan koneksi API resmi', status: 'Gagal — mode simulasi' },
]
