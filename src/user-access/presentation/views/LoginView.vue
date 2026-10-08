<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'
import LanguageSwitcher from '@/shared/presentation/components/LanguageSwitcher.vue'
import { useUserAccessStore } from '../../application/user-access.store.js'

import fleetCareLogo from '@/assets/images/fleetcare-logo.png'

const { t } = useI18n({ useScope: 'global' }),
  router = useRouter(),
  route = useRoute(),
  auth = useUserAccessStore(),
  loading = ref(false),
  error = ref(false),
  form = reactive({ email: 'carlos@fleetcare.local', password: 'FleetCare123!' })

async function submit() {
  loading.value = true
  error.value = false
  try {
    await auth.login(form.email.trim(), form.password)

    // await router.push(
    //  typeof route.query.redirect === 'string' ? route.query.redirect : '/dashboard'
    // )

    await router.replace({
      name: 'dashboard'
    })
  } catch (e) {
    console.error('FleetCare login error:', e)
    error.value = true
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="auth-page">
    <section class="auth-card">
      <div class="brand brand-auth">
        <div class="brand-mark">
          <img
            :src="fleetCareLogo"
            alt="FleetCare"
            class="brand-logo"
          />
        </div>
        <div>
          <strong>FleetCare</strong><span>{{ t('app.tagline') }}</span>
        </div>
      </div>
      <div>
        <h1>{{ t('auth.login') }}</h1>
        <p>{{ t('auth.loginHint') }}</p>
      </div>
      <Message
        v-if="error"
        severity="error"
        :closable="false"
        >{{ t('auth.invalid') }}</Message
      >
      <form
        class="form-grid one"
        @submit.prevent="submit"
      >
        <div>
          <label>{{ t('auth.email') }}</label
          ><InputText
            v-model="form.email"
            type="email"
            autocomplete="username"
            required
          />
        </div>
        <div>
          <label>{{ t('auth.password') }}</label
          ><Password
            v-model="form.password"
            :feedback="false"
            toggle-mask
            input-class="w-full"
            class="w-full"
            required
          />
        </div>
        <Button
          type="submit"
          :label="t('auth.login')"
          icon="pi pi-sign-in"
          :loading="loading"
        />
      </form>
      <div class="demo-box">
        <strong>Demo</strong><span>carlos@fleetcare.local</span><span>FleetCare123!</span>
      </div>
      <div class="auth-footer">
        <div>
          <RouterLink to="/auth/register">
            {{ t('auth.register') }}
          </RouterLink>

          ·

          <RouterLink to="/auth/recover">
            {{ t('auth.forgot') }}
          </RouterLink>
        </div>

        <LanguageSwitcher />
      </div>
    </section>
  </main>
</template>

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
  width: 44px;
  height: 44px;
  object-fit: contain;
}
</style>