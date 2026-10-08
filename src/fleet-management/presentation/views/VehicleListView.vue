<template>
  <section>
    <div class="page-header">
      <div>
        <h1>{{ t('fleet.title') }}</h1>
        <p>{{ t('fleet.subtitle') }}</p>
      </div>
      <Button
        :label="t('fleet.new')"
        icon="pi pi-plus"
        @click="openCreate"
      />
    </div>
    <Card
      ><template #content
        ><div class="toolbar-row">
          <IconField
            ><InputIcon class="pi pi-search" /><InputText
              v-model="search"
              :placeholder="t('common.search')" /></IconField
          ><Select
            v-model="status"
            :options="statusOptions"
            option-label="label"
            option-value="value"
            class="filter-select"
          />
        </div>
        <VehicleTable
          :vehicles="filtered"
          :loading="store.loading"
          @details="goDetails"
          @edit="openEdit" /></template></Card
    ><Dialog
      v-model:visible="dialog"
      modal
      :header="selected?.id ? t('common.edit') : t('fleet.new')"
      :style="{ width: 'min(680px,95vw)' }"
      ><VehicleForm
        :vehicle="selected"
        :fleet-id="auth.user?.fleetId"
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
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Select from 'primevue/select'
import VehicleTable from '../components/VehicleTable.vue'
import VehicleForm from '../components/VehicleForm.vue'
import { useFleetManagementStore } from '../../application/fleet-management.store.js'
import { useUserAccessStore } from '@/user-access/application/user-access.store.js'
const { t } = useI18n({ useScope: 'global' })
const router = useRouter()
const store = useFleetManagementStore()
const auth = useUserAccessStore()
const dialog = ref(false)
const selected = ref(null)
const search = ref('')
const status = ref('all')
const statusOptions = computed(() => [
  { label: t('common.all'), value: 'all' },
  { label: t('fleet.available'), value: 'available' },
  { label: t('fleet.requiresAttention'), value: 'requires_attention' },
  { label: t('fleet.outOfService'), value: 'out_of_service' }
])
const filtered = computed(() =>
  store.vehicles.filter((v) => {
    const q = search.value.toLowerCase()
    const text = `${v.plateNumber} ${v.brand} ${v.model}`.toLowerCase()
    return (!q || text.includes(q)) && (status.value === 'all' || v.status === status.value)
  })
)
onMounted(() => store.fetchVehicles(auth.user?.fleetId))
function openCreate() {
  selected.value = null
  dialog.value = true
}
function openEdit(v) {
  selected.value = { ...v }
  dialog.value = true
}
async function save(v) {
  await store.saveVehicle(v)
  dialog.value = false
}
function goDetails(v) {
  router.push(`/vehicles/${v.id}`)
}
</script>
