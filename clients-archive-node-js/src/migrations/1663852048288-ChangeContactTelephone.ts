import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeContactTelephone1663852048288 implements MigrationInterface {
    name = 'ChangeContactTelephone1663852048288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" RENAME COLUMN "contact" TO "telephone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" RENAME COLUMN "telephone" TO "contact"`);
    }

}
