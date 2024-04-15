import { Module } from '@nestjs/common';
import { FinancesService } from './finances.service';
import { FinancesController } from './finances.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Income} from "../../entities/stats/Income.model";
import {Expense} from "../../entities/stats/expense.model";

@Module({
  imports: [TypeOrmModule.forFeature([Expense, Income])],
  controllers: [FinancesController],
  providers: [FinancesService],
  exports: [FinancesService]
})
export class FinancesModule {}
