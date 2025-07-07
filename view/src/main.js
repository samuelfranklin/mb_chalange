import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import ToastService from '@/plugins/ToastService'

const app = createApp(App)

app.use(ToastService)
app.mount('#app')
