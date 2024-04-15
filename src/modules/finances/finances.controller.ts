import {Body, Controller, Get, Post} from '@nestjs/common';
import { FinancesService } from './finances.service';
import {CreateExpenseDto} from "./dto/create-expense.dto";

@Controller('finances')
export class FinancesController {
  constructor(private readonly financesService: FinancesService) {

  }

  @Get('/incomes/daily')
  getDailyIncomes(){
    return this.financesService.getDailyIncomes();
  }
  @Get('/expenses/daily')
  getDailyExpenses(){
    return this.financesService.getDailyExpense();
  }

  @Get('/incomes/monthly')
  getMonthlyIncomes(){
    return this.financesService.getMonthlyIncomes();
  }
  @Get('/expenses/monthly')
  getMonthlyExpense(s){
    return this.financesService.getMonthlyExpenses();
  }
  @Get('/expenses/categories')
  getExpensesCategories(){
    return this.financesService.getExpensesCategories();
  }
    @Post('/expenses')
    createExpense(@Body() createExpense: CreateExpenseDto){
      return this.financesService.createExpense(createExpense);
    }
}
