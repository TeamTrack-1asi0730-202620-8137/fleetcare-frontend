<template>
  <section>
    <div class="page-header">
      <div>
        <h1>{{ t('operations.mileage') }}</h1>
        <p>{{ t('operations.subtitle') }}</p>
      </div>
      <Button
        :label="t('operations.newMileage')"
        icon="pi pi-plus"
        @click="dialog = true"
      />
    </div>
    <Card
      ><template #content
        ><DataTable
          :value="rows"
          :loading="store.loading"
          paginator
          :rows="10"
          ><Column
            field="vehicleLabel"
            :header="t('common.vehicle')"
          /><Column
            field="mileage"
            :header="t('operations.mileage')"
          /><Column
            field="recordedAt"
            :header="t('common.date')"
            ><template #body="{ data }">{{
              new Date(data.recordedAt).toLocaleString()
            }}</template></Column
          ></DataTable
        ></template
      ></Card
    ><Dialog
      v-model:visible="dialog"
      modal
      :header="t('operations.newMileage')"
      :style="{ width: 'min(650px,95vw)' }"
      ><MileageForm
        :vehicles="vehicleOptions"
        :drivers="driverOptions"
        @save="save"
        @cancel="dialog = false"
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
import MileageForm from '../components/MileageForm.vue'
import { useVehicleOperationsStore } from '../../application/vehicle-operations.store.js'
import { useFleetManagementStore } from '@/fleet-management/application/fleet-management.store.js'
import { useUserAccessStore } from '@/user-access/application/user-access.store.js'
const { t } = useI18n({ useScope: 'global' }),
  store = useVehicleOperationsStore(),
  fleet = useFleetManagementStore(),
  users = useUserAccessStore(),
  dialog = ref(false)
onMounted(async () =>
  Promise.all([store.fetchAll(), fleet.fetchVehicles(users.user?.fleetId), users.fetchUsers()])
)
const vehicleOptions = computed(() =>
  fleet.vehicles.map((v) => ({ ...v, display: `${v.plateNumber} · ${v.brand} ${v.model}` }))
)
const driverOptions = computed(() =>
  users.users
    .filter((u) => u.roleId === 2)
    .map((u) => ({ ...u, display: `${u.firstName} ${u.lastName}` }))
)
const rows = computed(() =>
  store.mileageRecords.map((x) => ({
    ...x,
    vehicleLabel: vehicleOptions.value.find((v) => v.id === x.vehicleId)?.display || x.vehicleId
  }))
)
async function save(x) {
  await store.addMileage(x)
  dialog.value = false
}
</script>
