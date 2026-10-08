import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { FleetManagementApi } from '../infrastructure/fleet-management-api.js'
import { VehicleAssembler } from '../infrastructure/vehicle.assembler.js'
const api = new FleetManagementApi()
export const useFleetManagementStore = defineStore('fleet-management', () => {
  const vehicles = ref([])
  const loading = ref(false)
  const error = ref(null)
  const count = computed(() => vehicles.value.length)
  async function fetchVehicles(fleetId) {
    loading.value = true
    error.value = null
    try {
      vehicles.value = VehicleAssembler.toEntities(
        await api.getVehicles(fleetId ? { fleetId } : {})
      )
    } catch (e) {
      error.value = e
      throw e
    } finally {
      loading.value = false
    }
  }
  async function getVehicleById(id) {
    const local = vehicles.value.find((v) => String(v.id) === String(id))
    if (local) return local
    return VehicleAssembler.toEntity((await api.getVehicleById(id)).data)
  }
  async function saveVehicle(resource) {
    const now = new Date().toISOString()
    if (resource.id) {
      const entity = VehicleAssembler.toEntity(
        (await api.updateVehicle({ ...resource, updatedAt: now })).data
      )
      const i = vehicles.value.findIndex((v) => String(v.id) === String(entity.id))
      if (i >= 0) vehicles.value[i] = entity
      return entity
    }
    const entity = VehicleAssembler.toEntity(
      (await api.createVehicle({ ...resource, createdAt: now, updatedAt: now })).data
    )
    vehicles.value.push(entity)
    return entity
  }
  async function updateStatus(id, status) {
    const entity = VehicleAssembler.toEntity(
      (await api.patchVehicle(id, { status, updatedAt: new Date().toISOString() })).data
    )
    const i = vehicles.value.findIndex((v) => String(v.id) === String(id))
    if (i >= 0) vehicles.value[i] = entity
    return entity
  }
  return {
    vehicles,
    loading,
    error,
    count,
    fetchVehicles,
    getVehicleById,
    saveVehicle,
    updateStatus
  }
})
