import { MigrationInterface, QueryRunner } from "typeorm";

export class attackTarget1678460345833 implements MigrationInterface {
    name = 'attackTarget1678460345833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attack_target" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attack_target" ADD "isFailedClick" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "attack_target" ADD "isFailedSubmit" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "attack_target" DROP CONSTRAINT "PK_d51ad3d30f038d44159c479c7a7"`);
        await queryRunner.query(`ALTER TABLE "attack_target" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "attack_target" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "attack_target" ADD CONSTRAINT "PK_d51ad3d30f038d44159c479c7a7" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attack_target" DROP CONSTRAINT "PK_d51ad3d30f038d44159c479c7a7"`);
        await queryRunner.query(`ALTER TABLE "attack_target" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "attack_target" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attack_target" ADD CONSTRAINT "PK_d51ad3d30f038d44159c479c7a7" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "attack_target" DROP COLUMN "isFailedSubmit"`);
        await queryRunner.query(`ALTER TABLE "attack_target" DROP COLUMN "isFailedClick"`);
        await queryRunner.query(`ALTER TABLE "attack_target" DROP COLUMN "email"`);
    }

}
