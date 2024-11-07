import "reflect-metadata";
import { UsersEntity } from "../../../../infra/database/entities/users.entity";
import { UsersService } from "./users.service";
import { UsersRepository } from "../../repositories/users/users.repository";
import { AuthService } from "../auth/auth.service";
import { DataSource } from "typeorm";

jest.mock("../../repositories/users/users.repository");
jest.mock("../auth/auth.service");
describe("Users service suite", () => {
  let usersService: UsersService;
  let dataSourceMock: jest.Mocked<DataSource>;
  let usersRepositoryMock: jest.Mocked<UsersRepository>;
  let authServiceMock: jest.Mocked<AuthService>;

  const userToInsertMock: Partial<UsersEntity> = {
    email: "meuemail@gmail.com",
    name: "Vini",
    password: "09090909",
    situation: "S",
  };

  beforeEach(() => {
    usersRepositoryMock = new UsersRepository(
      dataSourceMock
    ) as jest.Mocked<UsersRepository>;
    authServiceMock = new AuthService(
      usersRepositoryMock
    ) as jest.Mocked<AuthService>;
    usersRepositoryMock = new UsersRepository(
      dataSourceMock
    ) as jest.Mocked<UsersRepository>;

    authServiceMock.createCryptoPassword.mockImplementation(
      () => "cryptedpassword"
    );

    usersService = new UsersService(usersRepositoryMock, authServiceMock);
  });

  describe("findUsers suite", () => {
    it("Service must have findUsers method", () => {
      expect(usersService).toHaveProperty("findUsers");
    });
  });

  describe("createUser suite", () => {
    it("Must have createUser method", () => {
      expect(usersService).toHaveProperty("createUser");
    });

    it("createUser method must be calld with params", async () => {
      const spy = jest.spyOn(usersService, "createUser");
      usersRepositoryMock.getBy.mockImplementation(async () => {
        return Promise.resolve([] as UsersEntity[]);
      });
      await usersService.createUser(userToInsertMock as UsersEntity);
      expect(spy).toHaveBeenCalledWith(userToInsertMock);
    });

    it("Should throw error for duplicate user", async () => {
      usersRepositoryMock.getBy.mockImplementation(async () => {
        return Promise.resolve([] as UsersEntity[]);
      });
      await usersService.createUser(userToInsertMock as UsersEntity);
      usersRepositoryMock.getBy.mockImplementation(async () => {
        return Promise.resolve([userToInsertMock] as UsersEntity[]);
      });
      expect(
        usersService.createUser(userToInsertMock as UsersEntity)
      ).rejects.toThrow("User already exists");
    });

    it("Should not create user with password length less than 8 characters", () => {
      usersRepositoryMock.getBy.mockImplementation(async () => {
        return Promise.resolve([] as UsersEntity[]);
      });
      expect(
        usersService.createUser({
          ...userToInsertMock,
          password: "1234567",
        } as UsersEntity)
      ).rejects.toThrow("Password must be at least 8 characters");
    });

    it("Should create user with password length more than 8 characters", () => {
      usersRepositoryMock.getBy.mockImplementation(async () => {
        return Promise.resolve([] as UsersEntity[]);
      });
      expect(
        usersService.createUser({
          ...userToInsertMock,
          password: "123456789",
        } as UsersEntity)
      ).resolves.toBeUndefined();
    });
  });

  it("Service must have updateUser method", () => {
    expect(usersService).toHaveProperty("updateUser");
  });

  it("Service must have deleteUser method", () => {
    expect(usersService).toHaveProperty("deleteUser");
  });
});
