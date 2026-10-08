import { defineStore } from 'pinia'
import { ref } from 'vue'
import { VehicleOperationsApi } from '../infrastructure/vehicle-operations-api.js'
import { MileageRecordAssembler } from '../infrastructure/mileage-record.assembler.js'
import { FuelRecordAssembler } from '../infrastructure/fuel-record.assembler.js'
const api = new VehicleOperationsApi()
export const useVehicleOperationsStore = defineStore('vehicle-operations', () => {
  const mileageRecords = ref([]),
    fuelRecords = ref([]),
    loading = ref(false)
  async function fetchAll() {
    loading.value = true
    try {
      mileageRecords.value = MileageRecordAssembler.toEntities(await api.getMileage())
      fuelRecords.value = FuelRecordAssembler.toEntities(await api.getFuel())
    } finally {
      loading.value = false
    }
  }
  async function addMileage(r) {
    const now = new Date().toISOString()
    const e = MileageRecordAssembler.toEntity(
      (await api.createMileage({ ...r, recordedAt: r.recordedAt || now, createdAt: now })).data
    )
    mileageRecords.value.unshift(e)
    return e
  }
  async function addFuel(r) {
    const now = new Date().toISOString()
    const e = FuelRecordAssembler.toEntity(
      (await api.createFuel({ ...r, fueledAt: r.fueledAt || now, createdAt: now })).data
    )
    fuelRecords.value.unshift(e)
    return e
  }
  return { mileageRecords, fuelRecords, loading, fetchAll, addMileage, addFuel }
})
