<template>
  <aside
    class="sidebar"
    :class="{ open }"
  >
    <div class="sidebar-brand">
      <div class="brand-mark">
        <img
          :src="fleetCareLogo"
          alt="FleetCare"
          class="brand-logo"
        />
      </div>

      <div>
        <strong>FleetCare</strong><small>{{ t('app.tagline') }}</small>
      </div>
    </div>
    <nav class="sidebar-nav">
      <template
        v-for="section in visibleSections"
        :key="section.labelKey"
      >
        <span class="nav-section">{{ t(section.labelKey) }}</span>
        <RouterLink
          v-for="item in section.items"
          :key="item.to"
          :to="item.to"
          class="nav-item"
          @click="$emit('navigate')"
        >
          <i :class="item.icon"></i><span>{{ t(item.labelKey) }}</span>
        </RouterLink>
      </template>
    </nav>
    <div class="sidebar-user">
      <Avatar
        :label="initials"
        shape="circle"
      />
      <div>
        <strong>{{ fullName }}</strong
        ><small>{{ roleLabel }}</small>
      </div>
    </div>
  </aside>
</template>
<script setup>
import { computed } from 'vue'
import Avatar from 'primevue/avatar'
import { useI18n } from 'vue-i18n'
import { navigationSections } from '@/shared/application/navigation-items.js'
import { useUserAccessStore } from '@/user-access/application/user-access.store.js'
import fleetCareLogo from '@/assets/images/fleetcare-logo.png'

defineProps({ open: Boolean })
defineEmits(['navigate'])
const { t } = useI18n({ useScope: 'global' })
const auth = useUserAccessStore()
const visibleSections = computed(() =>
  navigationSections.filter((s) => !s.roles || s.roles.includes(auth.roleName))
)
const fullName = computed(() =>
  auth.user ? `${auth.user.firstName} ${auth.user.lastName}` : 'FleetCare'
)
const initials = computed(() =>
  auth.user ? `${auth.user.firstName?.[0] || ''}${auth.user.lastName?.[0] || ''}` : 'FC'
)
const roleLabel = computed(() => auth.role?.description || auth.roleName || '')
</script>

<style scoped>
.brand-mark {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.brand-logo {
  width: 36px;
  height: 36px;
  object-fit: contain;
}
</style>