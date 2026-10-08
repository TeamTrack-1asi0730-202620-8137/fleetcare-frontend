import { BaseApi } from '@/shared/infrastructure/base-api.js'
import { BaseEndpoint } from '@/shared/infrastructure/base-endpoint.js'
export class DashboardOverviewApi extends BaseApi {
  constructor() {
    super()
    this.vehicles = new BaseEndpoint(this, '/vehicles')
    this.inspections = new BaseEndpoint(this, '/inspections')
    this.incidents = new BaseEndpoint(this, '/incidents')
    this.plans = new BaseEndpoint(this, '/maintenancePlans')
  }
  getVehicles(p = {}) {
    return this.vehicles.getAll(p)
  }
  getInspections(p = {}) {
    return this.inspections.getAll(p)
  }
  getIncidents(p = {}) {
    return this.incidents.getAll(p)
  }
  getPlans(p = {}) {
    return this.plans.getAll(p)
  }
}
