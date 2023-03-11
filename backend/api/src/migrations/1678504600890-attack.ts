import { MigrationInterface, QueryRunner } from "typeorm";

export class attack1678504600890 implements MigrationInterface {
    name = 'attack1678504600890'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attack_target" DROP CONSTRAINT "FK_86bc3d2a7df74bf484d3e47f741"`);
        await queryRunner.query(`ALTER TABLE "attack_target" DROP COLUMN "attackId"`);
        await queryRunner.query(`ALTER TABLE "attack_target" ADD "attackId" character varying`);
        await queryRunner.query(`ALTER TABLE "attack" DROP CONSTRAINT "PK_b63e4c74e7b45ef2d42a82bdabc"`);
        await queryRunner.query(`ALTER TABLE "attack" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "attack" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "attack" ADD CONSTRAINT "PK_b63e4c74e7b45ef2d42a82bdabc" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "attack_target" ADD CONSTRAINT "FK_86bc3d2a7df74bf484d3e47f741" FOREIGN KEY ("attackId") REFERENCES "attack"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attack_target" DROP CONSTRAINT "FK_86bc3d2a7df74bf484d3e47f741"`);
        await queryRunner.query(`ALTER TABLE "attack" DROP CONSTRAINT "PK_b63e4c74e7b45ef2d42a82bdabc"`);
        await queryRunner.query(`ALTER TABLE "attack" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "attack" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "attack" ADD CONSTRAINT "PK_b63e4c74e7b45ef2d42a82bdabc" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "attack_target" DROP COLUMN "attackId"`);
        await queryRunner.query(`ALTER TABLE "attack_target" ADD "attackId" uuid`);
        await queryRunner.query(`ALTER TABLE "attack_target" ADD CONSTRAINT "FK_86bc3d2a7df74bf484d3e47f741" FOREIGN KEY ("attackId") REFERENCES "attack"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
