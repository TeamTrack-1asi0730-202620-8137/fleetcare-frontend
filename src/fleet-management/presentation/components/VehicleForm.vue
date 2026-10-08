<template>
  <form
    class="form-grid"
    @submit.prevent="submit"
  >
    <div>
      <label>{{ t('fleet.plate') }}</label
      ><InputText
        v-model="form.plateNumber"
        required
      />
    </div>
    <div>
      <label>{{ t('fleet.brand') }}</label
      ><InputText
        v-model="form.brand"
        required
      />
    </div>
    <div>
      <label>{{ t('fleet.model') }}</label
      ><InputText
        v-model="form.model"
        required
      />
    </div>
    <div>
      <label>{{ t('fleet.year') }}</label
      ><InputNumber
        v-model="form.year"
        :use-grouping="false"
        required
      />
    </div>
    <div>
      <label>{{ t('fleet.vin') }}</label
      ><InputText v-model="form.vin" />
    </div>
    <div>
      <label>{{ t('fleet.status') }}</label
      ><Select
        v-model="form.status"
        :options="statuses"
        option-label="label"
        option-value="value"
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
import { reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import Button from 'primevue/button'
const props = defineProps({ vehicle: Object, fleetId: Number })
const emit = defineEmits(['save', 'cancel'])
const { t } = useI18n({ useScope: 'global' })
const form = reactive({
  id: null,
  fleetId: props.fleetId,
  plateNumber: '',
  brand: '',
  model: '',
  year: new Date().getFullYear(),
  vin: '',
  status: 'available',
  createdAt: null,
  updatedAt: null
})
const statuses = [
  { label: t('fleet.available'), value: 'available' },
  { label: t('fleet.requiresAttention'), value: 'requires_attention' },
  { label: t('fleet.outOfService'), value: 'out_of_service' }
]
watch(
  () => props.vehicle,
  (v) =>
    Object.assign(
      form,
      {
        id: null,
        fleetId: props.fleetId,
        plateNumber: '',
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        vin: '',
        status: 'available',
        createdAt: null,
        updatedAt: null
      },
      v || {}
    ),
  { immediate: true }
)
function submit() {
  emit('save', { ...form, plateNumber: form.plateNumber.trim().toUpperCase() })
}
</script>
