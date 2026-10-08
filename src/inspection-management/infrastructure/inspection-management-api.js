import { BaseApi } from '@/shared/infrastructure/base-api.js'
import { BaseEndpoint } from '@/shared/infrastructure/base-endpoint.js'
export class InspectionManagementApi extends BaseApi {
  #inspections
  #checklists
  #items
  #results
  constructor() {
    super()
    this.#inspections = new BaseEndpoint(this, '/inspections')
    this.#checklists = new BaseEndpoint(this, '/checklists')
    this.#items = new BaseEndpoint(this, '/checklistItems')
    this.#results = new BaseEndpoint(this, '/inspectionResults')
  }
  getInspections(params = {}) {
    return this.#inspections.getAll(params)
  }
  getInspection(id) {
    return this.#inspections.getById(id)
  }
  createInspection(r) {
    return this.#inspections.create(r)
  }
  updateInspection(r) {
    return this.#inspections.update(r.id, r)
  }
  patchInspection(id, r) {
    return this.#inspections.patch(id, r)
  }
  getChecklists(p = {}) {
    return this.#checklists.getAll(p)
  }
  getChecklistItems(p = {}) {
    return this.#items.getAll(p)
  }
  getResults(p = {}) {
    return this.#results.getAll(p)
  }
  createResult(r) {
    return this.#results.create(r)
  }
}
