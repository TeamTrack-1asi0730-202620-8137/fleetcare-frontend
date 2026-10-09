import { Inspection } from '../domain/model/inspection.entity.js'

export class InspectionAssembler {
  static toEntity(r) {
    return new Inspection(r)
  }

  static toEntities(res) {
    if (!res?.data || !Array.isArray(res.data)) return []
    return res.data.map((r) => this.toEntity(r))
  }
}
