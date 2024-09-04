import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "database_users_addresses",
  port: 5432,
  username: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.NAME_DB,
  synchronize: true,
  logging: false,
  entities: ["./entities/*.ts"],
  migrations: ["./migrations/*.ts"],
  subscribers: [],
});
