import {MigrationInterface, QueryRunner} from "typeorm";
import {fa, faker} from "@faker-js/faker";
import {Hall} from "../entities/cinema/session/hall/hall.model";
import {SeatType} from "../entities/enums/seat-type.model";

export class StartData1707313729497 implements MigrationInterface {
    name = 'StartData1707313729497'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.startTransaction();
        const hallsCount = 100;


        for (let i = 0; i < hallsCount; i++) {

            const rows = [];
            const rowsCount = faker.number.int({min: 7, max: 15});
            const seatsCount = faker.number.int({min: 7, max: 15});
            for (let i = 0; i < rowsCount; i++) {

                const seats = [];
                for (let j = 0; j < seatsCount; j++) {
                    let type: number = 0;

                    if (i === 0) {
                        const possibleKeys = [SeatType.COMMON, SeatType.CRIPPLE];
                        type = possibleKeys[faker.number.int({min: 0, max: possibleKeys.length - 1})];
                    }
                    else if (i === rowsCount - 1) {
                        type = SeatType.VIP;
                    }
                    else {

                        type = SeatType.COMMON;
                    }

                    seats.push(
                        {
                            number: j + 1,
                            type
                        }
                    );
                }

                rows.push(
                    {
                        number: i + 1,
                        seats
                    }
                );
            }


            const hallRepository = queryRunner.manager.getRepository(Hall);
            const createdHall = hallRepository.create({
                number: i + 1,
                rows
            });
            await hallRepository.save(createdHall);
        }

        await queryRunner.commitTransaction();

    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(``);
    }

}
