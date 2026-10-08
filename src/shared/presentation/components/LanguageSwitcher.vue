<template>
  <select
    v-model="locale"
    class="language-select"
    @change="persist"
  >
    <option value="es">ES</option>
    <option value="en">EN</option>
  </select>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
const { locale } = useI18n({ useScope: 'global' })
function persist() {
  localStorage.setItem('fleetcare.locale', locale.value)
}
</script>
