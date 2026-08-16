<script setup>
const props = defineProps({
  name: { type: String, required: true },
  class: { type: String, default: 'w-5 h-5' },
})

const paths = {
  home: 'M3 11.5 12 4l9 7.5M5 10v9.5a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10',
  map: 'M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Zm0 0v14m6-12v14',
  clipboard: 'M9 4h6a1 1 0 0 1 1 1v1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1V5a1 1 0 0 1 1-1Zm0 3h6M9 12h6M9 16h4',
  route: 'M5 19c1.5 0 2.5-1 2.5-2.5S6.5 14 5 14s-2.5 1-2.5 2.5S3.5 19 5 19Zm14-9c1.5 0 2.5-1 2.5-2.5S20.5 5 19 5s-2.5 1-2.5 2.5S17.5 10 19 10ZM5 14V9a4 4 0 0 1 4-4h2m-1 13h4a4 4 0 0 0 4-4v-1',
  alertTriangle: 'M12 4 2 20h20L12 4Zm0 6.5v4m0 3h.01',
  road: 'M9 3 5 21m10-18 4 18M11 8h2m-2.5 5h3M10 18h4',
  warehouse: 'M3 11 12 4l9 7v9H3v-9Zm4 9v-6h10v6M9 9h.01M15 9h.01',
  users: 'M8.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7-1.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2.5 20v-1.5A4.5 4.5 0 0 1 7 14h3a4.5 4.5 0 0 1 4.5 4.5V20M16.2 14.2a4.5 4.5 0 0 1 5.3 4.43V20',
  barChart: 'M4 20V10m6 10V4m6 16v-7',
  plug: 'M9 3v4m6-4v4M7 7h10l-1 5a4 4 0 0 1-4 3.5A4 4 0 0 1 8 12L7 7Zm5 8.5V21',
  settings: 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm8-3.5a7.9 7.9 0 0 0-.15-1.5l2-1.55-2-3.46-2.36.95a8 8 0 0 0-2.6-1.5L14.5 2h-5l-.4 2.44a8 8 0 0 0-2.6 1.5l-2.35-.95-2 3.46 2 1.55A8 8 0 0 0 4 12c0 .5.05 1 .15 1.5l-2 1.56 2 3.46 2.36-.96a8 8 0 0 0 2.6 1.5L9.5 22h5l.4-2.44a8 8 0 0 0 2.6-1.5l2.36.96 2-3.46-2-1.56c.1-.5.15-1 .15-1.5Z',
  logOut: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m6 14 5-5-5-5m5 5H9',
  bell: 'M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9Zm-7 13a2 2 0 0 0 2-2H9a2 2 0 0 0 2 2Z',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.35-4.35',
  chevronDown: 'm6 9 6 6 6-6',
  chevronRight: 'm9 6 6 6-6 6',
  menu: 'M4 6h16M4 12h16M4 18h16',
  x: 'm6 6 12 12M18 6 6 18',
  check: 'm5 13 4 4L19 7',
  checkCircle: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-3.5-9 2.5 2.5L16 9.5',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-14v5l3.5 2',
  mapPin: 'M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  wifi: 'M2 8.5a16 16 0 0 1 20 0M5.5 12a11 11 0 0 1 13 0M9 15.5a6 6 0 0 1 6 0M12 19h.01',
  upload: 'M12 16V4m0 0 4 4m-4-4-4 4M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3',
  download: 'M12 4v12m0 0 4-4m-4 4-4-4M4 18v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1',
  filter: 'M4 5h16l-6 8v6l-4-2v-4L4 5Z',
  truck: 'M3 7h11v9H3V7Zm11 3h4l3 3v3h-7v-6ZM6.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm12 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
  refresh: 'M4 4v5h5M20 20v-5h-5M4.5 9a8 8 0 0 1 14.1-3.5M19.5 15a8 8 0 0 1-14.1 3.5',
  sun: 'M12 4V2m0 20v-2M4 12H2m20 0h-2M5.6 5.6 4.2 4.2m15.6 15.6-1.4-1.4M5.6 18.4l-1.4 1.4M18.4 5.6l1.4-1.4M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z',
  building: 'M4 21V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v17M4 21h16M8 7h1m3 0h1m-5 4h1m3 0h1m-5 4h1m3 0h1M14 21v-4h4v4',
  layers: 'm12 2 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5',
}

const path = paths[props.name] || paths.home
</script>

<template>
  <svg :class="props.class" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
    <path :d="path" />
  </svg>
</template>
