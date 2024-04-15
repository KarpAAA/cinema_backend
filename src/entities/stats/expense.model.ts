import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ExpensesCategory} from "./expenses-category";


@Entity()
export class Expense {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    category: ExpensesCategory

    @Column()
    sum: number

    @Column()
    date: string
}


