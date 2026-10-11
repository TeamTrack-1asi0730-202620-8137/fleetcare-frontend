<template>
  <form
    class="form-grid"
    @submit.prevent="submit"
  >
    <div>
      <label for="fuel-vehicle">{{ t('common.vehicle') }}</label
      ><Select
        input-id="fuel-vehicle"
        v-model="form.vehicleId"
        :options="vehicles"
        option-label="display"
        option-value="id"
        required
      />
    </div>
    <div>
      <label for="fuel-driver">{{ t('common.driver') }}</label
      ><Select
        input-id="fuel-driver"
        v-model="form.registeredByUserId"
        :options="drivers"
        option-label="display"
        option-value="id"
        required
      />
    </div>
    <div>
      <label for="fuel-mileage">{{ t('operations.mileage') }}</label
      ><InputNumber
        input-id="fuel-mileage"
        v-model="form.mileage"
        :min="0"
        required
      />
    </div>
    <div>
      <label for="fuel-liters">{{ t('operations.liters') }}</label
      ><InputNumber
        input-id="fuel-liters"
        v-model="form.liters"
        :min="0"
        :min-fraction-digits="1"
        required
      />
    </div>
    <div>
      <label for="fuel-total-cost">{{ t('operations.totalCost') }}</label
      ><InputNumber
        input-id="fuel-total-cost"
        v-model="form.totalCost"
        mode="currency"
        currency="PEN"
        locale="es-PE"
        required
      />
    </div>
    <div>
      <label for="fuel-date">{{ t('operations.fueledAt') }}</label
      ><DatePicker
        input-id="fuel-date"
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
defineProps({ vehicles: Array, drivers: Array })
const emit = defineEmits(['save', 'cancel'])
const { t } = useI18n({ useScope: 'global' })
const date = ref(new Date())
const form = reactive({
  vehicleId: null,
  registeredByUserId: null,
  mileage: null,
  liters: null,
  totalCost: null,
  fueledAt: null
})
function submit() {
  emit('save', { ...form, fueledAt: date.value.toISOString() })
}
</script>
