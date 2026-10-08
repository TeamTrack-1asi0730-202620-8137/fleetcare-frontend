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
}
