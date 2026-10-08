import { createI18n } from 'vue-i18n'
import es from './locales/es.json'
import en from './locales/en.json'

const savedLocale = localStorage.getItem('fleetcare.locale')
const locale = savedLocale || import.meta.env.VITE_DEFAULT_LOCALE || 'es'

export default createI18n({
  legacy: false,
  locale,
  fallbackLocale: 'es',
  messages: { es, en }
})
