import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Goods} from "../../entities/cinema/goods.model";

@Module({
  imports: [TypeOrmModule.forFeature([Goods])],
  controllers: [GoodsController],
  providers: [GoodsService],
})
export class GoodsModule {}
