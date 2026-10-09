<template>
  <form
    class="form-grid"
    novalidate
    @submit.prevent="submit"
  >
    <MaintenanceErrors :errors="errors" />
    <div>
      <label>{{ t('common.vehicle') }} *</label
      ><Select
        v-model="form.vehicleId"
        :options="vehicles"
        option-label="display"
        option-value="id"
        filter
        :invalid="touched && !form.vehicleId"
      />
      <small
        v-if="currentMileage != null"
        class="field-hint"
        >{{ t('maintenance.currentMileage') }}: {{ currentMileage.toLocaleString() }} km</small
      >
    </div>
    <div>
      <label>{{ t('maintenance.relatedIncident') }}</label
      ><Select
        v-model="form.relatedIncidentId"
        :options="vehicleIncidents"
        option-label="display"
        option-value="id"
        show-clear
        :placeholder="t('maintenance.optional')"
      />
    </div>
    <div class="full">
      <label>{{ t('maintenance.type') }} *</label
      ><InputText
        v-model="form.maintenanceType"
        :invalid="touched && !form.maintenanceType?.trim()"
      />
    </div>
    <div>
      <label>{{ t('maintenance.scheduledDate') }}</label
      ><DatePicker
        v-model="scheduled"
        date-format="yy-mm-dd"
        :min-date="form.id ? null : today"
        show-icon
        show-button-bar
      />
    </div>
    <div>
      <label>{{ t('maintenance.targetMileage') }}</label
      ><InputNumber
        v-model="form.targetMileage"
        suffix=" km"
        :min="0"
      />
    </div>
    <small class="full field-hint">{{ t('maintenance.targetHint') }}</small>
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
      />
    </div>
  </form>
</template>
<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Select from 'primevue/select'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import DatePicker from 'primevue/datepicker'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import MaintenanceErrors from './MaintenanceErrors.vue'
import { MaintenancePlan } from '../../domain/model/maintenance-plan.entity.js'
import { fromIsoDate, toIsoDate } from '../../domain/model/maintenance-date.js'
const props = defineProps({
  plan: Object,
  vehicles: Array,
  incidents: Array,
  currentMileageByVehicle: { type: Object, default: () => ({}) }
})
const emit = defineEmits(['save', 'cancel'])
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
const errors = ref([])
const touched = ref(false)
const today = new Date()
watch(
  () => props.plan,
  (v) => {
    Object.assign(form, blank, v || {})
    scheduled.value = fromIsoDate(form.scheduledDate)
    errors.value = []
    touched.value = false
  },
  { immediate: true }
)
const currentMileage = computed(() =>
  form.vehicleId ? (props.currentMileageByVehicle[form.vehicleId] ?? null) : null
)
const vehicleIncidents = computed(() =>
  (props.incidents || []).filter(
    (i) => !form.vehicleId || String(i.vehicleId) === String(form.vehicleId)
  )
)
function submit() {
  touched.value = true
  const resource = {
    ...form,
    maintenanceType: form.maintenanceType?.trim(),
    scheduledDate: toIsoDate(scheduled.value),
    notes: form.notes?.trim() || null
  }
  errors.value = MaintenancePlan.validate(resource, {
    vehicleIds: (props.vehicles || []).map((v) => v.id),
    currentMileage: currentMileage.value
  })
  if (!errors.value.length) emit('save', resource)
}
</script>
<style scoped>
.field-hint {
  color: #64748b;
}
</style>
