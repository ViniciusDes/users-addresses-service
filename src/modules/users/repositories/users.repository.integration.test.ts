import "reflect-metadata";
import { UserSituation } from "../services/users.service";
import dataSourceTests from "../../../infra/database/data-source-tests";
import { UsersEntity } from "../../../infra/database/entities/users.entity";
import { UsersRepository } from "./users.repository";

describe("Users repository suite", () => {
  let usersRepository: UsersRepository;
  const userToInsertMock: Partial<UsersEntity> = {
    email: "meuemail@gmail.com",
    name: "Vini",
    password: "00990",
    situation: "S",
  };

  beforeEach(async () => {
    if (!dataSourceTests.isInitialized) {
      await dataSourceTests
        .initialize()
        .catch((err) => console.log("error on connect tests database", err));
    }
    usersRepository = new UsersRepository(dataSourceTests);
  });

  afterEach(() => {
    dataSourceTests.destroy();
  });

  describe("Insert user suite", () => {
    afterEach(async () => {
      await usersRepository.delete({
        email: userToInsertMock.email,
      });
    });
    it("Must insert a new user ", (done) => {
      usersRepository
        .insert({
          ...userToInsertMock,
          situation: UserSituation.ENABLE,
          created_at: new Date(),
        })
        .then(() => done())
        .catch((e) => done(e));
    });
  });
});
