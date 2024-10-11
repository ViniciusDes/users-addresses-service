import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewFieldsUsers1728339852497 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.manager.query(`
            ALTER TABLE public.users ADD email varchar(200) NOT NULL;
            ALTER TABLE public.users ADD password varchar(50) NOT NULL;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.manager.query(`
            ALTER TABLE public.users DROP email;
            ALTER TABLE public.users DROP password;
        `);
  }
}
