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
  }
}
