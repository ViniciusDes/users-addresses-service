import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

export function getConfig(isMigration: boolean = false) {
  if (isMigration) {
    return {
      type: "postgres",
      host: "localhost",
      port: 5434,
      username: process.env.USER_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.NAME_DB,
      synchronize: true,
      logging: false,
      entities: ["src/infra/database/entities/*.ts"],
      migrations: ["src/infra/database/migrations/*.ts"],
      subscribers: [],
    } as DataSourceOptions;
  }
  return {
    type: "postgres",
    host: "database",
    port: 5432,
    username: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB,
    synchronize: true,
    logging: false,
    entities: ["src/infra/database/entities/*.ts"],
    migrations: ["src/infra/database/migrations/*.ts"],
    subscribers: [],
  } as DataSourceOptions;
}

export default new DataSource(getConfig());
