<template>
  <form
    class="form-grid"
    @submit.prevent="$emit('save', { ...form })"
  >
    <div>
      <label>{{ t('common.vehicle') }}</label
      ><Select
        v-model="form.vehicleId"
        :options="vehicles"
        option-label="display"
        option-value="id"
        filter
        required
      />
    </div>
    <div>
      <label>{{ t('common.driver') }}</label
      ><Select
        v-model="form.reportedByUserId"
        :options="drivers"
        option-label="display"
        option-value="id"
        filter
        required
      />
    </div>
    <div class="full">
      <label>{{ t('incident.titleField') }}</label
      ><InputText
        v-model="form.title"
        required
      />
    </div>
    <div class="full">
      <label>{{ t('incident.description') }}</label
      ><Textarea
        v-model="form.description"
        rows="4"
        required
      />
    </div>
    <div class="full">
      <label>{{ t('incident.address') }}</label
      ><InputText v-model="form.address" />
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
import { reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Select from 'primevue/select'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
const props = defineProps({ incident: Object, vehicles: Array, drivers: Array })
defineEmits(['save', 'cancel'])
const { t } = useI18n({ useScope: 'global' })
const blank = {
  id: null,
  vehicleId: null,
  reportedByUserId: null,
  sourceInspectionId: null,
  title: '',
  description: '',
  status: 'reported',
  latitude: null,
  longitude: null,
  address: '',
  reportedAt: null,
  resolvedAt: null,
  resolution: null,
  createdAt: null,
  updatedAt: null
}
const form = reactive({ ...blank })
watch(
  () => props.incident,
  (v) => Object.assign(form, blank, v || {}),
  { immediate: true }
)
</script>
