import "reflect-metadata";
import { UsersRepository } from "../../repositories/users/users.repository";
import { AuthService } from "./auth.service";
import { UsersEntity } from "../../../../infra/database/entities/users.entity";
import { DataSource } from "typeorm";

jest.mock("../../repositories/users/users.repository");
jest.mock("jsonwebtoken", () => {
  return {
    sign: jest.fn(() => "mytoken"),
  };
});
describe("Auth suite", () => {
  let sut: AuthService;
  let usersRepositoryMock: jest.Mocked<UsersRepository>;
  let dataSourceMock: jest.Mocked<DataSource>;
  let userAuthPayloadMock: { email: string; password: string };

  beforeEach(() => {
    usersRepositoryMock = new UsersRepository(
      dataSourceMock
    ) as jest.Mocked<UsersRepository>;

    sut = new AuthService(usersRepositoryMock);

    userAuthPayloadMock = {
      email: "validmail@mail.com",
      password: "validpassword",
    };
  });
  it("Sut should be defined", () => {
    expect(sut).toBeDefined();
  });

  it("Sut should have makeLogin method", () => {
    expect(sut).toHaveProperty("makeLokin");
  });

  it("Should not make login with non-existent user", () => {
    usersRepositoryMock.getBy.mockImplementation(async () => {
      return Promise.resolve([] as UsersEntity[]);
    });

    expect(
      sut.makeLokin("invalidmail@mail.com", "invalidPassword")
    ).rejects.toThrow("Usuário ou senha inválidos");
  });

  it("Should make login with valid user", () => {
    usersRepositoryMock.getBy.mockImplementation(async () => {
      return Promise.resolve([userAuthPayloadMock] as UsersEntity[]);
    });

    expect(
      sut.makeLokin(userAuthPayloadMock.email, userAuthPayloadMock.password)
    ).resolves.toBeDefined();
  });

  it("Sut should have createTokenAuthentication method", () => {
    expect(sut).toHaveProperty("createTokenAuthentication");
  });

  it("createTokenAuthentication method must return a token", () => {
    expect(
      sut.createTokenAuthentication(userAuthPayloadMock as UsersEntity).length
    ).toBeGreaterThanOrEqual(1);
  });
});
