import {MigrationInterface, QueryRunner} from "typeorm";
import * as bcrypt from "bcrypt";
import {fa, faker} from "@faker-js/faker";
import {Movie} from "../entities/cinema/movie/movie.model";
import {Actor} from "../entities/cinema/movie/actor.model";
import {Session} from "../entities/cinema/session/session.model";
import {Hall} from "../entities/cinema/session/hall/hall.model";
import {SeatType} from "../entities/enums/seat-type.model";
import {TicketTypesModel} from "../entities/cinema/session/ticket.types.model";

export class StartData1707313729499 implements MigrationInterface {
    name = 'StartData1707313729499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.startTransaction();

        const sessionCount = 100;

        const prices = [140, 100, 240, 0];
        for (let i = 0; i < sessionCount; i++) {

            const ticketType = [
                ...(Object.values(SeatType)
                    .filter(type => type !== SeatType.COMMON && type !== SeatType.CRIPPLE && type !== SeatType.VIP && type !== SeatType.UNAVAILABLE)
                    .map((type, index) => {
                    return {
                        type: SeatType[type],
                        price: !prices[index] ? 0 : prices[index] + faker.number.int({min: 1, max: 3})* 10
                    }
                }))
            ];

            const sessionRepository = queryRunner.manager.getRepository(Session);
            const movieRepository = queryRunner.manager.getRepository(Movie);
            const hallRepository = queryRunner.manager.getRepository(Hall);
            const createdSession = sessionRepository.create({
                startDateTime: faker.date.soon({days: faker.number.int({min: 1, max: 14})}),
                technology: ["2D", "3D"][faker.number.int({min: 0, max: 1})],
                movie: await movieRepository.findOne({where: {id: faker.number.int({min: 1, max:10})}}),
                hall: await hallRepository.findOne({where: {id: faker.number.int({min: 1, max:10})}}),
                ticketType
            });

            await sessionRepository.save(createdSession);
        }

        await queryRunner.commitTransaction();
    }

    addDaysToDate(date:Date, days:number) {
        let result = new Date(date);
        return result.setDate(result.getDate() + days);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(``);
    }

}
