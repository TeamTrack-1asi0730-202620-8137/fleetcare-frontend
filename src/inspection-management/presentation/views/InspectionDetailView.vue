<template>
  <section>
    <div class="page-header">
      <div>
        <h1>{{ t('inspection.detail') }} #{{ inspection?.id }}</h1>
        <p>{{ inspection?.observation || '—' }}</p>
      </div>
      <Button
        icon="pi pi-arrow-left"
        severity="secondary"
        :label="t('inspection.title')"
        @click="router.push('/inspections')"
      />
    </div>
    <Card v-if="inspection"
      ><template #content
        ><div class="detail-grid">
          <div>
            <span>{{ t('common.vehicle') }}</span
            ><strong>{{ inspection.vehicleId }}</strong>
          </div>
          <div>
            <span>{{ t('common.driver') }}</span
            ><strong>{{ inspection.driverId }}</strong>
          </div>
          <div>
            <span>{{ t('common.date') }}</span
            ><strong>{{ new Date(inspection.inspectionDate).toLocaleString() }}</strong>
          </div>
          <div>
            <span>{{ t('common.status') }}</span
            ><StatusTag :status="inspection.status" />
          </div>
        </div>
        <DataTable
          :value="results"
          class="mt-4"
          ><Column
            field="checklistItemId"
            :header="t('inspection.checklist')" /><Column
            field="result"
            :header="t('common.status')"
            ><template #body="{ data }"><StatusTag :status="data.result" /></template></Column
          ><Column
            field="observation"
            :header="t('inspection.observation')" /></DataTable></template
    ></Card>
  </section>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Card from 'primevue/card'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import StatusTag from '@/shared/presentation/components/StatusTag.vue'
import { useInspectionManagementStore } from '../../application/inspection-management.store.js'
const { t } = useI18n({ useScope: 'global' }),
  route = useRoute(),
  router = useRouter(),
  store = useInspectionManagementStore(),
  inspection = ref(null),
  results = ref([])
onMounted(async () => {
  inspection.value = await store.getInspection(route.params.id)
  results.value = await store.getResults(route.params.id)
})
</script>
