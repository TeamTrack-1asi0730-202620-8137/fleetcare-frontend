<template>
  <section>
    <div class="page-header">
      <div>
        <h1>{{ t('fleet.detail') }}</h1>
        <p v-if="vehicle">{{ vehicle.plateNumber }} · {{ vehicle.brand }} {{ vehicle.model }}</p>
      </div>
      <Button
        icon="pi pi-arrow-left"
        :label="t('fleet.title')"
        severity="secondary"
        @click="router.push('/vehicles')"
      />
    </div>
    <Card v-if="vehicle"
      ><template #content
        ><div class="detail-grid">
          <div>
            <span>{{ t('fleet.plate') }}</span
            ><strong>{{ vehicle.plateNumber }}</strong>
          </div>
          <div>
            <span>{{ t('fleet.brand') }}</span
            ><strong>{{ vehicle.brand }}</strong>
          </div>
          <div>
            <span>{{ t('fleet.model') }}</span
            ><strong>{{ vehicle.model }}</strong>
          </div>
          <div>
            <span>{{ t('fleet.year') }}</span
            ><strong>{{ vehicle.year }}</strong>
          </div>
          <div>
            <span>{{ t('fleet.vin') }}</span
            ><strong>{{ vehicle.vin || '—' }}</strong>
          </div>
          <div>
            <span>{{ t('common.status') }}</span
            ><StatusTag :status="vehicle.status" />
          </div></div></template
    ></Card>
  </section>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Card from 'primevue/card'
import Button from 'primevue/button'
import StatusTag from '@/shared/presentation/components/StatusTag.vue'
import { useFleetManagementStore } from '../../application/fleet-management.store.js'
const { t } = useI18n({ useScope: 'global' })
const route = useRoute()
const router = useRouter()
const store = useFleetManagementStore()
const vehicle = ref(null)
onMounted(async () => (vehicle.value = await store.getVehicleById(route.params.id)))
</script>
