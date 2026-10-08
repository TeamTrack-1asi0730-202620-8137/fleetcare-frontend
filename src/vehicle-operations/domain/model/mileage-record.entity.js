export class MileageRecord {
  constructor(resource = {}) {
    this.id = resource.id ?? null
    this.vehicleId = resource.vehicleId ?? null
    this.registeredByUserId = resource.registeredByUserId ?? null
    this.mileage = resource.mileage ?? null
    this.recordedAt = resource.recordedAt ?? null
    this.createdAt = resource.createdAt ?? null
  }
}
