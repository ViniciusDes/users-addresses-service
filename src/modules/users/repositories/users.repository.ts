import { UsersEntity } from "../../../infra/database/entities/users.entity";
import { LocalRepository } from "../../../shared/repository";

export class UsersRepository extends LocalRepository<UsersEntity> {
  constructor() {
    super(UsersEntity);
  }
}
