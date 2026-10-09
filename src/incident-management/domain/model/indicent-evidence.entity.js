export class IncidentEvidence {
  constructor(resource = {}) {
    this.id = resource.id ?? null
    this.incidentId = resource.incidentId ?? null
    this.fileUrl = resource.fileUrl ?? null
    this.description = resource.description ?? null
    this.createdAt = resource.createdAt ?? null
  }
}
