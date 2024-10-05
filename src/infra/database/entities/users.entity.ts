import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({
  name: "users",
})
export class UsersEntity {
  @Column("int4", {
    name: "id",
    generated: "identity",
    primary: true,
  })
  id: number;

  @Column("varchar", {
    name: "name",
    nullable: false,
  })
  name: string;

  @Column("varchar", {
    name: "situation",
    nullable: false,
  })
  situation: string;

  @Column("date", {
    name: "created_at",
    nullable: false,
  })
  created_at: Date;
}
