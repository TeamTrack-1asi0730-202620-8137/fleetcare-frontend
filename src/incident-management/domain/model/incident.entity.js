export class Incident {
  constructor(resource = {}) {
    this.id = resource.id ?? null
    this.vehicleId = resource.vehicleId ?? null
    this.reportedByUserId = resource.reportedByUserId ?? null
    this.sourceInspectionId = resource.sourceInspectionId ?? null
    this.title = resource.title ?? null
    this.description = resource.description ?? null
    this.status = resource.status ?? null
    this.latitude = resource.latitude ?? null
    this.longitude = resource.longitude ?? null
    this.address = resource.address ?? null
    this.reportedAt = resource.reportedAt ?? null
    this.resolvedAt = resource.resolvedAt ?? null
    this.resolution = resource.resolution ?? null
    this.createdAt = resource.createdAt ?? null
    this.updatedAt = resource.updatedAt ?? null
  }
}
