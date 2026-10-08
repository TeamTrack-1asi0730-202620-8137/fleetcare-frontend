export class FuelRecord {
  constructor(resource = {}) {
    this.id = resource.id ?? null
    this.vehicleId = resource.vehicleId ?? null
    this.registeredByUserId = resource.registeredByUserId ?? null
    this.mileage = resource.mileage ?? null
    this.liters = resource.liters ?? null
    this.totalCost = resource.totalCost ?? null
    this.fueledAt = resource.fueledAt ?? null
    this.createdAt = resource.createdAt ?? null
  }
}
