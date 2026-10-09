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
          @click="openRecord(null)"
        /><Button
          :label="t('maintenance.newPlan')"
          icon="pi pi-plus"
          @click="openPlan(null)"
        />
      </div>
    </div>
    <Message
      v-if="overdueCount"
      severity="warn"
      class="mb-3"
      ><span class="overdue-banner"
        >{{ t('maintenance.overdueBanner', { count: overdueCount }) }}
        <Button
          :label="t('maintenance.viewOverdue')"
          size="small"
          text
          @click="showOverdue" /></span
    ></Message>
    <Tabs v-model:value="tab"
      ><TabList
        ><Tab value="plans"><i class="pi pi-calendar-clock" /> {{ t('maintenance.scheduled') }}</Tab
        ><Tab value="history"
          ><i class="pi pi-history" /> {{ t('maintenance.history') }}</Tab
        ></TabList
      ><TabPanels
        ><TabPanel value="plans"
          ><div class="toolbar-row">
            <SelectButton
              v-model="statusFilter"
              :options="statusOptions"
              option-label="label"
              option-value="value"
              :allow-empty="false"
            /><Select
              v-model="planVehicleFilter"
              :options="vehicleOptions"
              option-label="display"
              option-value="id"
              show-clear
              filter
              class="filter-select"
              :placeholder="t('maintenance.allVehicles')"
            />
          </div>
          <MaintenancePlanTable
            :rows="filteredPlans"
            :loading="store.loading"
            :empty-message="planEmptyMessage"
            @edit="openPlan"
            @complete="openRecord" /></TabPanel
        ><TabPanel value="history"
          ><div class="toolbar-row">
            <Select
              v-model="historyVehicleFilter"
              :options="vehicleOptions"
              option-label="display"
              option-value="id"
              show-clear
              filter
              class="filter-select"
              :placeholder="t('maintenance.allVehicles')"
            /><span class="history-total"
              >{{ t('maintenance.historyTotal') }}:
              <strong>S/ {{ historyTotal.toFixed(2) }}</strong>
            </span>
          </div>
          <MaintenanceRecordTable
            :rows="filteredRecords"
            :loading="store.loading"
            :empty-message="historyEmptyMessage"
            @details="(x) => router.push(`/maintenance/records/${x.id}`)" /></TabPanel></TabPanels
    ></Tabs>
    <Dialog
      v-model:visible="planDialog"
      modal
      :header="selectedPlan?.id ? t('maintenance.editPlan') : t('maintenance.newPlan')"
      :style="{ width: 'min(760px,96vw)' }"
      ><MaintenancePlanForm
        :key="formKey"
        :plan="selectedPlan"
        :vehicles="vehicleOptions"
        :incidents="incidentOptions"
        :current-mileage-by-vehicle="currentMileageByVehicle"
        @save="savePlan"
        @cancel="planDialog = false" /></Dialog
    ><Dialog
      v-model:visible="recordDialog"
      modal
      :header="t('maintenance.newRecord')"
      :style="{ width: 'min(820px,96vw)' }"
      ><MaintenanceRecordForm
        :key="formKey"
        :plan="selectedPlan"
        :vehicles="vehicleOptions"
        :plans="planOptions"
        :current-mileage-by-vehicle="currentMileageByVehicle"
        @save="saveRecord"
        @cancel="recordDialog = false"
    /></Dialog>
  </section>
</template>
<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Message from 'primevue/message'
import Select from 'primevue/select'
import SelectButton from 'primevue/selectbutton'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import MaintenancePlanForm from '../components/MaintenancePlanForm.vue'
import MaintenanceRecordForm from '../components/MaintenanceRecordForm.vue'
import MaintenancePlanTable from '../components/MaintenancePlanTable.vue'
import MaintenanceRecordTable from '../components/MaintenanceRecordTable.vue'
import { useMaintenanceManagementStore } from '../../application/maintenance-management.store.js'
import { useFleetManagementStore } from '@/fleet-management/application/fleet-management.store.js'
import { useIncidentManagementStore } from '@/incident-management/application/incident-management.store.js'
import { useVehicleOperationsStore } from '@/vehicle-operations/application/vehicle-operations.store.js'
import { useUserAccessStore } from '@/user-access/application/user-access.store.js'
const { t } = useI18n({ useScope: 'global' }),
  route = useRoute(),
  router = useRouter(),
  store = useMaintenanceManagementStore(),
  fleet = useFleetManagementStore(),
  incidents = useIncidentManagementStore(),
  operations = useVehicleOperationsStore(),
  auth = useUserAccessStore(),
  planDialog = ref(false),
  recordDialog = ref(false),
  selectedPlan = ref(null),
  formKey = ref(0),
  tab = ref(route.query.tab === 'history' ? 'history' : 'plans'),
  statusFilter = ref(
    ['upcoming', 'overdue', 'completed'].includes(route.query.status)
      ? route.query.status
      : 'pending'
  ),
  planVehicleFilter = ref(null),
  historyVehicleFilter = ref(route.query.vehicleId ? Number(route.query.vehicleId) : null)
