import { todayIsoDate } from './maintenance-date.js'
export const MAX_MILEAGE = 2000000
export class MaintenancePlan {
  constructor(resource = {}) {
    this.id = resource.id ?? null
    this.vehicleId = resource.vehicleId ?? null
    this.relatedIncidentId = resource.relatedIncidentId ?? null
    this.maintenanceType = resource.maintenanceType ?? null
    this.scheduledDate = resource.scheduledDate ?? null
    this.targetMileage = resource.targetMileage ?? null
    this.status = resource.status ?? null
    this.notes = resource.notes ?? null
    this.createdAt = resource.createdAt ?? null
    this.updatedAt = resource.updatedAt ?? null
  }
  isCompleted() {
    return this.status === 'completed'
  }
  isOverdueByDate(today = todayIsoDate()) {
    return Boolean(this.scheduledDate) && this.scheduledDate < today
  }
  isOverdueByMileage(currentMileage) {
    return (
      this.targetMileage != null && currentMileage != null && currentMileage >= this.targetMileage
    )
  }
  resolveStatus(currentMileage, today = todayIsoDate()) {
    if (this.isCompleted()) return 'completed'
    if (this.isOverdueByDate(today) || this.isOverdueByMileage(currentMileage)) return 'overdue'
    return 'upcoming'
  }
  static validate(resource, { vehicleIds = [], currentMileage = null } = {}) {
    const errors = []
    if (!resource.vehicleId || !resource.maintenanceType?.trim()) errors.push('requiredFields')
    else if (!vehicleIds.some((id) => String(id) === String(resource.vehicleId)))
      errors.push('vehicleNotInFleet')
    if (!resource.scheduledDate && resource.targetMileage == null) errors.push('targetRequired')
    if (!resource.id && resource.scheduledDate && resource.scheduledDate < todayIsoDate())
      errors.push('pastDate')
    if (resource.targetMileage != null) {
      const km = Number(resource.targetMileage)
      if (!Number.isFinite(km) || km <= 0 || km > MAX_MILEAGE) errors.push('invalidTargetMileage')
      else if (!resource.id && currentMileage != null && km <= currentMileage)
        errors.push('targetBelowCurrentMileage')
    }
    return errors
  }
}
