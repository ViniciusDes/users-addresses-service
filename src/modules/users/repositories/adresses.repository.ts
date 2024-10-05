import { AdressesEntity } from "../../../infra/database/entities/addresses.entity";
import { LocalRepository } from "../../../shared/repository";

export class AdressesRepository extends LocalRepository<AdressesEntity> {
  constructor() {
    super(AdressesEntity);
  }
}
