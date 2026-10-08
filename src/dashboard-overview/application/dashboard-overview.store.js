import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DashboardOverviewApi } from '../infrastructure/dashboard-overview-api.js'
const api = new DashboardOverviewApi()
export const useDashboardOverviewStore = defineStore('dashboard-overview', () => {
  const summary = ref({
    vehicles: 0,
    openIncidents: 0,
    upcomingMaintenance: 0,
    recentInspections: 0
  })
  const loading = ref(false)
  async function load(fleetId) {
    loading.value = true
    try {
      const [v, i, n, p] = await Promise.all([
        api.getVehicles(fleetId ? { fleetId } : {}),
        api.getInspections(),
        api.getIncidents(),
        api.getPlans()
      ])
      summary.value = {
        vehicles: v.data.length,
        openIncidents: n.data.filter((x) => x.status !== 'resolved').length,
        upcomingMaintenance: p.data.filter((x) => x.status === 'upcoming' || x.status === 'overdue')
          .length,
        recentInspections: i.data.filter(
          (x) => Date.now() - new Date(x.inspectionDate).getTime() < 7 * 86400000
        ).length
      }
    } finally {
      loading.value = false
    }
  }
  return { summary, loading, load }
})
