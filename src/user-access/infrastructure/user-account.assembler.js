import { UserAccount } from '../domain/model/user-account.entity.js'
export class UserAccountAssembler {
  static toEntity(r) {
    return new UserAccount(r)
  }
  static toEntities(res) {
    return res.data.map((r) => this.toEntity(r))
  }
}
