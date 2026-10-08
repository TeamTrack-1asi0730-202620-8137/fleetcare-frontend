<template>
  <section>
    <div class="page-header">
      <div>
        <h1>{{ t('dashboard.title') }}</h1>
        <p>{{ t('dashboard.subtitle') }}</p>
      </div>
    </div>
    <div class="stats-grid">
      <SummaryCard
        :label="t('dashboard.vehicles')"
        :value="store.summary.vehicles"
        icon="pi pi-car"
      /><SummaryCard
        :label="t('dashboard.openIncidents')"
        :value="store.summary.openIncidents"
        icon="pi pi-exclamation-triangle"
      /><SummaryCard
        :label="t('dashboard.upcomingMaintenance')"
        :value="store.summary.upcomingMaintenance"
        icon="pi pi-wrench"
      /><SummaryCard
        :label="t('dashboard.todayInspections')"
        :value="store.summary.recentInspections"
        icon="pi pi-clipboard"
      />
    </div>
    <Card
      ><template #content
        ><div class="dashboard-callout">
          <i class="pi pi-map-marker"></i>
          <div>
            <strong>Lima Metropolitana</strong>
            <p>Datos de prueba contextualizados en una flota pequeña de distribución urbana.</p>
          </div>
        </div></template
      ></Card
    >
  </section>
</template>
<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import Card from 'primevue/card'
import SummaryCard from '../components/SummaryCard.vue'
import { useDashboardOverviewStore } from '../../application/dashboard-overview.store.js'
import { useUserAccessStore } from '@/user-access/application/user-access.store.js'
const { t } = useI18n({ useScope: 'global' }),
  store = useDashboardOverviewStore(),
  auth = useUserAccessStore()
onMounted(() => store.load(auth.user?.fleetId))
</script>
