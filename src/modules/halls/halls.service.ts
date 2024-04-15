import {Injectable} from '@nestjs/common';
import {CreateHallDto} from './dto/create-hall.dto';
import {UpdateHallDto} from './dto/update-hall.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Seat} from "../../entities/cinema/session/hall/seat.model";
import {Hall} from "../../entities/cinema/session/hall/hall.model";

@Injectable()
export class HallsService {
    constructor(
        @InjectRepository(Hall) private hallRepository: Repository<Hall>,
        @InjectRepository(Seat) private seatRepository: Repository<Seat>,
        ) {
    }

    async create({cinemaId, seats,  ...otherArgs}: CreateHallDto) {
        const createdHall = await this.hallRepository.save({...otherArgs});

        const saveSeats = seats.map(s => {
            return {hall: createdHall, ...s};
        })

        // const createdSeats = await this.seatRepository.save(saveSeats);
        // return {seats: createdSeats, hall: createdHall}
    }

    findAll() {
        return this.hallRepository.find({relations: ["cinema", "seats"]});
    }

    findOne(id: number) {
        return this.hallRepository.findOne({relations: ["cinema", "seats"], where: {id}});
    }

    update(id: number, updateHallDto: UpdateHallDto) {
        return this.hallRepository.save({
            id,
            ...updateHallDto
        });
    }

    remove(id: number) {
       return this.hallRepository.delete({id})
    }
}
