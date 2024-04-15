import {MigrationInterface, QueryRunner} from "typeorm";
import {Expense} from "../entities/stats/expense.model";
import {faker} from "@faker-js/faker";
import {ExpensesCategory} from "../entities/stats/expenses-category";
import {Income} from "../entities/stats/Income.model";
import {IncomeCategory} from "../entities/stats/income-category";
import {User} from "../entities/user/user.model";

export class StartData1707313729501 implements MigrationInterface {
    name = 'StartData1707313729501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.startTransaction();

        const expenseCount = 1000;
        const expenseRepository = queryRunner.manager.getRepository(Expense);
        const categoriesCount = Object.keys(ExpensesCategory).length / 2;

        for (let i = 0; i < expenseCount; i++) {
            const createdExpense = expenseRepository.create({
                date: faker.date.between({ from: '2024-01-01', to: '2024-12-31'}).toLocaleDateString(),
                sum: faker.number.int({min: 100, max: 3000}),
                category: faker.number.int({min: 0, max: categoriesCount - 1})
            });
            await expenseRepository.save(createdExpense);
        }

        const incomesCount = 1500;
        const incomesRepository = queryRunner.manager.getRepository(Income);
        const userRepository = queryRunner.manager.getRepository(User);
        const categoriesIncomeCount = Object.keys(IncomeCategory).length / 2;
        const allUsers =  await userRepository.find({});

        for (let i = 0; i < incomesCount; i++) {

            const createdIncome = incomesRepository.create({
                user: allUsers[faker.number.int({min: 0, max: allUsers.length - 1})],
                date: faker.date.between({ from: '2024-01-01', to: '2024-12-31'}).toLocaleDateString(),
                sum: faker.number.int({min: 100, max: 3000}),
                category: faker.number.int({min: 0, max: categoriesIncomeCount - 1})
            });

            await incomesRepository.save(createdIncome);
        }

        await queryRunner.commitTransaction();
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(``);
    }

}
