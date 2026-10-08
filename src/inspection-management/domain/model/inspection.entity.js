export class Inspection {
  constructor(resource = {}) {
    this.id = resource.id ?? null
    this.vehicleId = resource.vehicleId ?? null
    this.checklistId = resource.checklistId ?? null
    this.driverId = resource.driverId ?? null
    this.inspectionDate = resource.inspectionDate ?? null
    this.status = resource.status ?? null
    this.observation = resource.observation ?? null
    this.createdAt = resource.createdAt ?? null
    this.completedAt = resource.completedAt ?? null
  }
}
