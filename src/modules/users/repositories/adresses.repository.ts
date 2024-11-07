import { inject } from "tsyringe";
import { AdressesEntity } from "../../../infra/database/entities/addresses.entity";
import { LocalRepository } from "../../../shared/database/repository";
import { DataSource } from "typeorm";

export class AdressesRepository extends LocalRepository<AdressesEntity> {
  constructor(
    @inject("dataSource")
    private datasource: DataSource
  ) {
    super(AdressesEntity, datasource);
  }
}
