import { BaseApi } from '@/shared/infrastructure/base-api.js'
import { BaseEndpoint } from '@/shared/infrastructure/base-endpoint.js'
export class IncidentManagementApi extends BaseApi {
  #incidents
  constructor() {
    super()
    this.#incidents = new BaseEndpoint(this, '/incidents')
  }
  getIncidents(p = {}) {
    return this.#incidents.getAll(p)
  }
  getIncident(id) {
    return this.#incidents.getById(id)
  }
  createIncident(r) {
    return this.#incidents.create(r)
  }
  updateIncident(r) {
    return this.#incidents.update(r.id, r)
  }
  patchIncident(id, r) {
    return this.#incidents.patch(id, r)
  }
}
