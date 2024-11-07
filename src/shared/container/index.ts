import "reflect-metadata";
import { UsersService } from "../../modules/users/services/users/users.service";
import { UsersRepository } from "../../modules/users/repositories/users/users.repository";
import { container } from "tsyringe";
import { DataSource } from "typeorm";
import { AuthService } from "../../modules/users/services/auth/auth.service";
import dataSource from "../../infra/database/data-source";

container.registerSingleton("UsersRepository", UsersRepository);
container.register("authService", {
  useClass: AuthService,
});
container.register<UsersService>("UsersService", { useClass: UsersService });
container.register<DataSource>("dataSource", {
  useValue: dataSource,
});
