import { defineStore } from 'pinia'
import { ref } from 'vue'
import { MaintenanceManagementApi } from '../infrastructure/maintenance-management-api.js'
import { MaintenancePlanAssembler } from '../infrastructure/maintenance-plan.assembler.js'
import { MaintenanceRecordAssembler } from '../infrastructure/maintenance-record.assembler.js'
const api = new MaintenanceManagementApi()
export const useMaintenanceManagementStore = defineStore('maintenance-management', () => {
  const plans = ref([]),
    records = ref([]),
    loading = ref(false)
  async function fetchAll() {
    loading.value = true
    try {
      plans.value = MaintenancePlanAssembler.toEntities(await api.getPlans())
      records.value = MaintenanceRecordAssembler.toEntities(await api.getRecords())
    } finally {
      loading.value = false
    }
  }
  async function savePlan(r) {
    const now = new Date().toISOString()
    if (r.id) {
      const e = MaintenancePlanAssembler.toEntity(
        (await api.updatePlan({ ...r, updatedAt: now })).data
      )
      const i = plans.value.findIndex((x) => String(x.id) === String(e.id))
      if (i >= 0) plans.value[i] = e
      return e
    }
    const e = MaintenancePlanAssembler.toEntity(
      (
        await api.createPlan({
          ...r,
          status: r.status || 'upcoming',
          createdAt: now,
          updatedAt: now
        })
      ).data
    )
    plans.value.unshift(e)
    return e
  }
  async function addRecord(r, parts = []) {
    const e = MaintenanceRecordAssembler.toEntity(
      (await api.createRecord({ ...r, createdAt: new Date().toISOString() })).data
    )
    records.value.unshift(e)
    for (const p of parts) {
      await api.createPart({ ...p, maintenanceRecordId: e.id })
    }
    if (e.maintenancePlanId) {
      await api.patchPlan(e.maintenancePlanId, {
        status: 'completed',
        updatedAt: new Date().toISOString()
      })
      const i = plans.value.findIndex((x) => String(x.id) === String(e.maintenancePlanId))
      if (i >= 0) plans.value[i].status = 'completed'
    }
    return e
  }
  return { plans, records, loading, fetchAll, savePlan, addRecord }
})
