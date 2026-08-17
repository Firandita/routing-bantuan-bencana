import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Icon from './components/Icon.vue'
import StatCard from './components/StatCard.vue'
import SourceBadge from './components/SourceBadge.vue'
import StatusPill from './components/StatusPill.vue'
import LineChart from './components/LineChart.vue'
import PieChart from './components/PieChart.vue'
import LeafletMap from './components/LeafletMap.vue'
import PageHeader from './components/PageHeader.vue'
import BantuanDetailModal from './components/BantuanDetailModal.vue'
import './style.css'

const app = createApp(App)
app.component('Icon', Icon)
app.component('StatCard', StatCard)
app.component('SourceBadge', SourceBadge)
app.component('StatusPill', StatusPill)
app.component('LineChart', LineChart)
app.component('PieChart', PieChart)
app.component('LeafletMap', LeafletMap)
app.component('PageHeader', PageHeader)
app.component('BantuanDetailModal', BantuanDetailModal)
app.use(router)
app.mount('#app')
