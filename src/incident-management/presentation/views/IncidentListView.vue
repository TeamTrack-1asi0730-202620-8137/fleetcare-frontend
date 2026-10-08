<template>
  <section>
    <div class="page-header">
      <div>
        <h1>{{ t('incident.title') }}</h1>
        <p>{{ t('incident.subtitle') }}</p>
      </div>
      <Button
        :label="t('incident.new')"
        icon="pi pi-plus"
        @click="open(null)"
      />
    </div>
    <Card
      ><template #content
        ><IncidentTable
          :rows="rows"
          :loading="store.loading"
          @details="(x) => router.push(`/incidents/${x.id}`)"
          @edit="open" /></template></Card
    ><Dialog
      v-model:visible="dialog"
      modal
      :header="selected?.id ? t('common.edit') : t('incident.new')"
      :style="{ width: 'min(720px,96vw)' }"
      ><IncidentForm
        :incident="selected"
        :vehicles="vehicleOptions"
        :drivers="driverOptions"
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
import IncidentTable from '../components/IncidentTable.vue'
import IncidentForm from '../components/IncidentForm.vue'
import { useIncidentManagementStore } from '../../application/incident-management.store.js'
import { useFleetManagementStore } from '@/fleet-management/application/fleet-management.store.js'
import { useUserAccessStore } from '@/user-access/application/user-access.store.js'
const { t } = useI18n({ useScope: 'global' }),
  router = useRouter(),
  store = useIncidentManagementStore(),
  fleet = useFleetManagementStore(),
  users = useUserAccessStore(),
  dialog = ref(false),
  selected = ref(null)
onMounted(async () =>
  Promise.all([
    store.fetchIncidents(),
    fleet.fetchVehicles(users.user?.fleetId),
    users.fetchUsers()
  ])
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
  store.incidents.map((x) => ({
    ...x,
    vehicleLabel: vehicleOptions.value.find((v) => v.id === x.vehicleId)?.display || x.vehicleId
  }))
)
function open(x) {
  selected.value = x ? { ...x } : null
  dialog.value = true
}
async function save(x) {
  await store.saveIncident(x)
  dialog.value = false
}
</script>
