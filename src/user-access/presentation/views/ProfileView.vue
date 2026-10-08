<template>
  <section>
    <div class="page-header">
      <div>
        <h1>{{ t('nav.profile') }}</h1>
      </div>
    </div>
    <Card v-if="auth.user"
      ><template #content
        ><div class="detail-grid">
          <div>
            <span>{{ t('auth.firstName') }}</span
            ><strong>{{ auth.user.firstName }}</strong>
          </div>
          <div>
            <span>{{ t('auth.lastName') }}</span
            ><strong>{{ auth.user.lastName }}</strong>
          </div>
          <div>
            <span>{{ t('auth.email') }}</span
            ><strong>{{ auth.user.email }}</strong>
          </div>
          <div>
            <span>Rol</span><strong>{{ auth.role?.description }}</strong>
          </div>
        </div></template
      ></Card
    >
  </section>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
import Card from 'primevue/card'
import { useUserAccessStore } from '../../application/user-access.store.js'
const { t } = useI18n({ useScope: 'global' }),
  auth = useUserAccessStore()
</script>
