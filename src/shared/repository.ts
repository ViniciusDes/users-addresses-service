import {
  AbstractRepository,
  PayloadToCreate,
  WhereFindByInterface,
} from "./repositories/abstract-repository";
import connection from "../infra/database/data-source";

import { DataSource, EntityTarget, ObjectLiteral } from "typeorm";

export class LocalRepository<Entity extends ObjectLiteral>
  implements AbstractRepository<Entity>
{
  private entity: EntityTarget<Entity>;
  private connection: DataSource;

  constructor(entity: EntityTarget<Entity>) {
    this.entity = entity;
    this.connection = connection;
  }

  public async insert(payload: PayloadToCreate<Entity>): Promise<void> {
    const instance = connection.getRepository(this.entity).create(payload);
    await this.connection.getRepository(this.entity).insert(instance);
  }

  public save(payload: PayloadToCreate<Entity>): Promise<Entity> {
    const instance = connection.getRepository(this.entity).create(payload);
    return this.connection.getRepository(this.entity).save(instance);
  }

  public getBy(arg: WhereFindByInterface<Entity>): Promise<Entity[]> {
    return this.connection.getRepository(this.entity).find({
      where: arg,
    });
  }

  public getAll(): Promise<Entity[]> {
    return this.connection.getRepository(this.entity).find();
  }

  public getEspecificColumns(columns: Array<string>): Promise<Entity[]> {
    return this.connection
      .getRepository(this.entity)
      .createQueryBuilder("entity")
      .select([...columns])
      .getRawMany();
  }
}
