import "reflect-metadata";
import { UsersEntity } from "../../../../infra/database/entities/users.entity";
import { LocalRepository } from "../../../../shared/database/repository";
import { inject, injectable } from "tsyringe";
import { DataSource } from "typeorm";
@injectable()
export class UsersRepository extends LocalRepository<UsersEntity> {
  constructor(
    @inject("dataSource")
    private datasource: DataSource
  ) {
    super(UsersEntity, datasource);
  }
}
