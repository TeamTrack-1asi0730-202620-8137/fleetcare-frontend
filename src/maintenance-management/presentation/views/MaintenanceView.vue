<template>
  <section>
    <div class="page-header">
      <div>
        <h1>{{ t('maintenance.title') }}</h1>
        <p>{{ t('maintenance.subtitle') }}</p>
      </div>
      <div class="header-actions">
        <Button
          :label="t('maintenance.newRecord')"
          icon="pi pi-check-square"
          severity="secondary"
          @click="recordDialog = true"
        /><Button
          :label="t('maintenance.newPlan')"
          icon="pi pi-plus"
          @click="planDialog = true"
        />
      </div>
    </div>
    <div class="two-column">
      <Card
        ><template #title>{{ t('maintenance.title') }}</template
        ><template #content
          ><DataTable
            :value="planRows"
            :loading="store.loading"
            paginator
            :rows="6"
            ><Column
              field="vehicleLabel"
              :header="t('common.vehicle')" /><Column
              field="maintenanceType"
              :header="t('maintenance.type')" /><Column
              field="scheduledDate"
              :header="t('maintenance.scheduledDate')" /><Column :header="t('common.status')"
              ><template #body="{ data }"
                ><StatusTag
                  :status="data.status" /></template></Column></DataTable></template></Card
      ><Card
        ><template #title>{{ t('maintenance.history') }}</template
        ><template #content
          ><DataTable
            :value="recordRows"
            paginator
            :rows="6"
            ><Column
              field="vehicleLabel"
              :header="t('common.vehicle')"
            /><Column
              field="maintenanceType"
              :header="t('maintenance.type')"
            /><Column
              field="performedDate"
              :header="t('maintenance.performedDate')"
            /><Column
              field="totalCost"
              :header="t('maintenance.totalCost')"
              ><template #body="{ data }"
                >S/ {{ Number(data.totalCost || 0).toFixed(2) }}</template
              ></Column
            ></DataTable
          ></template
        ></Card
      >
    </div>
    <Dialog
      v-model:visible="planDialog"
      modal
      :header="t('maintenance.newPlan')"
      :style="{ width: 'min(760px,96vw)' }"
      ><MaintenancePlanForm
        :vehicles="vehicleOptions"
        :incidents="incidentOptions"
        @save="savePlan"
        @cancel="planDialog = false" /></Dialog
    ><Dialog
      v-model:visible="recordDialog"
      modal
      :header="t('maintenance.newRecord')"
      :style="{ width: 'min(760px,96vw)' }"
      ><MaintenanceRecordForm
        :vehicles="vehicleOptions"
        :plans="planOptions"
        @save="saveRecord"
        @cancel="recordDialog = false"
    /></Dialog>
  </section>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Dialog from 'primevue/dialog'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import StatusTag from '@/shared/presentation/components/StatusTag.vue'
import MaintenancePlanForm from '../components/MaintenancePlanForm.vue'
import MaintenanceRecordForm from '../components/MaintenanceRecordForm.vue'
import { useMaintenanceManagementStore } from '../../application/maintenance-management.store.js'
import { useFleetManagementStore } from '@/fleet-management/application/fleet-management.store.js'
import { useIncidentManagementStore } from '@/incident-management/application/incident-management.store.js'
import { useUserAccessStore } from '@/user-access/application/user-access.store.js'
const { t } = useI18n({ useScope: 'global' }),
  store = useMaintenanceManagementStore(),
  fleet = useFleetManagementStore(),
  incidents = useIncidentManagementStore(),
  auth = useUserAccessStore(),
  planDialog = ref(false),
  recordDialog = ref(false)
onMounted(async () =>
  Promise.all([
    store.fetchAll(),
    fleet.fetchVehicles(auth.user?.fleetId),
    incidents.fetchIncidents()
  ])
)
const vehicleOptions = computed(() =>
  fleet.vehicles.map((v) => ({ ...v, display: `${v.plateNumber} · ${v.brand} ${v.model}` }))
)
const incidentOptions = computed(() =>
  incidents.incidents
    .filter((i) => i.status !== 'resolved')
    .map((i) => ({ ...i, display: `#${i.id} · ${i.title}` }))
)
const planOptions = computed(() =>
  store.plans
    .filter((p) => p.status !== 'completed')
    .map((p) => ({ ...p, display: `#${p.id} · ${p.maintenanceType}` }))
)
const planRows = computed(() =>
  store.plans.map((p) => ({
    ...p,
    vehicleLabel: vehicleOptions.value.find((v) => v.id === p.vehicleId)?.display || p.vehicleId
  }))
)
const recordRows = computed(() =>
  store.records.map((p) => ({
    ...p,
    vehicleLabel: vehicleOptions.value.find((v) => v.id === p.vehicleId)?.display || p.vehicleId
  }))
)
async function savePlan(p) {
  await store.savePlan(p)
  planDialog.value = false
}
async function saveRecord(x) {
  await store.addRecord(x.record, x.parts)
  recordDialog.value = false
}
</script>
