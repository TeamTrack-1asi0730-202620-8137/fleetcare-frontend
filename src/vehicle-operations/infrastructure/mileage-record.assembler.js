import { MileageRecord } from '../domain/model/mileage-record.entity.js'
export class MileageRecordAssembler {
  static toEntity(r) {
    return new MileageRecord(r)
  }
  static toEntities(res) {
    return res.data.map((r) => this.toEntity(r))
  }
}
