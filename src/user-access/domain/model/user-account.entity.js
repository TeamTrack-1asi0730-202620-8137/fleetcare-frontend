export class UserAccount {
  constructor(resource = {}) {
    this.id = resource.id ?? null
    this.fleetId = resource.fleetId ?? null
    this.roleId = resource.roleId ?? null
    this.firstName = resource.firstName ?? null
    this.lastName = resource.lastName ?? null
    this.email = resource.email ?? null
    this.passwordHash = resource.passwordHash ?? null
    this.isActive = resource.isActive ?? null
    this.createdAt = resource.createdAt ?? null
    this.updatedAt = resource.updatedAt ?? null
  }
}
