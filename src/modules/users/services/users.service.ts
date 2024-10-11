import { CreateUserDto, UpdateUserDto } from "../dto/users.dto";
import { AuthService } from "./auth.service";

export enum UserSituation {
  DISABLED = "0",
  ENABLE = "1",
}
export class UsersService extends AuthService {
  constructor() {
    super();
  }

  async findUsers() {
    return this.usersRepository.getEspecificColumns([
      "name",
      "id",
      "email",
      "situation",
      "created_at",
    ]);
  }

  async createUser(userPayload: CreateUserDto) {
    const password = this.createCryptoPassword(userPayload.password);
    return this.usersRepository.insert({
      ...userPayload,
      situation: UserSituation.ENABLE,
      created_at: new Date(),
      password: password,
    });
  }

  async updateUser(idUser: number, userPayload: UpdateUserDto) {
    return this.usersRepository.save({
      ...userPayload,
      id: idUser,
    });
  }
}
