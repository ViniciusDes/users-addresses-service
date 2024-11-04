import {
  AbstractRepository,
  PayloadToCreate,
  WhereFindByInterface,
} from "./repositories/abstract-repository";

import { DataSource, EntityTarget, ObjectLiteral } from "typeorm";

export class LocalRepository<Entity extends ObjectLiteral>
  implements AbstractRepository<Entity>
{
  private entity: EntityTarget<Entity>;

  constructor(
    entity: EntityTarget<Entity>,

    private connection: DataSource
  ) {
    this.entity = entity;
  }

  public async insert(payload: PayloadToCreate<Entity>): Promise<void> {
    const instance = this.connection.getRepository(this.entity).create(payload);
    await this.connection.getRepository(this.entity).insert(instance);
  }

  public save(payload: PayloadToCreate<Entity>): Promise<Entity> {
    const instance = this.connection.getRepository(this.entity).create(payload);
    return this.connection.getRepository(this.entity).save(instance);
  }

  public getBy(conditions: WhereFindByInterface<Entity>): Promise<Entity[]> {
    return this.connection.getRepository(this.entity).find({
      where: conditions,
    });
  }

  public getAll(): Promise<Entity[]> {
    return this.connection.getRepository(this.entity).find();
  }

  public delete(conditions: WhereFindByInterface<Entity>): Promise<any> {
    return this.connection.getRepository(this.entity).delete(conditions);
  }

  public getEspecificColumns(columns: Array<string>): Promise<Entity[]> {
    console.log("repor", this.connection.getRepository(this.entity));
    return this.connection
      .getRepository(this.entity)
      .createQueryBuilder("entity")
      .select([...columns])
      .getRawMany();
  }
}
