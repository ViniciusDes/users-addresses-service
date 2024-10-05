import { Entity, Column } from "typeorm";

@Entity({
  name: "addresses",
})
export class AdressesEntity {
  @Column("int4", {
    name: "id",
    generated: "identity",
    primary: true,
  })
  id: number;

  @Column("varchar", {
    name: "cep",
    nullable: false,
  })
  cep: string;

  @Column("varchar", {
    name: "description",
    nullable: false,
  })
  description: string;

  @Column("varchar", {
    name: "complement",
  })
  complement: string;

  @Column("varchar", {
    name: "number",
  })
  number: string;

  @Column("date", {
    name: "created_at",
    primary: true,
    nullable: false,
  })
  created_at: Date;

  @Column("int4", {
    name: "user_id",
    primary: true,
    nullable: false,
  })
  user_id: number;
}
