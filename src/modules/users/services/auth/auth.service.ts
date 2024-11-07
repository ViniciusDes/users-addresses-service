import { inject, injectable } from "tsyringe";
import { UsersEntity } from "../../../../infra/database/entities/users.entity";
import { UsersRepository } from "../../repositories/users/users.repository";
import jwt from "jsonwebtoken";

interface UserWithoutPassword extends Omit<UsersEntity, "password"> {
  password?: string;
}
@injectable()
export class AuthService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}

  async makeLokin(email: string, password: string) {
    let user: UserWithoutPassword;

    [user] = await this.usersRepository.getBy({
      email: email,
      password: this.createCryptoPassword(password),
    });

    if (!user) throw new Error("Usuário ou senha inválidos");

    delete user.password;

    const token = this.createTokenAuthentication(user as UsersEntity);

    return {
      token: token,
      isAuthenticated: true,
      ...user,
    };
  }

  createTokenAuthentication(userData: UsersEntity) {
    const safePayload = JSON.parse(JSON.stringify(userData));
    const token = jwt.sign(safePayload, process.env.PRIVATE_KEY ?? "", {
      expiresIn: "1h",
    });

    return token;
  }

  createCryptoPassword(password: string) {
    const token = jwt.sign(password, process.env.PRIVATE_KEY ?? "", {});

    return token;
  }

  createDecryptoPassword(password: string) {
    const token = jwt.decode(password);

    return String(token);
  }
}
