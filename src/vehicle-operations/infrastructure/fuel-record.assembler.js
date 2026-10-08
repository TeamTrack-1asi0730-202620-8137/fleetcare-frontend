import { FuelRecord } from '../domain/model/fuel-record.entity.js'
export class FuelRecordAssembler {
  static toEntity(r) {
    return new FuelRecord(r)
  }
  static toEntities(res) {
    return res.data.map((r) => this.toEntity(r))
  }
}
