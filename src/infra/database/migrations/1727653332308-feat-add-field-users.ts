import { MigrationInterface, QueryRunner } from "typeorm";

export class FeatAddFieldUsers1727653332308 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
            ALTER TABLE public.addresses ADD user_id integer NOT NULL;
            ALTER TABLE public.addresses ADD CONSTRAINT addresses_fk FOREIGN KEY (user_id) REFERENCES public.users(id);
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
            ALTER TABLE public.addresses DROP CONSTRAINT addresses_fk;
            ALTER TABLE public.addresses DROP user_id;
            `);
  }
}
