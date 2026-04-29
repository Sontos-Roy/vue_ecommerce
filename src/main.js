import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { trackPageView } from '@/utils/tracking'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 🔥 Global page tracking
router.afterEach((to) => {
  trackPageView(to)
})

app.mount('#app')
