import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {IncomeCategory} from "./income-category";
import {User} from "../user/user.model";


@Entity()
export class Income {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => User, user => user.expenses)
    user: User

    @Column()
    category: IncomeCategory

    @Column()
    sum: number

    @Column()
    date: string
}