<template>
  <section>
    <div class="page-header">
      <div>
        <h1>{{ t('operations.fuel') }}</h1>
        <p>{{ t('operations.subtitle') }}</p>
      </div>
      <Button
        :label="t('operations.newFuel')"
        icon="pi pi-plus"
        @click="dialog = true"
      />
    </div>
    <div class="stats-grid">
      <Card
        ><template #content
          ><span>{{ t('operations.liters') }}</span
          ><strong>{{ totalLiters.toFixed(1) }} L</strong></template
        ></Card
      ><Card
        ><template #content
          ><span>{{ t('operations.totalCost') }}</span
          ><strong>S/ {{ totalCost.toFixed(2) }}</strong></template
        ></Card
      >
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
            field="liters"
            :header="t('operations.liters')"
          /><Column
            field="totalCost"
            :header="t('operations.totalCost')"
            ><template #body="{ data }"
              >S/ {{ Number(data.totalCost).toFixed(2) }}</template
            ></Column
          ><Column
            field="fueledAt"
            :header="t('common.date')"
            ><template #body="{ data }">{{
              new Date(data.fueledAt).toLocaleString()
            }}</template></Column
          ></DataTable
        ></template
      ></Card
    ><Dialog
      v-model:visible="dialog"
      modal
      :header="t('operations.newFuel')"
      :style="{ width: 'min(680px,95vw)' }"
      ><FuelForm
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
import FuelForm from '../components/FuelForm.vue'
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
  store.fuelRecords.map((x) => ({
    ...x,
    vehicleLabel: vehicleOptions.value.find((v) => v.id === x.vehicleId)?.display || x.vehicleId
  }))
)
const totalLiters = computed(() => store.fuelRecords.reduce((a, x) => a + Number(x.liters || 0), 0))
const totalCost = computed(() =>
  store.fuelRecords.reduce((a, x) => a + Number(x.totalCost || 0), 0)
)
async function save(x) {
  await store.addFuel(x)
  dialog.value = false
}
</script>
