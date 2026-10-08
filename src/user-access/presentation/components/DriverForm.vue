<template>
  <form
    class="form-grid"
    @submit.prevent="$emit('save', { ...form })"
  >
    <div>
      <label>{{ t('auth.firstName') }}</label
      ><InputText
        v-model="form.firstName"
        required
      />
    </div>
    <div>
      <label>{{ t('auth.lastName') }}</label
      ><InputText
        v-model="form.lastName"
        required
      />
    </div>
    <div class="full">
      <label>{{ t('auth.email') }}</label
      ><InputText
        v-model="form.email"
        type="email"
        required
      />
    </div>
    <div class="form-actions">
      <Button
        type="button"
        severity="secondary"
        :label="t('common.cancel')"
        @click="$emit('cancel')"
      /><Button
        type="submit"
        :label="t('common.save')"
        icon="pi pi-save"
      />
    </div>
  </form>
</template>
<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
defineEmits(['save', 'cancel'])
const { t } = useI18n({ useScope: 'global' })
const form = reactive({ firstName: '', lastName: '', email: '', passwordHash: 'FleetCare123!' })
</script>
