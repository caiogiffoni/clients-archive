import { MigrationInterface, QueryRunner } from "typeorm";

export class deleteCascadeClient1663867178234 implements MigrationInterface {
    name = 'deleteCascadeClient1663867178234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" RENAME COLUMN "telephone" TO "contact"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" RENAME COLUMN "contact" TO "telephone"`);
    }

}
