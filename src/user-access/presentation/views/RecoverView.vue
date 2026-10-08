<template>
  <main class="auth-page">
    <section class="auth-card">
      <h1>{{ t('auth.recover') }}</h1>
      <p>{{ t('auth.loginHint') }}</p>
      <form
        class="form-grid one"
        @submit.prevent="submit"
      >
        <div>
          <label>{{ t('auth.email') }}</label>
          <InputText
            v-model="email"
            type="email"
            required
          />
        </div>
        <Button
          type="submit"
          :label="t('auth.recover')"
          :loading="loading"
        />
      </form>
      <Message
        v-if="resetLink"
        severity="success"
        :closable="false"
      >
        Demo local: <RouterLink :to="resetLink">abrir enlace de restablecimiento</RouterLink>
      </Message>
      <Message
        v-if="error"
        severity="error"
        :closable="false"
        >{{ error }}</Message
      >
      <RouterLink to="/auth/login">
        {{ t('auth.login') }}
      </RouterLink>
    </section>
  </main>
</template>
<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { useUserAccessStore } from '../../application/user-access.store.js'

const { t } = useI18n({ useScope: 'global' })
const auth = useUserAccessStore()
const email = ref('')
const loading = ref(false)
const resetLink = ref('')
const error = ref('')

async function submit() {
  loading.value = true
  resetLink.value = ''
  error.value = ''

  try {
    const token = await auth.requestPasswordReset(email.value.trim())

    resetLink.value = `/auth/reset?token=${encodeURIComponent(token)}`
  } catch (exception) {
    error.value = exception.message
  } finally {
    loading.value = false
  }
}
</script>
