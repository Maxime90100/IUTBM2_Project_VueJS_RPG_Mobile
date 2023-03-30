import { createApp } from 'vue'
import { IonicVue } from '@ionic/vue'

import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import '@ionic/vue/css/ionic.bundle.css'

const app = createApp(App)
app.use(IonicVue)
app.use(router)
app.use(store)
app.use(vuetify)

router.isReady().then(() => {
  app.mount('#app')
})
