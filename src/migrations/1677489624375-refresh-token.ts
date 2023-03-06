import { MigrationInterface, QueryRunner } from 'typeorm';

export class refreshToken1677489624375 implements MigrationInterface {
  name = 'refreshToken1677489624375';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "refreshToken" character varying(500)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshToken"`);
  }
}
