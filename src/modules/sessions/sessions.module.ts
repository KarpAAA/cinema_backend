import {Module} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Movie} from "../../entities/cinema/movie/movie.model";
import {Hall} from "../../entities/cinema/session/hall/hall.model";
import {Session} from "../../entities/cinema/session/session.model";
import {Ticket} from "../../entities/cinema/ticket.model";

@Module({
  imports:[TypeOrmModule.forFeature([Session,Movie,Hall,Ticket])],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
