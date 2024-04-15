import {Column} from "typeorm";
import {ExpensesCategory} from "../../../entities/stats/expenses-category";


export class CreateExpenseDto {
    category: string
    sum: number
}