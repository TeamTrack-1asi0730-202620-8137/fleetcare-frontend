import { Vehicle } from '../domain/model/vehicle.entity.js'
export class VehicleAssembler {
  static toEntity(resource) {
    return new Vehicle(resource)
  }
  static toEntities(response) {
    return response.data.map((item) => this.toEntity(item))
  }
}
