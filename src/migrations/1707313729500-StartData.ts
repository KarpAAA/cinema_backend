import {MigrationInterface, QueryRunner} from "typeorm";
import * as bcrypt from "bcrypt";
import {fa, faker} from "@faker-js/faker";
import {Movie} from "../entities/cinema/movie/movie.model";
import {Actor} from "../entities/cinema/movie/actor.model";
import {Session} from "../entities/cinema/session/session.model";
import {Hall} from "../entities/cinema/session/hall/hall.model";
import {SeatType} from "../entities/enums/seat-type.model";
import {TicketTypesModel} from "../entities/cinema/session/ticket.types.model";
import {Goods} from "../entities/cinema/goods.model";

export class StartData1707313729500 implements MigrationInterface {
    name = 'StartData1707313729500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.startTransaction();

        const goodsCount = 6;

        for (let i = 0; i < goodsCount; i++) {

            const goodsRepository = queryRunner.manager.getRepository(Goods);

            const createdSession = goodsRepository.create({
                name: faker.word.noun(),
                photo: faker.image.url({height: 200, width: 150}),
                price: faker.number.int({min: 80, max: 200}),
            });

            await goodsRepository.save(createdSession);
        }

        await queryRunner.commitTransaction();
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(``);
    }

}
