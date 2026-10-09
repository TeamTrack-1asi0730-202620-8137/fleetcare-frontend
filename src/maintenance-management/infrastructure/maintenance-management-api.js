import { BaseApi } from '@/shared/infrastructure/base-api.js'
import { BaseEndpoint } from '@/shared/infrastructure/base-endpoint.js'
export class MaintenanceManagementApi extends BaseApi {
  #plans
  #records
  #parts
  constructor() {
    super()
    this.#plans = new BaseEndpoint(this, '/maintenancePlans')
    this.#records = new BaseEndpoint(this, '/maintenanceRecords')
    this.#parts = new BaseEndpoint(this, '/maintenanceParts')
  }
  getPlans(p = {}) {
    return this.#plans.getAll(p)
  }
  getPlan(id) {
    return this.#plans.getById(id)
  }
  createPlan(r) {
    return this.#plans.create(r)
  }
  updatePlan(r) {
    return this.#plans.update(r.id, r)
  }
  patchPlan(id, r) {
    return this.#plans.patch(id, r)
  }
  getRecords(p = {}) {
    return this.#records.getAll(p)
  }
  getRecord(id) {
    return this.#records.getById(id)
  }
  createRecord(r) {
    return this.#records.create(r)
  }
  getParts(p = {}) {
    return this.#parts.getAll(p)
  }
  createPart(r) {
    return this.#parts.create(r)
  }
}
