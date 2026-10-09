<template>
  <form
    class="form-grid"
    novalidate
    @submit.prevent="submit"
  >
    <MaintenanceErrors :errors="errors" />
    <div>
      <label>{{ t('maintenance.plan') }}</label
      ><Select
        v-model="form.maintenancePlanId"
        :options="plans"
        option-label="display"
        option-value="id"
        show-clear
        :placeholder="t('maintenance.unplanned')"
        @change="applyPlan"
      />
    </div>
    <div>
      <label>{{ t('common.vehicle') }} *</label
      ><Select
        v-model="form.vehicleId"
        :options="vehicles"
        option-label="display"
        option-value="id"
        filter
        :disabled="Boolean(form.maintenancePlanId)"
        :invalid="touched && !form.vehicleId"
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
      <label>{{ t('maintenance.performedDate') }} *</label
      ><DatePicker
        v-model="performed"
        date-format="yy-mm-dd"
        :max-date="today"
        show-icon
        :invalid="touched && !performed"
      />
    </div>
    <div>
      <label>{{ t('maintenance.mileage') }} *</label
      ><InputNumber
        v-model="form.mileage"
        suffix=" km"
        :min="0"
        :invalid="touched && form.mileage == null"
      />
      <small
        v-if="currentMileage != null"
        class="field-hint"
        >{{ t('maintenance.currentMileage') }}: {{ currentMileage.toLocaleString() }} km</small
      >
    </div>
    <div class="full">
      <label>{{ t('maintenance.workDescription') }} *</label
      ><Textarea
        v-model="form.workDescription"
        rows="3"
        :placeholder="t('maintenance.workPlaceholder')"
        :invalid="touched && !form.workDescription?.trim()"
      />
    </div>
    <div class="full parts-box">
      <div class="parts-header">
        <strong>{{ t('maintenance.parts') }}</strong
        ><Button
          type="button"
          icon="pi pi-plus"
          size="small"
          text
          :label="t('maintenance.addPart')"
          @click="addPart"
        />
      </div>
      <p
        v-if="!parts.length"
        class="field-hint"
      >
        {{ t('maintenance.noPartsYet') }}
      </p>
      <div
        v-for="(p, i) in parts"
        :key="i"
        class="part-row"
      >
        <InputText
          v-model="p.name"
          :placeholder="t('maintenance.partName')"
          :invalid="touched && !p.name?.trim()"
        /><InputNumber
          v-model="p.quantity"
          :min="1"
          :placeholder="t('maintenance.quantity')"
          :invalid="touched && !(p.quantity > 0)"
        /><InputNumber
          v-model="p.unitCost"
          mode="currency"
          currency="PEN"
          locale="es-PE"
          :min="0"
          :placeholder="t('maintenance.unitCost')"
          :invalid="touched && p.unitCost == null"
        /><span class="part-subtotal">{{ money(partSubtotal(p)) }}</span
        ><Button
          type="button"
          icon="pi pi-trash"
          severity="danger"
          text
          rounded
          :aria-label="t('maintenance.removePart')"
          @click="parts.splice(i, 1)"
        />
      </div>
      <small
        v-if="parts.length"
        class="field-hint"
        >{{ t('maintenance.partsCost') }}: {{ money(partsCost) }}</small
      >
    </div>
    <div>
      <label>{{ t('maintenance.totalCost') }} *</label
      ><InputNumber
        v-model="form.totalCost"
        mode="currency"
        currency="PEN"
        locale="es-PE"
        :min="0"
        :invalid="touched && !(form.totalCost > 0)"
        @input="costEdited = true"
      />
      <small class="field-hint">{{ t('maintenance.totalCostHint') }}</small>
    </div>
    <div class="full">
      <label>{{ t('maintenance.notes') }}</label
      ><Textarea
        v-model="form.notes"
        rows="2"
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
import { MaintenanceRecord } from '../../domain/model/maintenance-record.entity.js'
import { toIsoDate } from '../../domain/model/maintenance-date.js'
const props = defineProps({
  vehicles: Array,
  plans: Array,
  plan: Object,
  currentMileageByVehicle: { type: Object, default: () => ({}) }
})
const emit = defineEmits(['save', 'cancel'])
const { t } = useI18n({ useScope: 'global' })
const today = new Date()
const blank = {
  maintenancePlanId: null,
  vehicleId: null,
  maintenanceType: '',
  performedDate: null,
  mileage: null,
  workDescription: '',
  totalCost: null,
  notes: ''
}
const form = reactive({ ...blank })
const performed = ref(new Date())
const parts = ref([])
const errors = ref([])
const touched = ref(false)
const costEdited = ref(false)
watch(
  () => props.plan,
  (p) => {
    Object.assign(form, blank)
    performed.value = new Date()
    parts.value = []
    errors.value = []
    touched.value = false
    costEdited.value = false
    if (p) {
      form.maintenancePlanId = p.id
      applyPlan()
    }
  },
  { immediate: true }
)
const currentMileage = computed(() =>
  form.vehicleId ? (props.currentMileageByVehicle[form.vehicleId] ?? null) : null
)
const partSubtotal = (p) => Number(p.quantity || 0) * Number(p.unitCost || 0)
const partsCost = computed(() => parts.value.reduce((s, p) => s + partSubtotal(p), 0))
watch(partsCost, (v) => {
  if (!costEdited.value) form.totalCost = v || null
})
const money = (v) => `S/ ${Number(v || 0).toFixed(2)}`
function applyPlan() {
  const p = (props.plans || []).find((x) => String(x.id) === String(form.maintenancePlanId))
  if (!p) return
  form.vehicleId = p.vehicleId
  form.maintenanceType = p.maintenanceType
}
function addPart() {
  parts.value.push({ name: '', quantity: 1, unitCost: null })
}
function submit() {
  touched.value = true
  const record = {
    ...form,
    maintenanceType: form.maintenanceType?.trim(),
    workDescription: form.workDescription?.trim(),
    performedDate: toIsoDate(performed.value),
    notes: form.notes?.trim() || null
  }
  const cleanParts = parts.value.map((p) => ({ ...p, name: p.name?.trim() }))
  errors.value = MaintenanceRecord.validate(record, cleanParts, {
    vehicleIds: (props.vehicles || []).map((v) => v.id)
  })
  if (!errors.value.length) emit('save', { record, parts: cleanParts })
}
</script>
<style scoped>
.field-hint {
  color: #64748b;
}
.parts-box {
  border: 1px solid #e2e8f0;
  border-radius: 0.7rem;
  padding: 0.85rem 1rem;
}
.parts-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.part-row {
  display: grid !important;
  grid-template-columns: minmax(0, 2fr) 90px minmax(0, 1fr) 90px auto;
  gap: 0.5rem;
  align-items: center;
  margin-top: 0.5rem;
}
.part-row :deep(.p-inputnumber-input) {
  width: 100%;
}
.part-subtotal {
  text-align: right;
  font-weight: 600;
}
@media (max-width: 640px) {
  .part-row {
    grid-template-columns: 1fr 1fr;
  }
  .part-row > :first-child {
    grid-column: 1 / -1;
  }
}
</style>
