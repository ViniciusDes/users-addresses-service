import { CreateUserDto, UpdateUserDto } from "../dto/users.dto";
import { UsersRepository } from "../repositories/users.repository";

export class UsersService {
  private usersRepository: UsersRepository;
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async findUsers() {
    return this.usersRepository.getAll();
  }

  async createUser(userPayload: CreateUserDto) {
    return this.usersRepository.insert({
      ...userPayload,
      situation: "1",
      created_at: new Date(),
    });
  }

  async updateUser(idUser: number, userPayload: UpdateUserDto) {
    return this.usersRepository.save({
      ...userPayload,
      id: idUser,
    });
  }
}
