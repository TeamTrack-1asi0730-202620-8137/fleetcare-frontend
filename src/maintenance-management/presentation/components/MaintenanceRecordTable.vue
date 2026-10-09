<template>
  <DataTable
    :value="rows"
    :loading="loading"
    paginator
    :rows="8"
    ><template #empty>{{ emptyMessage }}</template
    ><Column
      field="performedDate"
      :header="t('maintenance.performedDate')"
      sortable /><Column
      field="vehicleLabel"
      :header="t('common.vehicle')" /><Column
      field="maintenanceType"
      :header="t('maintenance.type')" /><Column
      field="mileage"
      :header="t('maintenance.mileage')"
      sortable
      ><template #body="{ data }"
        >{{ Number(data.mileage || 0).toLocaleString() }} km</template
      ></Column
    ><Column :header="t('maintenance.parts')"
      ><template #body="{ data }">{{ data.parts.length }}</template></Column
    ><Column
      field="totalCost"
      :header="t('maintenance.totalCost')"
      sortable
      ><template #body="{ data }">S/ {{ Number(data.totalCost || 0).toFixed(2) }}</template></Column
    ><Column :header="t('common.actions')"
      ><template #body="{ data }"
        ><Button
          v-tooltip.top="t('common.details')"
          icon="pi pi-eye"
          text
          rounded
          :aria-label="t('common.details')"
          @click="$emit('details', data)" /></template></Column
  ></DataTable>
</template>
<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import vTooltip from 'primevue/tooltip'
import { useI18n } from 'vue-i18n'
defineProps({ rows: Array, loading: Boolean, emptyMessage: String })
defineEmits(['details'])
const { t } = useI18n({ useScope: 'global' })
</script>
