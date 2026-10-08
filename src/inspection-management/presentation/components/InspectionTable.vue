<template>
  <DataTable
    :value="rows"
    :loading="loading"
    paginator
    :rows="8"
    ><Column
      field="id"
      header="#" /><Column
      field="vehicleLabel"
      :header="t('common.vehicle')" /><Column
      field="driverLabel"
      :header="t('common.driver')" /><Column
      field="inspectionDate"
      :header="t('common.date')"
      ><template #body="{ data }">{{ fmt(data.inspectionDate) }}</template></Column
    ><Column :header="t('common.status')"
      ><template #body="{ data }"><StatusTag :status="data.status" /></template></Column
    ><Column :header="t('common.actions')"
      ><template #body="{ data }"
        ><Button
          icon="pi pi-eye"
          text
          rounded
          @click="$emit('details', data)" /></template></Column
  ></DataTable>
</template>
<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import StatusTag from '@/shared/presentation/components/StatusTag.vue'
import { useI18n } from 'vue-i18n'
defineProps({ rows: Array, loading: Boolean })
defineEmits(['details'])
const { t } = useI18n({ useScope: 'global' })
const fmt = (v) => (v ? new Date(v).toLocaleString() : '—')
</script>
