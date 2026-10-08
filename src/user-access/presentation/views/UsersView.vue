<template>
  <section>
    <div class="page-header">
      <div>
        <h1>{{ t('auth.users') }}</h1>
        <p>{{ t('app.tagline') }}</p>
      </div>
      <Button
        :label="t('auth.addDriver')"
        icon="pi pi-user-plus"
        @click="dialog = true"
      />
    </div>
    <Card
      ><template #content
        ><DataTable
          :value="store.users"
          :loading="store.loading"
          ><Column
            field="firstName"
            :header="t('auth.firstName')" /><Column
            field="lastName"
            :header="t('auth.lastName')" /><Column
            field="email"
            :header="t('auth.email')" /><Column :header="t('common.status')"
            ><template #body="{ data }"
              ><Tag
                :value="data.isActive ? t('auth.active') : '—'"
                :severity="
                  data.isActive ? 'success' : 'secondary'
                " /></template></Column></DataTable></template></Card
    ><Dialog
      v-model:visible="dialog"
      modal
      :header="t('auth.addDriver')"
      :style="{ width: 'min(620px,95vw)' }"
      ><DriverForm
        @save="save"
        @cancel="dialog = false"
    /></Dialog>
  </section>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Dialog from 'primevue/dialog'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import DriverForm from '../components/DriverForm.vue'
import { useUserAccessStore } from '../../application/user-access.store.js'
const { t } = useI18n({ useScope: 'global' }),
  store = useUserAccessStore(),
  dialog = ref(false)
onMounted(() => store.fetchUsers())
async function save(x) {
  await store.addDriver(x)
  dialog.value = false
}
</script>
