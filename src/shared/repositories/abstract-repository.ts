export type WhereFindByInterface<Type> = {
  [P in keyof Type]?: Type[P];
};

export type AtLeastOne<T> = {
  [K in keyof T]-?: Pick<T, K> & Partial<T>;
}[keyof T];

export type PayloadToCreate<EntityType> = AtLeastOne<EntityType>;

export abstract class AbstractRepository<T> {
  public abstract insert(arg: T): Promise<void>;

  public abstract save(arg: T): Promise<T>;

  public abstract getBy(arg: WhereFindByInterface<T>): Promise<T[]>;
}
