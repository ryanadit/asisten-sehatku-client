'use Strict'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import 'bulma/css/bulma.css'
import 'leaflet/dist/leaflet.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import { router } from './routes/routes'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import mitt from 'mitt'
import Vuex from 'vuex'
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet"
import VueSweetalert2 from 'vue-sweetalert2'

const emitter = mitt()
const options = {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674',
  }
const app = createApp(App)
app.config.globalProperties.emitter = emitter

app.use(ElementPlus)
app.use(router)
app.use(Vuex)
app.use(VueSweetalert2, options)

library.add(fas)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('l-map', LMap)
app.component('l-tile-layer', LTileLayer)
app.component('l-marker', LMarker)
app.mount('#app')
