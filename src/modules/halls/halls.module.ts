import { Module } from '@nestjs/common';
import { HallsService } from './halls.service';
import { HallsController } from './halls.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Hall} from "../../entities/cinema/session/hall/hall.model";
import {Seat} from "../../entities/cinema/session/hall/seat.model";

@Module({
  imports:[TypeOrmModule.forFeature([Hall, Seat])],
  controllers: [HallsController],
  providers: [HallsService],
})
export class HallsModule {}
