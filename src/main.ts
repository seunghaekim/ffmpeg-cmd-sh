import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

// Import VBTooltip from bootstrap-vue-3
import { vBTooltip } from 'bootstrap-vue-3'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(BootstrapVue3)

// Register VBTooltip directive
app.directive('b-tooltip', vBTooltip)

app.mount('#app')
