<template>
  <main class="auth-page">
    <section class="auth-card">
      <div class="brand brand-auth">
        <div class="brand-mark"><i class="pi pi-truck"></i></div>
        <div>
          <strong>FleetCare</strong><span>{{ t('app.tagline') }}</span>
        </div>
      </div>
      <div>
        <h1>{{ t('auth.register') }}</h1>
        <p>{{ t('auth.loginHint') }}</p>
      </div>
      <Message
        v-if="message"
        :severity="severity"
        :closable="false"
        >{{ message }}</Message
      >
      <form
        class="form-grid"
        @submit.prevent="submit"
      >
        <div class="full">
          <label>{{ t('auth.fleetName') }}</label>
          <InputText
            v-model="form.fleetName"
            required
          />
        </div>
        <div>
          <label>{{ t('auth.firstName') }}</label>
          <InputText
            v-model="form.firstName"
            required
          />
        </div>
        <div>
          <label>{{ t('auth.lastName') }}</label>
          <InputText
            v-model="form.lastName"
            required
          />
        </div>
        <div class="full">
          <label>{{ t('auth.email') }}</label>
          <InputText
            v-model="form.email"
            type="email"
            required
          />
        </div>
        <div class="full">
          <label>{{ t('auth.password') }}</label>
          <Password
            v-model="form.password"
            :feedback="false"
            toggle-mask
            class="w-full"
            input-class="w-full"
            required
          />
        </div>
        <div class="form-actions">
          <Button
            type="submit"
            :label="t('auth.register')"
            icon="pi pi-user-plus"
            :loading="loading"
          />
        </div>
      </form>
      <RouterLink to="/login">{{ t('auth.login') }}</RouterLink>
    </section>
  </main>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { useUserAccessStore } from '../../application/user-access.store.js'

const { t } = useI18n({ useScope: 'global' })
const router = useRouter()
const auth = useUserAccessStore()
const loading = ref(false)
const message = ref('')
const severity = ref('success')
const form = reactive({ fleetName: '', firstName: '', lastName: '', email: '', password: '' })

async function submit() {
  loading.value = true
  message.value = ''
  try {
    await auth.registerFleetManager({ ...form })
    await router.push('/login')
  } catch (error) {
    
    //severity.value = 'error'
    //message.value = error.message

    severity.value = 'error'
    if (error.message === 'EMAIL_ALREADY_EXISTS') {
    message.value = 'Este correo ya se encuentra registrado.'
    } else {
    message.value = error.message || 'Ocurrió un error al registrarse.'
    }
  } finally {
    loading.value = false
  }
}
</script>
