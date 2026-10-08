<template>
  <form
    class="form-grid"
    @submit.prevent="submit"
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
        v-model="form.maintenancePlanId"
        :options="plans"
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
      <label>{{ t('maintenance.performedDate') }}</label
      ><DatePicker
        v-model="performed"
        date-format="yy-mm-dd"
        required
      />
    </div>
    <div>
      <label>{{ t('maintenance.mileage') }}</label
      ><InputNumber
        v-model="form.mileage"
        :min="0"
        required
      />
    </div>
    <div class="full">
      <label>{{ t('maintenance.workDescription') }}</label
      ><Textarea
        v-model="form.workDescription"
        rows="4"
        required
      />
    </div>
    <div>
      <label>{{ t('maintenance.totalCost') }}</label
      ><InputNumber
        v-model="form.totalCost"
        mode="currency"
        currency="PEN"
        locale="es-PE"
        required
      />
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
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Select from 'primevue/select'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import DatePicker from 'primevue/datepicker'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
const props = defineProps({ vehicles: Array, plans: Array })
const emit = defineEmits(['save', 'cancel'])
const { t } = useI18n({ useScope: 'global' })
const performed = ref(new Date())
const form = reactive({
  maintenancePlanId: null,
  vehicleId: null,
  maintenanceType: '',
  performedDate: '',
  mileage: null,
  workDescription: '',
  totalCost: null,
  notes: ''
})
function submit() {
  form.performedDate = performed.value.toISOString().slice(0, 10)
  emit('save', { record: { ...form }, parts: [] })
}
</script>
