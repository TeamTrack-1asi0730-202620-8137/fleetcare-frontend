<template>
  <DataTable
    :value="rows"
    :loading="loading"
    paginator
    :rows="8"
    sort-field="sortKey"
    :sort-order="1"
    ><template #empty>{{ emptyMessage }}</template
    ><Column
      field="vehicleLabel"
      :header="t('common.vehicle')" /><Column
      field="maintenanceType"
      :header="t('maintenance.type')" /><Column :header="t('maintenance.target')"
      ><template #body="{ data }"
        ><div class="target-cell">
          <span v-if="data.scheduledDate"
            ><i class="pi pi-calendar" /> {{ data.scheduledDate }}</span
          ><span v-if="data.targetMileage != null"
            ><i class="pi pi-gauge" /> {{ km(data.targetMileage) }}</span
          >
        </div></template
      ></Column
    ><Column :header="t('maintenance.currentMileage')"
      ><template #body="{ data }">{{
        data.currentMileage != null ? km(data.currentMileage) : '—'
      }}</template></Column
    ><Column :header="t('common.status')"
      ><template #body="{ data }"
        ><StatusTag :status="data.effectiveStatus" /><small
          v-if="data.overdueReason"
          class="overdue-reason"
          >{{ data.overdueReason }}</small
        ></template
      ></Column
    ><Column :header="t('common.actions')"
      ><template #body="{ data }"
        ><div
          v-if="data.effectiveStatus !== 'completed'"
          class="row-actions"
        >
          <Button
            v-tooltip.top="t('maintenance.registerDone')"
            icon="pi pi-check-square"
            text
            rounded
            :aria-label="t('maintenance.registerDone')"
            @click="$emit('complete', data)"
          /><Button
            v-tooltip.top="t('common.edit')"
            icon="pi pi-pencil"
            text
            rounded
            :aria-label="t('common.edit')"
            @click="$emit('edit', data)"
          /></div></template></Column
  ></DataTable>
</template>
<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import vTooltip from 'primevue/tooltip'
import StatusTag from '@/shared/presentation/components/StatusTag.vue'
import { useI18n } from 'vue-i18n'
defineProps({ rows: Array, loading: Boolean, emptyMessage: String })
defineEmits(['edit', 'complete'])
const { t } = useI18n({ useScope: 'global' })
const km = (v) => `${Number(v).toLocaleString()} km`
</script>
<style scoped>
.target-cell {
  display: grid;
  gap: 0.2rem;
  white-space: nowrap;
}
.target-cell i {
  color: #64748b;
  font-size: 0.85rem;
}
.overdue-reason {
  display: block;
  color: #b91c1c;
  margin-top: 0.25rem;
}
</style>
