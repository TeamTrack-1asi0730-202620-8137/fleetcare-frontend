import { defineStore } from 'pinia'
import { ref } from 'vue'
import { IncidentManagementApi } from '../infrastructure/incident-management-api.js'
import { IncidentAssembler } from '../infrastructure/incident.assembler.js'
import {IncidentEvidenceAssembler} from '../infrastructure/incident-evidence.assembler.js'

const api = new IncidentManagementApi()
export const useIncidentManagementStore = defineStore('incident-management', () => {
  const incidents = ref([]),
    loading = ref(false),
    evidences = ref([])
  async function fetchIncidents() {
    loading.value = true
    try {
      incidents.value = IncidentAssembler.toEntities(await api.getIncidents())
    } finally {
      loading.value = false
    }
  }
  async function getIncident(id) {
    const x = incidents.value.find((i) => String(i.id) === String(id))
    return x || IncidentAssembler.toEntity((await api.getIncident(id)).data)
  }
  async function saveIncident(r) {
    const now = new Date().toISOString()
    if (r.id) {
      const e = IncidentAssembler.toEntity(
        (await api.updateIncident({ ...r, updatedAt: now })).data
      )
      const i = incidents.value.findIndex((x) => String(x.id) === String(e.id))
      if (i >= 0) incidents.value[i] = e
      return e
    }
    const e = IncidentAssembler.toEntity(
      (
        await api.createIncident({
          ...r,
          status: r.status || 'reported',
          reportedAt: r.reportedAt || now,
          createdAt: now,
          updatedAt: now
        })
      ).data
    )
    incidents.value.unshift(e)
    return e
  }
  async function resolveIncident(id, resolution) {
    const e = IncidentAssembler.toEntity(
      (
        await api.patchIncident(id, {
          status: 'resolved',
          resolution,
          resolvedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
      ).data
    )
    const i = incidents.value.findIndex((x) => String(x.id) === String(id))
    if (i >= 0) incidents.value[i] = e
    return e
  }
  async function fetchEvidences(incidentId) {
    evidences.value = IncidentEvidenceAssembler.toEntities(await api.getEvidences({ incidentId }))
  }
  async function addEvidence(r) {
    const e = IncidentEvidenceAssembler.toEntity((
      (await api.createEvidence({...r, createdAt: new Date().toISOString()})).data
    ))
    evidences.value.push(e)
    return e
  }
  return { incidents, loading, evidences, fetchIncidents, getIncident, saveIncident, resolveIncident, fetchEvidences, addEvidence }
})
