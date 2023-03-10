import { MigrationInterface, QueryRunner } from "typeorm";

export class attack1678463019570 implements MigrationInterface {
    name = 'attack1678463019570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_dfda472c0af7812401e592b6a61"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "organizationId"`);
        await queryRunner.query(`ALTER TABLE "attack" ADD "generatedEmailContent" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attack" DROP COLUMN "generatedEmailContent"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "organizationId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_dfda472c0af7812401e592b6a61" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
