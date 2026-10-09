export class MaintenancePart {
  constructor(resource = {}) {
    this.id = resource.id ?? null
    this.maintenanceRecordId = resource.maintenanceRecordId ?? null
    this.name = resource.name ?? null
    this.quantity = resource.quantity ?? null
    this.unitCost = resource.unitCost ?? null
  }
  get subtotal() {
    return Number(this.quantity || 0) * Number(this.unitCost || 0)
  }
  static isValid(resource) {
    return (
      Boolean(resource.name?.trim()) &&
      Number.isInteger(resource.quantity) &&
      resource.quantity > 0 &&
      Number(resource.unitCost) >= 0
    )
  }
}
