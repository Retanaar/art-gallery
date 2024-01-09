import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { router } from './router/index'
import './style.css'
import App from './App.vue'

createApp(App).use(createPinia()).use(router).mount('#app')
