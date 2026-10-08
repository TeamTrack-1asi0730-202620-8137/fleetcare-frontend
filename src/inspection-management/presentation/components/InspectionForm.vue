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
        filter
        required
      />
    </div>
    <div>
      <label>{{ t('common.driver') }}</label
      ><Select
        v-model="form.driverId"
        :options="drivers"
        option-label="display"
        option-value="id"
        filter
        required
      />
    </div>
    <div>
      <label>{{ t('inspection.checklist') }}</label
      ><Select
        v-model="form.checklistId"
        :options="checklists"
        option-label="name"
        option-value="id"
        required
      />
    </div>
    <div class="full">
      <label>{{ t('inspection.observation') }}</label
      ><Textarea
        v-model="form.observation"
        rows="3"
      />
    </div>
    <div
      class="full checklist-box"
      v-if="items.length"
    >
      <strong>{{ t('inspection.checklist') }}</strong>
      <div
        v-for="item in items"
        :key="item.id"
        class="check-row"
      >
        <span>{{ item.description }}</span
        ><Select
          v-model="results[item.id]"
          :options="resultOptions"
          option-label="label"
          option-value="value"
        />
      </div>
    </div>
    <div class="form-actions">
      <Button
        type="button"
        severity="secondary"
        :label="t('common.cancel')"
        @click="$emit('cancel')"
      /><Button
        type="submit"
        :label="t('inspection.complete')"
        icon="pi pi-check"
      />
    </div>
  </form>
</template>
<script setup>
import { reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
const props = defineProps({ vehicles: Array, drivers: Array, checklists: Array, items: Array })
const emit = defineEmits(['save', 'cancel'])
const { t } = useI18n({ useScope: 'global' })
const form = reactive({
  vehicleId: null,
  driverId: null,
  checklistId: 1,
  inspectionDate: new Date().toISOString(),
  status: 'compliant',
  observation: ''
})
const results = reactive({})
const resultOptions = computed(() => [
  { label: t('inspection.compliant'), value: 'compliant' },
  { label: t('inspection.nonCompliant'), value: 'non_compliant' }
])
function submit() {
  const detail = props.items.map((i) => ({
    checklistItemId: i.id,
    result: results[i.id] || 'compliant',
    observation: null
  }))
  const status = detail.some((x) => x.result === 'non_compliant') ? 'non_compliant' : 'compliant'
  emit('save', {
    inspection: { ...form, status, inspectionDate: new Date().toISOString() },
    results: detail
  })
}
</script>
