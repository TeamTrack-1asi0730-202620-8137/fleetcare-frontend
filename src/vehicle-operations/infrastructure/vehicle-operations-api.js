import { BaseApi } from '@/shared/infrastructure/base-api.js'
import { BaseEndpoint } from '@/shared/infrastructure/base-endpoint.js'
export class VehicleOperationsApi extends BaseApi {
  #mileage
  #fuel
  constructor() {
    super()
    this.#mileage = new BaseEndpoint(this, '/mileageRecords')
    this.#fuel = new BaseEndpoint(this, '/fuelRecords')
  }
  getMileage(p = {}) {
    return this.#mileage.getAll(p)
  }
  createMileage(r) {
    return this.#mileage.create(r)
  }
  getFuel(p = {}) {
    return this.#fuel.getAll(p)
  }
  createFuel(r) {
    return this.#fuel.create(r)
  }
}
