import { MigrationInterface, QueryResult, QueryRunner } from "typeorm";

export class FixNameFieldsAddresses1727470700069 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE public.addresses RENAME COLUMN complemento TO complement;
            ALTER TABLE public.addresses RENAME COLUMN descricao TO description;
            ALTER TABLE public.addresses RENAME COLUMN numero TO number;
            ALTER TABLE public.addresses RENAME COLUMN criado_em TO created_at;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            ALTER TABLE public.addresses RENAME COLUMN complement TO complemento;
            ALTER TABLE public.addresses RENAME COLUMN description TO descricao;
            ALTER TABLE public.addresses RENAME COLUMN number TO numero;
            ALTER TABLE public.addresses RENAME COLUMN created_at TO criado_em;
        `);
  }
}
