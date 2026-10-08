<template>
  <header class="topbar">
    <Button
      icon="pi pi-bars"
      text
      rounded
      class="mobile-menu"
      @click="$emit('toggle-menu')"
    />
    <div class="breadcrumb">
      <i class="pi pi-home"></i><span>{{ pageTitle }}</span>
    </div>
    <div class="topbar-actions">
      <LanguageSwitcher />
      <Button
        icon="pi pi-bell"
        text
        rounded
        aria-label="Notifications"
      />
      <Button
        icon="pi pi-user"
        text
        rounded
        @click="profileMenu.toggle($event)"
      />
      <Menu
        ref="profileMenu"
        :model="profileItems"
        popup
      />
    </div>
  </header>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import LanguageSwitcher from './LanguageSwitcher.vue'
import { useUserAccessStore } from '@/user-access/application/user-access.store.js'
defineEmits(['toggle-menu'])
const route = useRoute()
const router = useRouter()
const { t } = useI18n({ useScope: 'global' })
const auth = useUserAccessStore()
const profileMenu = ref()
const pageTitle = computed(() => (route.meta.titleKey ? t(route.meta.titleKey) : 'FleetCare'))
const profileItems = computed(() => [
  { label: t('nav.profile'), icon: 'pi pi-user', command: () => router.push('/profile') },
  { separator: true },
  {
    label: t('nav.logout'),
    icon: 'pi pi-sign-out',
    command: () => {
      auth.logout()
      router.push('/login')
    }
  }
])
</script>
