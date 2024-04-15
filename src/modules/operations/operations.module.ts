import { Module } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { OperationsController } from './operations.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Operation} from "../../entities/opertaion.model";
import {Session} from "../../entities/cinema/session/session.model";
import {User} from "../../entities/user/user.model";
import {Goods} from "../../entities/cinema/goods.model";
import {FinancesModule} from "../finances/finances.module";

@Module({
  imports: [TypeOrmModule.forFeature([Operation, Session, User, Goods]), FinancesModule],
  controllers: [OperationsController],
  providers: [OperationsService],
})
export class OperationsModule {}
