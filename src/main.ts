import { createApp } from 'vue'
import { initPinia } from './stores/store'

/* tailwind css */
import '@/assets/styles/tailwind.css'

import App from './App.vue'
import router from './router'

const pinia = initPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)

router.isReady().then(() => {
  app.mount('#app')
})
