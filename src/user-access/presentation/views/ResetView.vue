<template>
  <main class="auth-page">
    <section class="auth-card">
      <h1>{{ t('auth.reset') }}</h1>
      <Message
        v-if="message"
        :severity="severity"
        :closable="false"
        >{{ message }}</Message
      >
      <form
        class="form-grid one"
        @submit.prevent="submit"
      >
        <div>
          <label>{{ t('auth.password') }}</label>
          <Password
            v-model="password"
            :feedback="false"
            toggle-mask
            class="w-full"
            input-class="w-full"
            required
          />
        </div>
        <Button
          type="submit"
          :label="t('auth.reset')"
          :loading="loading"
        />
      </form>
      <RouterLink to="/auth/login">
        {{ t('auth.login') }}
      </RouterLink>
    </section>
  </main>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { useUserAccessStore } from '../../application/user-access.store.js'

const { t } = useI18n({ useScope: 'global' })
const route = useRoute()
const auth = useUserAccessStore()
const password = ref('')
const loading = ref(false)
const message = ref('')
const severity = ref('success')

async function submit() {
  loading.value = true
  try {
    await auth.resetPassword(String(route.query.token || ''), password.value)
    severity.value = 'success'
    message.value = 'Contraseña actualizada. Ya puedes iniciar sesión.'
  } catch (error) {
    severity.value = 'error'
    message.value = error.message
  } finally {
    loading.value = false
  }
}
</script>
