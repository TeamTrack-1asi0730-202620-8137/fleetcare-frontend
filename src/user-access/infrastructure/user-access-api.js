import { BaseApi } from '@/shared/infrastructure/base-api.js'
import { BaseEndpoint } from '@/shared/infrastructure/base-endpoint.js'

export class UserAccessApi extends BaseApi {
  #users
  #roles
  #fleets
  #tokens

  constructor() {
    super()
    this.#users = new BaseEndpoint(this, '/userAccounts')
    this.#roles = new BaseEndpoint(this, '/roles')
    this.#fleets = new BaseEndpoint(this, '/fleets')
    this.#tokens = new BaseEndpoint(this, '/passwordResetTokens')
  }

  getUsers(params = {}) {
    return this.#users.getAll(params)
  }
  getUser(id) {
    return this.#users.getById(id)
  }
  createUser(resource) {
    return this.#users.create(resource)
  }
  updateUser(resource) {
    return this.#users.update(resource.id, resource)
  }
  patchUser(id, resource) {
    return this.#users.patch(id, resource)
  }
  getRoles(params = {}) {
    return this.#roles.getAll(params)
  }
  getRole(id) {
    return this.#roles.getById(id)
  }
  getFleets(params = {}) {
    return this.#fleets.getAll(params)
  }
  createFleet(resource) {
    return this.#fleets.create(resource)
  }
  getResetTokens(params = {}) {
    return this.#tokens.getAll(params)
  }
  createResetToken(resource) {
    return this.#tokens.create(resource)
  }
  patchResetToken(id, resource) {
    return this.#tokens.patch(id, resource)
  }
}
