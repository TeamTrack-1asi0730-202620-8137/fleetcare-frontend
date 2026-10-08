import { MaintenancePlan } from '../domain/model/maintenance-plan.entity.js'
export class MaintenancePlanAssembler {
  static toEntity(r) {
    return new MaintenancePlan(r)
  }
  static toEntities(res) {
    return res.data.map((r) => this.toEntity(r))
  }
}
