import { MigrationInterface, QueryRunner } from "typeorm";

export class attack1678460651061 implements MigrationInterface {
    name = 'attack1678460651061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."attack_communicationtype_enum" AS ENUM('formal', 'casual', 'friendly', 'direct', 'indirect')`);
        await queryRunner.query(`ALTER TABLE "attack" ADD "communicationType" "public"."attack_communicationtype_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attack" ADD "fromName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attack" ADD "fromRelationship" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attack" ADD "theme" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attack" ADD "scrapeUrl" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attack" DROP COLUMN "scrapeUrl"`);
        await queryRunner.query(`ALTER TABLE "attack" DROP COLUMN "theme"`);
        await queryRunner.query(`ALTER TABLE "attack" DROP COLUMN "fromRelationship"`);
        await queryRunner.query(`ALTER TABLE "attack" DROP COLUMN "fromName"`);
        await queryRunner.query(`ALTER TABLE "attack" DROP COLUMN "communicationType"`);
        await queryRunner.query(`DROP TYPE "public"."attack_communicationtype_enum"`);
    }

}
