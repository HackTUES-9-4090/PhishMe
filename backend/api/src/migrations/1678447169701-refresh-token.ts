import { MigrationInterface, QueryRunner } from "typeorm";

export class refreshToken1678447169701 implements MigrationInterface {
    name = 'refreshToken1678447169701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "refreshToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refreshToken"`);
    }

}
