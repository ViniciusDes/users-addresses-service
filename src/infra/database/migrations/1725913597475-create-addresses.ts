import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAddresses1725913597475 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "addresses",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "cep", type: "varchar(8)", isNullable: false },
          {
            name: "descricao",
            type: "varchar(150)",
            isNullable: false,
          },
          {
            name: "complemento",
            type: "varchar(150)",
            isNullable: true,
          },
          {
            name: "numero",
            type: "varchar(6)",
            isNullable: true,
          },
          {
            name: "criado_em",
            type: "timestamp",
            default: "now()",
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("addresses");
  }
}
