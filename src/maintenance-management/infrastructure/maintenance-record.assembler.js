import { MaintenanceRecord } from '../domain/model/maintenance-record.entity.js'
export class MaintenanceRecordAssembler {
  static toEntity(r, parts = []) {
    return new MaintenanceRecord({
      ...r,
      parts: parts.filter((p) => String(p.maintenanceRecordId) === String(r.id))
    })
  }
  static toEntities(res, parts = []) {
    return res.data.map((r) => this.toEntity(r, parts))
  }
}
