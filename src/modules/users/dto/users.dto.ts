import { UsersEntity } from "../../../infra/database/entities/users.entity";

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDto extends UsersEntity {}
