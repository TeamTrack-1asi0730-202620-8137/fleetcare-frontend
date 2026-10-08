<template>
  <section>
    <div class="page-header">
      <div>
        <h1>{{ t('master.title') }}</h1>
        <p>{{ t('master.subtitle') }}</p>
      </div>
    </div>
    <!--
    <Message
      severity="info"
      :closable="false"
      >{{ t('master.modelNotice') }}</Message>
    -->
    <Tabs value="0"
      ><TabList
        ><Tab value="0">{{ t('master.drivers') }}</Tab
        ><Tab value="1">{{ t('master.workshops') }}</Tab
        ><Tab value="2">{{ t('master.vehicleTypes') }}</Tab
        ><Tab value="3">{{ t('master.incidentTypes') }}</Tab></TabList
      ><TabPanels
        ><TabPanel value="0"
          ><DataTable :value="drivers"
            ><Column
              field="firstName"
              :header="t('auth.firstName')" /><Column
              field="lastName"
              :header="t('auth.lastName')" /><Column
              field="email"
              :header="t('auth.email')" /></DataTable></TabPanel
        ><TabPanel value="1"><PrototypeTable :rows="workshops" /></TabPanel
        ><TabPanel value="2"><PrototypeTable :rows="vehicleTypes" /></TabPanel
        ><TabPanel value="3"><PrototypeTable :rows="incidentTypes" /></TabPanel></TabPanels
    ></Tabs>
  </section>
</template>
<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Message from 'primevue/message'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import PrototypeTable from '../components/PrototypeTable.vue'
import { useUserAccessStore } from '@/user-access/application/user-access.store.js'
const { t } = useI18n({ useScope: 'global' }),
  users = useUserAccessStore()
onMounted(() => users.fetchUsers())
const drivers = computed(() => users.users.filter((u) => u.roleId === 2))
const workshops = [
  { name: 'Taller Central Lima', detail: 'Referencia del prototipo' },
  { name: 'Servicio Norte', detail: 'Referencia del prototipo' }
]
const vehicleTypes = [
  { name: 'Carga ligera', detail: 'Referencia del prototipo' },
  { name: 'Van', detail: 'Referencia del prototipo' }
]
const incidentTypes = [
  { name: 'Falla mecánica', detail: 'Referencia del prototipo' },
  { name: 'Neumáticos', detail: 'Referencia del prototipo' }
]
</script>
