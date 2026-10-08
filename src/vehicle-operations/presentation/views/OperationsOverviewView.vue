<template>
  <section>
    <div class="page-header">
      <div>
        <h1>{{ t('operations.title') }}</h1>
        <p>{{ t('operations.subtitle') }}</p>
      </div>
    </div>
    <div class="module-grid">
      <Card
        class="module-card"
        @click="router.push('/operations/mileage')"
        ><template #content
          ><i class="pi pi-gauge module-icon"></i>
          <h2>{{ t('operations.mileage') }}</h2>
          <p>{{ mileageCount }} registros</p></template
        ></Card
      ><Card
        class="module-card"
        @click="router.push('/operations/fuel')"
        ><template #content
          ><i class="pi pi-chart-bar module-icon"></i>
          <h2>{{ t('operations.fuel') }}</h2>
          <p>{{ fuelCount }} registros</p></template
        ></Card
      >
    </div>
  </section>
</template>
<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Card from 'primevue/card'
import { useVehicleOperationsStore } from '../../application/vehicle-operations.store.js'
const { t } = useI18n({ useScope: 'global' }),
  router = useRouter(),
  store = useVehicleOperationsStore()
onMounted(() => store.fetchAll())
const mileageCount = computed(() => store.mileageRecords.length),
  fuelCount = computed(() => store.fuelRecords.length)
</script>
