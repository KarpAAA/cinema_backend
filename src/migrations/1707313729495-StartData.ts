import {MigrationInterface, QueryRunner} from "typeorm";
import * as bcrypt from "bcrypt";

export class StartData1707313729495 implements MigrationInterface {
    name = 'StartData1707313729495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.startTransaction();
        await queryRunner.query(`INSERT INTO "user" (email, password, role) VALUES ('u1', '${await bcrypt.hash('1111', 10)}', 0);`);
        await queryRunner.query(`INSERT INTO "user" (email, password, role) VALUES ('u2', '${await bcrypt.hash('1111', 10)}', 0);`);

        await queryRunner.commitTransaction();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(``);
    }

}
