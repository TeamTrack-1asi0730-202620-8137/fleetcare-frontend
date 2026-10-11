<template>
  <form
    class="form-grid"
    @submit.prevent="submit"
  >
    <div>
      <label for="mileage-vehicle">{{ t('common.vehicle') }}</label
      ><Select
        input-id="mileage-vehicle"
        v-model="form.vehicleId"
        :options="vehicles"
        option-label="display"
        option-value="id"
        required
      />
    </div>
    <div>
      <label for="mileage-driver">{{ t('common.driver') }}</label
      ><Select
        input-id="mileage-driver"
        v-model="form.registeredByUserId"
        :options="drivers"
        option-label="display"
        option-value="id"
        required
      />
    </div>
    <div>
      <label for="mileage-value">{{ t('operations.mileage') }}</label
      ><InputNumber
        input-id="mileage-value"
        v-model="form.mileage"
        :min="0"
        required
      />
    </div>
    <div>
      <label for="mileage-date">{{ t('operations.recordedAt') }}</label
      ><DatePicker
        input-id="mileage-date"
        v-model="date"
        show-time
        hour-format="24"
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
import InputNumber from 'primevue/inputnumber'
import DatePicker from 'primevue/datepicker'
import Button from 'primevue/button'
const props = defineProps({ vehicles: Array, drivers: Array })
const emit = defineEmits(['save', 'cancel'])
const { t } = useI18n({ useScope: 'global' })
const date = ref(new Date())
const form = reactive({
  vehicleId: null,
  registeredByUserId: null,
  mileage: null,
  recordedAt: null
})
function submit() {
  emit('save', { ...form, recordedAt: date.value.toISOString() })
}
</script>
