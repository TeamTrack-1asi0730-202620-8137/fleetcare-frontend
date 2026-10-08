import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './styles.css'
import App from './App.vue'
import router from './router/index.js'
import pinia from './pinia.js'
import i18n from './i18n.js'

createApp(App)
  .use(pinia)
  .use(i18n)
  .use(PrimeVue, { theme: { preset: Aura }, ripple: true })
  .use(router)
  .mount('#app')
