<template>
  <section>
    <div class="page-header">
      <div>
        <h1>{{ t('maintenance.detail') }} #{{ route.params.id }}</h1>
        <p v-if="record">{{ record.maintenanceType }} · {{ vehicleLabel }}</p>
      </div>
      <Button
        icon="pi pi-arrow-left"
        severity="secondary"
        :label="t('maintenance.history')"
        @click="router.push({ path: '/maintenance', query: { tab: 'history' } })"
      />
    </div>
    <Message
      v-if="notFound"
      severity="error"
      >{{ t('maintenance.notFound') }}</Message
    >
    <template v-else-if="record"
      ><Card
        ><template #content
          ><div class="detail-grid">
            <div>
              <span>{{ t('common.vehicle') }}</span
              ><strong>{{ vehicleLabel }}</strong>
            </div>
            <div>
              <span>{{ t('maintenance.type') }}</span
              ><strong>{{ record.maintenanceType }}</strong>
            </div>
            <div>
              <span>{{ t('maintenance.performedDate') }}</span
              ><strong>{{ record.performedDate }}</strong>
            </div>
            <div>
              <span>{{ t('maintenance.mileage') }}</span
              ><strong>{{ Number(record.mileage || 0).toLocaleString() }} km</strong>
            </div>
            <div>
              <span>{{ t('maintenance.plan') }}</span
              ><strong>{{
                plan ? `#${plan.id} · ${plan.maintenanceType}` : t('maintenance.unplanned')
              }}</strong>
            </div>
            <div>
              <span>{{ t('maintenance.relatedIncident') }}</span
              ><strong>
                <RouterLink
                  v-if="plan?.relatedIncidentId"
                  :to="`/incidents/${plan.relatedIncidentId}`"
                  >#{{ plan.relatedIncidentId }}</RouterLink
                ><template v-else>—</template></strong
              >
            </div>
            <div class="full">
              <span>{{ t('maintenance.workDescription') }}</span
              ><strong class="multiline">{{ record.workDescription }}</strong>
            </div>
            <div class="full">
              <span>{{ t('maintenance.notes') }}</span
              ><strong class="multiline">{{ record.notes || '—' }}</strong>
            </div>
          </div></template
        ></Card
      ><Card class="mt-3"
        ><template #title>{{ t('maintenance.parts') }}</template
        ><template #content
          ><DataTable :value="record.parts"
            ><template #empty>{{ t('maintenance.noParts') }}</template
            ><Column
              field="name"
              :header="t('maintenance.partName')"
            /><Column
              field="quantity"
              :header="t('maintenance.quantity')"
            /><Column :header="t('maintenance.unitCost')"
              ><template #body="{ data }">{{ money(data.unitCost) }}</template></Column
            ><Column :header="t('maintenance.subtotal')"
              ><template #body="{ data }">{{ money(data.subtotal) }}</template></Column
            ></DataTable
          >
          <div class="cost-summary">
            <div>
              <span>{{ t('maintenance.partsCost') }}</span
              ><strong>{{ money(record.partsCost) }}</strong>
            </div>
            <div>
              <span>{{ t('maintenance.otherCosts') }}</span
              ><strong>{{ money(record.totalCost - record.partsCost) }}</strong>
            </div>
            <div class="total">
              <span>{{ t('maintenance.totalCost') }}</span
              ><strong>{{ money(record.totalCost) }}</strong>
            </div>
          </div></template
        ></Card
      ></template
    >
  </section>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Message from 'primevue/message'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useMaintenanceManagementStore } from '../../application/maintenance-management.store.js'
import { useFleetManagementStore } from '@/fleet-management/application/fleet-management.store.js'
import { useUserAccessStore } from '@/user-access/application/user-access.store.js'
const { t } = useI18n({ useScope: 'global' }),
  route = useRoute(),
  router = useRouter(),
  store = useMaintenanceManagementStore(),
  fleet = useFleetManagementStore(),
  auth = useUserAccessStore(),
  record = ref(null),
  plan = ref(null),
  notFound = ref(false)
onMounted(async () => {
  if (!fleet.vehicles.length) await fleet.fetchVehicles(auth.user?.fleetId)
  const r = await store.getRecord(route.params.id)
  const inFleet = r && fleet.vehicles.some((v) => String(v.id) === String(r.vehicleId))
  if (!inFleet) {
    notFound.value = true
    return
  }
  record.value = r
  plan.value = await store.getPlan(r.maintenancePlanId)
})
const vehicleLabel = computed(() => {
  const v = fleet.vehicles.find((x) => String(x.id) === String(record.value?.vehicleId))
  return v ? `${v.plateNumber} · ${v.brand} ${v.model}` : record.value?.vehicleId
})
const money = (v) => `S/ ${Number(v || 0).toFixed(2)}`
</script>
<style scoped>
.multiline {
  white-space: pre-line;
}
.cost-summary {
  margin-top: 1rem;
  margin-left: auto;
  max-width: 320px;
  display: grid;
  gap: 0.4rem;
}
.cost-summary > div {
  display: flex;
  justify-content: space-between;
  color: #475569;
}
.cost-summary .total {
  border-top: 1px solid #e2e8f0;
  padding-top: 0.5rem;
  color: #0f172a;
  font-size: 1.05rem;
}
</style>
