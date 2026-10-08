import { MaintenanceRecord } from '../domain/model/maintenance-record.entity.js'
export class MaintenanceRecordAssembler {
  static toEntity(r) {
    return new MaintenanceRecord(r)
  }
  static toEntities(res) {
    return res.data.map((r) => this.toEntity(r))
  }
}
