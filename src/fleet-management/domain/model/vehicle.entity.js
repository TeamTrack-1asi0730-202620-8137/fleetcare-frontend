export class Vehicle {
  constructor(resource = {}) {
    this.id = resource.id ?? null
    this.fleetId = resource.fleetId ?? null
    this.plateNumber = resource.plateNumber ?? null
    this.brand = resource.brand ?? null
    this.model = resource.model ?? null
    this.year = resource.year ?? null
    this.vin = resource.vin ?? null
    this.status = resource.status ?? null
    this.createdAt = resource.createdAt ?? null
    this.updatedAt = resource.updatedAt ?? null
  }
}
