import { MigrationInterface, QueryRunner } from "typeorm";

export class attack1678369164859 implements MigrationInterface {
    name = 'attack1678369164859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "attack_target" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "attackId" integer, CONSTRAINT "PK_d51ad3d30f038d44159c479c7a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attack" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b63e4c74e7b45ef2d42a82bdabc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "attack_target" ADD CONSTRAINT "FK_86bc3d2a7df74bf484d3e47f741" FOREIGN KEY ("attackId") REFERENCES "attack"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attack_target" DROP CONSTRAINT "FK_86bc3d2a7df74bf484d3e47f741"`);
        await queryRunner.query(`DROP TABLE "attack"`);
        await queryRunner.query(`DROP TABLE "attack_target"`);
    }

}
