import { MAX_MILEAGE } from './maintenance-plan.entity.js'
import { MaintenancePart } from './maintenance-part.entity.js'
import { todayIsoDate } from './maintenance-date.js'
export class MaintenanceRecord {
  constructor(resource = {}) {
    this.id = resource.id ?? null
    this.maintenancePlanId = resource.maintenancePlanId ?? null
    this.vehicleId = resource.vehicleId ?? null
    this.maintenanceType = resource.maintenanceType ?? null
    this.performedDate = resource.performedDate ?? null
    this.mileage = resource.mileage ?? null
    this.workDescription = resource.workDescription ?? null
    this.totalCost = resource.totalCost ?? null
    this.notes = resource.notes ?? null
    this.createdAt = resource.createdAt ?? null
    this.parts = (resource.parts ?? []).map((p) =>
      p instanceof MaintenancePart ? p : new MaintenancePart(p)
    )
  }
  get partsCost() {
    return this.parts.reduce((sum, p) => sum + p.subtotal, 0)
  }
  static validate(resource, parts = [], { vehicleIds = [] } = {}) {
    const errors = []
    if (
      !resource.vehicleId ||
      !resource.maintenanceType?.trim() ||
      !resource.performedDate ||
      resource.mileage == null ||
      !resource.workDescription?.trim()
    )
      errors.push('requiredFields')
    else if (!vehicleIds.some((id) => String(id) === String(resource.vehicleId)))
      errors.push('vehicleNotInFleet')
    if (resource.performedDate && resource.performedDate > todayIsoDate()) errors.push('futureDate')
    if (resource.mileage != null && !(resource.mileage > 0 && resource.mileage <= MAX_MILEAGE))
      errors.push('invalidMileage')
    if (parts.some((p) => !MaintenancePart.isValid(p))) errors.push('invalidPart')
    const partsCost = parts.reduce(
      (s, p) => s + Number(p.quantity || 0) * Number(p.unitCost || 0),
      0
    )
    if (resource.totalCost == null || !(Number(resource.totalCost) > 0)) errors.push('invalidCost')
    else if (Number(resource.totalCost) < partsCost) errors.push('costBelowParts')
    return errors
  }
}
