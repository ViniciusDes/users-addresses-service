import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { CreateUserDto, UpdateUserDto } from "../../dto/users.dto";
import { UsersRepository } from "../../repositories/users/users.repository";
import { AuthService } from "../auth/auth.service";

export enum UserSituation {
  DISABLED = "0",
  ENABLE = "1",
}
@injectable()
export class UsersService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository,

    @inject("authService")
    private authService: AuthService
  ) {}

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
    const [userAlreadyExists] = await this.usersRepository.getBy({});

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    if (userPayload.password.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }

    const password = this.authService.createCryptoPassword(
      userPayload.password
    );
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

  async deleteUser(idUser: string) {
    return this.usersRepository.delete({
      email: idUser,
    });
  }
}
