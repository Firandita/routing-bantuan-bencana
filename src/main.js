import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Icon from './components/Icon.vue'
import StatCard from './components/StatCard.vue'
import SourceBadge from './components/SourceBadge.vue'
import StatusPill from './components/StatusPill.vue'
import LineChart from './components/LineChart.vue'
import MapMock from './components/MapMock.vue'
import PageHeader from './components/PageHeader.vue'
import './style.css'

const app = createApp(App)
app.component('Icon', Icon)
app.component('StatCard', StatCard)
app.component('SourceBadge', SourceBadge)
app.component('StatusPill', StatusPill)
app.component('LineChart', LineChart)
app.component('MapMock', MapMock)
app.component('PageHeader', PageHeader)
app.use(router)
app.mount('#app')
