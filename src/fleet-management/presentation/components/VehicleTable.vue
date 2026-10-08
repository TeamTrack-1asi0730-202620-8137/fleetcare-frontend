<template>
  <DataTable
    :value="vehicles"
    :loading="loading"
    paginator
    :rows="8"
    responsive-layout="scroll"
    striped-rows
  >
    <Column
      field="plateNumber"
      :header="t('fleet.plate')"
    />
    <Column
      field="brand"
      :header="t('fleet.brand')"
    /><Column
      field="model"
      :header="t('fleet.model')"
    /><Column
      field="year"
      :header="t('fleet.year')"
    />
    <Column :header="t('common.status')"
      ><template #body="{ data }"><StatusTag :status="data.status" /></template
    ></Column>
    <Column :header="t('common.actions')"
      ><template #body="{ data }"
        ><div class="row-actions">
          <Button
            icon="pi pi-eye"
            text
            rounded
            @click="$emit('details', data)"
          /><Button
            icon="pi pi-pencil"
            text
            rounded
            @click="$emit('edit', data)"
          /></div></template
    ></Column>
  </DataTable>
</template>
<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import StatusTag from '@/shared/presentation/components/StatusTag.vue'
import { useI18n } from 'vue-i18n'
defineProps({ vehicles: Array, loading: Boolean })
defineEmits(['details', 'edit'])
const { t } = useI18n({ useScope: 'global' })
</script>
