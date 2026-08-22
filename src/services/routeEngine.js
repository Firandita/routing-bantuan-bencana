// =====================================================================
// LAPISAN ABSTRAKSI PENCARIAN RUTE
// =====================================================================
// Fungsi findRoutes() di bawah ini adalah SATU-SATUNYA titik yang perlu diganti
// saat algoritma pencarian rute sungguhan (Dijkstra/A*/OSRM/dsb) sudah siap
// diintegrasikan dari backend. Kontrak input & output-nya sengaja dirancang
// stabil supaya seluruh UI (SimulasiRuteView, dsb) tidak perlu diubah:
//
//   input  : { origin, destination, jenisBantuan, moda }
//   output : Promise<RouteCandidate[]>
//
// RouteCandidate = {
//   id, label, moda: 'Darat' | 'Udara', color, dashed,
//   waypoints: [[lat, lng], ...],
//   jarakKm, estimasiMenit, status, catatan, bantuanKompatibel: string[]
// }
//
// Saat backend siap, ganti isi findRoutes() dengan pemanggilan API, misal:
//   const res = await fetch('/api/routes/search', { method: 'POST', body: ... })
//   return res.json()
// =====================================================================

const BANTUAN_RINGAN = ['Obat-obatan', 'Air Bersih']

function toRad(v) {
  return (v * Math.PI) / 180
}

// Jarak garis lurus (haversine) — dipakai untuk estimasi kasar di mode simulasi
function haversineKm(a, b) {
  const R = 6371
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
}

// Geser sedikit titik tengah rute secara tegak lurus arah asal→tujuan,
// supaya beberapa kandidat rute tervisualisasi sebagai jalur yang berbeda-beda.
function offsetMidpoint(origin, destination, factor) {
  const midLat = (origin.lat + destination.lat) / 2
  const midLng = (origin.lng + destination.lng) / 2
  const dLat = destination.lat - origin.lat
  const dLng = destination.lng - origin.lng
  // vektor tegak lurus
  const perpLat = -dLng
  const perpLng = dLat
  return [midLat + perpLat * factor, midLng + perpLng * factor]
}

export async function findRoutes({ origin, destination, jenisBantuan, moda }) {
  // simulasi delay komputasi, supaya UI loading state terasa realistis
  await new Promise((resolve) => setTimeout(resolve, 650))

  const jarakLurus = haversineKm(origin, destination)
  const candidates = []

  // ----- Kandidat 1: rute darat utama (paling langsung) -----
  const wp1Mid = offsetMidpoint(origin, destination, 0.15)
  const jarak1 = jarakLurus * 1.15
  candidates.push({
    id: 'R1',
    label: 'Rute 1 — Jalur Utama',
    moda: 'Darat',
    color: '#1E3A8A',
    dashed: false,
    waypoints: [[origin.lat, origin.lng], wp1Mid, [destination.lat, destination.lng]],
    jarakKm: Number(jarak1.toFixed(1)),
    estimasiMenit: Math.round((jarak1 / 32) * 60),
    status: 'Direkomendasikan',
    catatan: 'Ruas jalan utama, kondisi terpantau lancar saat ini.',
    bantuanKompatibel: ['Sembako', 'Selimut', 'Obat-obatan', 'Air Bersih', 'Terpal', 'Pakaian Layak'],
  })

  // ----- Kandidat 2: rute darat alternatif (memutar, menghindari titik rawan) -----
  const wp2Mid = offsetMidpoint(origin, destination, -0.35)
  const jarak2 = jarakLurus * 1.55
  candidates.push({
    id: 'R2',
    label: 'Rute 2 — Jalur Alternatif',
    moda: 'Darat',
    color: '#94A3B8',
    dashed: false,
    waypoints: [[origin.lat, origin.lng], wp2Mid, [destination.lat, destination.lng]],
    jarakKm: Number(jarak2.toFixed(1)),
    estimasiMenit: Math.round((jarak2 / 28) * 60),
    status: 'Bisa Dilalui',
    catatan: 'Jalur memutar, lebih jauh namun menghindari ruas yang rawan longsor susulan.',
    bantuanKompatibel: ['Sembako', 'Selimut', 'Obat-obatan', 'Air Bersih', 'Terpal', 'Pakaian Layak'],
  })

  // ----- Kandidat 3: rute udara (garis lurus, hanya barang ringan) -----
  if (moda !== 'Darat') {
    candidates.push({
      id: 'R3',
      label: 'Rute 3 — Jalur Udara',
      moda: 'Udara',
      color: '#0EA5E9',
      dashed: true,
      waypoints: [[origin.lat, origin.lng], [destination.lat, destination.lng]],
      jarakKm: Number(jarakLurus.toFixed(1)),
      estimasiMenit: Math.round((jarakLurus / 140) * 60) + 8,
      status: jarakLurus > 8 ? 'Direkomendasikan untuk barang ringan' : 'Bisa Dilalui',
      catatan: 'Jalur udara langsung, hanya untuk muatan ringan dan mendesak. Butuh koordinasi izin terbang.',
      bantuanKompatibel: BANTUAN_RINGAN,
    })
  }

  // Tandai satu rute darat sebagai "terpilih" (default): jarak terpendek yang
  // berstatus baik dan kompatibel dengan jenis bantuan yang dipilih pengguna.
  const eligible = candidates.filter(
    (c) => (jenisBantuan === 'Semua' || c.bantuanKompatibel.includes(jenisBantuan)) && c.status !== 'Tidak Disarankan'
  )
  const best = (eligible.length ? eligible : candidates).reduce((a, b) => (a.jarakKm <= b.jarakKm ? a : b))

  return { candidates, recommendedId: best.id }
}
