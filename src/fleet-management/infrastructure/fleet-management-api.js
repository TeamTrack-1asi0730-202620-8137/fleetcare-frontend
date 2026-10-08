import { BaseApi } from '@/shared/infrastructure/base-api.js'
import { BaseEndpoint } from '@/shared/infrastructure/base-endpoint.js'
export class FleetManagementApi extends BaseApi {
  #vehicles
  constructor() {
    super()
    this.#vehicles = new BaseEndpoint(this, '/vehicles')
  }
  getVehicles(params = {}) {
    return this.#vehicles.getAll(params)
  }
  getVehicleById(id) {
    return this.#vehicles.getById(id)
  }
  createVehicle(resource) {
    return this.#vehicles.create(resource)
  }
  updateVehicle(resource) {
    return this.#vehicles.update(resource.id, resource)
  }
  patchVehicle(id, resource) {
    return this.#vehicles.patch(id, resource)
  }
}
