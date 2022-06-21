import { defineAsyncComponent } from 'vue'

export function globalComponentsRegister(app) {

  app.component('default-layout', defineAsyncComponent(() => import('../layouts/DefaultLayout.vue')))

}
