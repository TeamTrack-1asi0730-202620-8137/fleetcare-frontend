import { Incident } from '../domain/model/incident.entity.js'
export class IncidentAssembler {
  static toEntity(r) {
    return new Incident(r)
  }
  static toEntities(res) {
    return res.data.map((r) => this.toEntity(r))
  }
}