onMounted(async () =>
  Promise.all([
    store.fetchAll(),
    fleet.fetchVehicles(auth.user?.fleetId),
    incidents.fetchIncidents(),
    operations.fetchAll()
  ])
)
watch([tab, historyVehicleFilter], () =>
  router.replace({
    query: {
      ...(tab.value === 'history' ? { tab: 'history' } : {}),
      ...(tab.value === 'history' && historyVehicleFilter.value
        ? { vehicleId: historyVehicleFilter.value }
        : {})
    }
  })
)
const statusOptions = computed(() => [
  { label: t('maintenance.pendingFilter'), value: 'pending' },
  { label: t('maintenance.upcoming'), value: 'upcoming' },
  { label: t('maintenance.overdue'), value: 'overdue' },
  { label: t('maintenance.completed'), value: 'completed' },
  { label: t('common.all'), value: 'all' }
])
const vehicleOptions = computed(() =>
  fleet.vehicles.map((v) => ({ ...v, display: `${v.plateNumber} · ${v.brand} ${v.model}` }))
)
const fleetVehicleIds = computed(() => new Set(vehicleOptions.value.map((v) => String(v.id))))
const inFleet = (x) => fleetVehicleIds.value.has(String(x.vehicleId))
const vehicleLabel = (id) =>
  vehicleOptions.value.find((v) => String(v.id) === String(id))?.display || id
const currentMileageByVehicle = computed(() => {
  const map = {}
  for (const r of [...operations.mileageRecords, ...store.records]) {
    if (r.mileage != null && (map[r.vehicleId] == null || r.mileage > map[r.vehicleId]))
      map[r.vehicleId] = Number(r.mileage)
  }
  return map
})
const incidentOptions = computed(() =>
  incidents.incidents
    .filter((i) => i.status !== 'resolved' && inFleet(i))
    .map((i) => ({ ...i, display: `#${i.id} · ${i.title}` }))
)
const planRows = computed(() =>
  store.plans.filter(inFleet).map((p) => {
    const currentMileage = currentMileageByVehicle.value[p.vehicleId] ?? null
    const effectiveStatus = p.resolveStatus(currentMileage)
    const overdueReason =
      effectiveStatus === 'overdue'
        ? [
            p.isOverdueByDate() && t('maintenance.overdueByDate'),
            p.isOverdueByMileage(currentMileage) && t('maintenance.overdueByMileage')
          ]
            .filter(Boolean)
            .join(' · ')
        : null
    const rank = { overdue: 0, upcoming: 1, completed: 2 }[effectiveStatus]
    return {
      ...p,
      currentMileage,
      effectiveStatus,
      overdueReason,
      vehicleLabel: vehicleLabel(p.vehicleId),
      sortKey: `${rank}-${p.scheduledDate || '9999-12-31'}`
    }
  })
)
const overdueCount = computed(
  () => planRows.value.filter((p) => p.effectiveStatus === 'overdue').length
)
const filteredPlans = computed(() =>
  planRows.value.filter(
    (p) =>
      (statusFilter.value === 'all' ||
        (statusFilter.value === 'pending'
          ? p.effectiveStatus !== 'completed'
          : p.effectiveStatus === statusFilter.value)) &&
      (!planVehicleFilter.value || String(p.vehicleId) === String(planVehicleFilter.value))
  )
)
const planEmptyMessage = computed(() => {
  if (statusFilter.value === 'upcoming') return t('maintenance.noUpcoming')
  if (statusFilter.value === 'overdue') return t('maintenance.noOverdue')
  if (statusFilter.value === 'pending') return t('maintenance.noPending')
  return t('common.noData')
})
const planOptions = computed(() =>
  planRows.value
    .filter((p) => p.effectiveStatus !== 'completed')
    .map((p) => ({ ...p, display: `#${p.id} · ${p.maintenanceType} · ${p.vehicleLabel}` }))
)
const filteredRecords = computed(() =>
  store.records
    .filter(inFleet)
    .filter(
      (r) =>
        !historyVehicleFilter.value || String(r.vehicleId) === String(historyVehicleFilter.value)
    )
    .map((r) => ({ ...r, vehicleLabel: vehicleLabel(r.vehicleId) }))
)
const historyTotal = computed(() =>
  filteredRecords.value.reduce((s, r) => s + Number(r.totalCost || 0), 0)
)
const historyEmptyMessage = computed(() =>
  historyVehicleFilter.value ? t('maintenance.noHistoryForVehicle') : t('maintenance.noHistory')
)
function showOverdue() {
  tab.value = 'plans'
  statusFilter.value = 'overdue'
}
function openPlan(p) {
  selectedPlan.value = p ? { ...p } : null
  formKey.value++
  planDialog.value = true
}
function openRecord(p) {
  selectedPlan.value = p ? { ...p } : null
  formKey.value++
  recordDialog.value = true
}
async function savePlan(p) {
  const { id, vehicleId, relatedIncidentId, maintenanceType, scheduledDate, targetMileage } = p
  const status = p.status === 'completed' ? 'completed' : 'upcoming'
  await store.savePlan({
    ...(id ? { id, createdAt: p.createdAt } : {}),
    vehicleId,
    relatedIncidentId,
    maintenanceType,
    scheduledDate,
    targetMileage,
    status,
    notes: p.notes
  })
  planDialog.value = false
}
async function saveRecord(x) {
  await store.addRecord(x.record, x.parts)
  recordDialog.value = false
  tab.value = 'history'
}
</script>
<style scoped>
.overdue-banner {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.history-total {
  margin-left: auto;
  align-self: center;
  color: #475569;
}
.toolbar-row :deep(.p-selectbutton) {
  flex-wrap: wrap;
}
</style>
