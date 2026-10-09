import { MaintenancePart } from '../domain/model/maintenance-part.entity.js'
export class MaintenancePartAssembler {
  static toEntity(r) {
    return new MaintenancePart(r)
  }
  static toEntities(res) {
    return res.data.map((r) => this.toEntity(r))
  }
}
