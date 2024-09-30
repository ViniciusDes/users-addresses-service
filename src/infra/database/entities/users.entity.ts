import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Users {
  @Column("number", {
    name: "id",
    generated: "identity",
    primary: true,
  })
  id: number;

  @Column("string", {
    name: "name",
    nullable: false,
  })
  name: string;

  @Column("string", {
    name: "situation",
    nullable: false,
  })
  situation: string;

  @Column("string", {
    name: "created_at",
    nullable: false,
  })
  created_at: Date;
}
