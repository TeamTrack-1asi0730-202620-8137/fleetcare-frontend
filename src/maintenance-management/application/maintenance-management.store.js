import { defineStore } from 'pinia'
import { ref } from 'vue'
import { MaintenanceManagementApi } from '../infrastructure/maintenance-management-api.js'
import { MaintenancePlanAssembler } from '../infrastructure/maintenance-plan.assembler.js'
import { MaintenanceRecordAssembler } from '../infrastructure/maintenance-record.assembler.js'
import { MaintenancePartAssembler } from '../infrastructure/maintenance-part.assembler.js'
const api = new MaintenanceManagementApi()
export const useMaintenanceManagementStore = defineStore('maintenance-management', () => {
  const plans = ref([]),
    records = ref([]),
    loading = ref(false)
  async function fetchAll() {
    loading.value = true
    try {
      const [p, r, parts] = await Promise.all([api.getPlans(), api.getRecords(), api.getParts()])
      plans.value = MaintenancePlanAssembler.toEntities(p)
      records.value = MaintenanceRecordAssembler.toEntities(
        r,
        MaintenancePartAssembler.toEntities(parts)
      ).sort((a, b) => String(b.performedDate).localeCompare(String(a.performedDate)))
    } finally {
      loading.value = false
    }
  }
  async function getRecord(id) {
    const local = records.value.find((x) => String(x.id) === String(id))
    if (local) return local
    try {
      const [r, parts] = await Promise.all([
        api.getRecord(id),
        api.getParts({ maintenanceRecordId: id })
      ])
      return MaintenanceRecordAssembler.toEntity(r.data, MaintenancePartAssembler.toEntities(parts))
    } catch (e) {
      if (e.response?.status === 404) return null
      throw e
    }
  }
  async function getPlan(id) {
    if (!id) return null
    const local = plans.value.find((x) => String(x.id) === String(id))
    if (local) return local
    try {
      return MaintenancePlanAssembler.toEntity((await api.getPlan(id)).data)
    } catch (e) {
      if (e.response?.status === 404) return null
      throw e
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
    const created = (await api.createRecord({ ...r, createdAt: new Date().toISOString() })).data
    const savedParts = []
    for (const p of parts) {
      savedParts.push(
        MaintenancePartAssembler.toEntity(
          (await api.createPart({ ...p, maintenanceRecordId: created.id })).data
        )
      )
    }
    const e = MaintenanceRecordAssembler.toEntity(created, savedParts)
    records.value.unshift(e)
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
  return { plans, records, loading, fetchAll, getRecord, getPlan, savePlan, addRecord }
})
