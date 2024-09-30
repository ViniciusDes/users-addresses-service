import { MigrationInterface, QueryRunner } from "typeorm";

export class FixNameFieldsUsers1727652904336 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE public.users RENAME COLUMN situacao TO situation;
            ALTER TABLE public.users RENAME COLUMN criado_em TO created_at;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE public.users RENAME COLUMN situation TO situacao;
            ALTER TABLE public.users RENAME COLUMN created_at TO criado_em;
        `);
  }
}
