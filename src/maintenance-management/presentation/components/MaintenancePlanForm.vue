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
        required
      />
    </div>
    <div>
      <label>{{ t('maintenance.relatedIncident') }}</label
      ><Select
        v-model="form.relatedIncidentId"
        :options="incidents"
        option-label="display"
        option-value="id"
        show-clear
      />
    </div>
    <div class="full">
      <label>{{ t('maintenance.type') }}</label
      ><InputText
        v-model="form.maintenanceType"
        required
      />
    </div>
    <div>
      <label>{{ t('maintenance.scheduledDate') }}</label
      ><DatePicker
        v-model="scheduled"
        date-format="yy-mm-dd"
      />
    </div>
    <div>
      <label>{{ t('maintenance.targetMileage') }}</label
      ><InputNumber
        v-model="form.targetMileage"
        :min="0"
      />
    </div>
    <div class="full">
      <label>{{ t('maintenance.notes') }}</label
      ><Textarea
        v-model="form.notes"
        rows="3"
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
        @click="syncDate"
      />
    </div>
  </form>
</template>
<script setup>
import { reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Select from 'primevue/select'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import DatePicker from 'primevue/datepicker'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
const props = defineProps({ plan: Object, vehicles: Array, incidents: Array })
defineEmits(['save', 'cancel'])
const { t } = useI18n({ useScope: 'global' })
const blank = {
  id: null,
  vehicleId: null,
  relatedIncidentId: null,
  maintenanceType: '',
  scheduledDate: null,
  targetMileage: null,
  status: 'upcoming',
  notes: '',
  createdAt: null,
  updatedAt: null
}
const form = reactive({ ...blank })
const scheduled = ref(null)
watch(
  () => props.plan,
  (v) => {
    Object.assign(form, blank, v || {})
    scheduled.value = form.scheduledDate ? new Date(`${form.scheduledDate}T12:00:00`) : null
  },
  { immediate: true }
)
function syncDate() {
  form.scheduledDate = scheduled.value ? scheduled.value.toISOString().slice(0, 10) : null
}
</script>
