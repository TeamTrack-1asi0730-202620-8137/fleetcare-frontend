<template>
  <section>
    <div class="page-header">
      <div>
        <h1>{{ t('inspection.title') }}</h1>
        <p>{{ t('inspection.subtitle') }}</p>
      </div>
      <Button
        :label="t('inspection.new')"
        icon="pi pi-plus"
        @click="dialog = true"
      />
    </div>
    <Card
      ><template #content
        ><InspectionTable
          :rows="rows"
          :loading="store.loading"
          @details="(r) => router.push(`/inspections/${r.id}`)" /></template></Card
    ><Dialog
      v-model:visible="dialog"
      modal
      :header="t('inspection.new')"
      :style="{ width: 'min(760px,96vw)' }"
      ><InspectionForm
        :vehicles="vehicleOptions"
        :drivers="driverOptions"
        :checklists="store.checklists"
        :items="store.checklistItems"
        @save="save"
        @cancel="dialog = false"
    /></Dialog>
  </section>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Dialog from 'primevue/dialog'
import InspectionTable from '../components/InspectionTable.vue'
import InspectionForm from '../components/InspectionForm.vue'
import { useInspectionManagementStore } from '../../application/inspection-management.store.js'
import { useFleetManagementStore } from '@/fleet-management/application/fleet-management.store.js'
import { useUserAccessStore } from '@/user-access/application/user-access.store.js'
const { t } = useI18n({ useScope: 'global' }),
  router = useRouter(),
  store = useInspectionManagementStore(),
  fleet = useFleetManagementStore(),
  users = useUserAccessStore(),
  dialog = ref(false)
onMounted(async () => {
  await Promise.all([
    store.fetchInspections(),
    store.fetchReference(),
    fleet.fetchVehicles(users.user?.fleetId),
    users.fetchUsers()
  ])
})
const vehicleOptions = computed(() =>
  fleet.vehicles.map((v) => ({ ...v, display: `${v.plateNumber} · ${v.brand} ${v.model}` }))
)
const driverOptions = computed(() =>
  users.users
    .filter((u) => u.roleId === 2)
    .map((u) => ({ ...u, display: `${u.firstName} ${u.lastName}` }))
)
const rows = computed(() =>
  store.inspections.map((x) => ({
    ...x,
    vehicleLabel: vehicleOptions.value.find((v) => v.id === x.vehicleId)?.display || x.vehicleId,
    driverLabel: driverOptions.value.find((d) => d.id === x.driverId)?.display || x.driverId
  }))
)
async function save({ inspection, results }) {
  await store.createInspection(inspection, results)
  dialog.value = false
}
</script>
