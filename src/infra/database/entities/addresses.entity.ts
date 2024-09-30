import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Adresses {
  @Column("number", {
    name: "id",
    generated: "identity",
    primary: true,
  })
  id: number;

  @Column("string", {
    name: "cep",
    nullable: false,
  })
  cep: string;

  @Column("string", {
    name: "description",
    nullable: false,
  })
  description: string;

  @Column("string", {
    name: "complement",
  })
  complement: string;

  @Column("string", {
    name: "number",
  })
  number: string;

  @Column("date", {
    name: "created_at",
    primary: true,
    nullable: false,
  })
  created_at: Date;

  @Column("number", {
    name: "user_id",
    primary: true,
    nullable: false,
  })
  user_id: number;
}
