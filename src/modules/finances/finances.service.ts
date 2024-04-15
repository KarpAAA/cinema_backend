import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Expense} from "../../entities/stats/expense.model";
import {Repository} from "typeorm";
import {Income} from "../../entities/stats/Income.model";
import {ExpensesCategory} from "../../entities/stats/expenses-category";
import {CreateExpenseDto} from "./dto/create-expense.dto";

@Injectable()
export class FinancesService {
    monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    constructor(
        @InjectRepository(Expense) private expenseRepository: Repository<Expense>,
        @InjectRepository(Income) private incomeRepository: Repository<Income>,
    ) {
    }

    async getDailyIncomes() {
        return this.datedStats(await this.incomeRepository.find({}));
    }

    async getDailyExpense() {
        return this.datedStats(await this.expenseRepository.find({}));
    }

    getExpensesCategories() {
        const categoriesCount = Object.values(ExpensesCategory).length;
        return Object.values(ExpensesCategory).slice(0, categoriesCount / 2);
    }

    datedStats(stats: Income[] | Expense[]) {

        const startRes = {};


        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const formattedDate = `${day}.${month}.${year}`;
            startRes[formattedDate] = 0;
        }

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        return stats
            .filter(item => {
                const itemDateParts = item.date.split('.'); // Розділити рядок дати за роздільником "."
                const itemDate = new Date(
                    parseInt(itemDateParts[2]), // Рік
                    parseInt(itemDateParts[1]) - 1, // Місяць (в JavaScript місяці починаються з 0)
                    parseInt(itemDateParts[0]) // День
                );
                return itemDate >= sevenDaysAgo && itemDate <= new Date();
            })
            .reduce((result, item) => {
                const { date, sum } = item;
                result[date] = (result[date] || 0) + sum;
                return result;
            }, startRes);

    }

    getMonthIndex(date: string) {
        const parts = date.split('.');
        const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        const dateObject = new Date(formattedDate);

        return this.monthNames[dateObject.getMonth()];
    }

    monthState(stats: Income[] | Expense[]) {

        const res = this.monthNames.reduce((res, item) => {
            res[item] = 0;
            return res;
        }, {})
        return stats
            .reduce((result, item) => {
                const {date, sum} = item;
                const monthIndex = this.getMonthIndex(date);
                if (!result[monthIndex]) {
                    result[monthIndex] = sum;
                } else {
                    result[monthIndex] += sum;
                }
                return result;
            }, res);
    }

    async getMonthlyIncomes() {
        return this.monthState(await this.incomeRepository.find({}));
    }

    async getMonthlyExpenses() {
        return this.monthState(await this.expenseRepository.find({}));
    }

    createExpense({category, ...other}: CreateExpenseDto) {
        return this.expenseRepository.save(
            {
                ...other,
                date: (new Date()).toLocaleDateString(),
                category: ExpensesCategory[category]
            })
    }
    createIncome(income: Income) {
        return this.incomeRepository.save(income);
    }
}
