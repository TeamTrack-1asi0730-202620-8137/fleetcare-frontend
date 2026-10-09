import { IncidentEvidence } from '../domain/model/indicent-evidence.entity.js'
export class IncidentEvidenceAssembler {
  static toEntity(r) {
    return new IncidentEvidence(r)
  }
  static toEntities(res) {
    return res.data.map((r) => this.toEntity(r))
  }
}
