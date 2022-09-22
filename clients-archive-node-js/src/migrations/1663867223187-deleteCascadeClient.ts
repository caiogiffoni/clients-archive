import { MigrationInterface, QueryRunner } from "typeorm";

export class deleteCascadeClient1663867223187 implements MigrationInterface {
    name = 'deleteCascadeClient1663867223187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" RENAME COLUMN "contact" TO "telephone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact" RENAME COLUMN "telephone" TO "contact"`);
    }

}
