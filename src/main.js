import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { globalComponentsRegister } from './utils/globalComponentsRegister'

const app = createApp(App)

globalComponentsRegister(app)

app.use(store).use(router).mount('#app')
