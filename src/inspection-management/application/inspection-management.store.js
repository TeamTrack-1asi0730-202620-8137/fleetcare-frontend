import { defineStore } from 'pinia'
import { ref } from 'vue'
import { InspectionManagementApi } from '../infrastructure/inspection-management-api.js'
import { InspectionAssembler } from '../infrastructure/inspection.assembler.js'
const api = new InspectionManagementApi()
export const useInspectionManagementStore = defineStore('inspection-management', () => {
  const inspections = ref([]),
    checklists = ref([]),
    checklistItems = ref([]),
    loading = ref(false)
  async function fetchInspections() {
    loading.value = true
    try {
      inspections.value = InspectionAssembler.toEntities(await api.getInspections())
    } finally {
      loading.value = false
    }
  }
  async function fetchReference() {
    checklists.value = (await api.getChecklists({ isActive: true })).data
    checklistItems.value = (await api.getChecklistItems()).data
  }
  async function getInspection(id) {
    const local = inspections.value.find((x) => String(x.id) === String(id))
    return local || InspectionAssembler.toEntity((await api.getInspection(id)).data)
  }
  async function createInspection(payload, results = []) {
    const now = new Date().toISOString()
    const entity = InspectionAssembler.toEntity(
      (
        await api.createInspection({
          ...payload,
          createdAt: now,
          completedAt: payload.status === 'pending' ? null : now
        })
      ).data
    )
    inspections.value.unshift(entity)
    for (const result of results) {
      await api.createResult({ ...result, inspectionId: entity.id })
    }
    return entity
  }
  async function completeInspection(id, status, observation) {
    const entity = InspectionAssembler.toEntity(
      (
        await api.patchInspection(id, {
          status,
          observation,
          completedAt: new Date().toISOString()
        })
      ).data
    )
    const i = inspections.value.findIndex((x) => String(x.id) === String(id))
    if (i >= 0) inspections.value[i] = entity
    return entity
  }
  async function getResults(inspectionId) {
    return (await api.getResults({ inspectionId })).data
  }
  return {
    inspections,
    checklists,
    checklistItems,
    loading,
    fetchInspections,
    fetchReference,
    getInspection,
    createInspection,
    completeInspection,
    getResults
  }
})
