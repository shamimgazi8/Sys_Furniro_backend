import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1777201814691 implements MigrationInterface {
  name = "InitialMigration1777201814691";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "phone" TO "phone_number"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "phone_number" TO "phone"`,
    );
  }
}
