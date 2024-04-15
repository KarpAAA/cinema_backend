import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "../enums/role.model";
import {Income} from "../stats/Income.model";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number


    @Column({unique: true})
    email:string
    @Column()
    password:string

    @Column({nullable: true, default: ''})
    city:string
    @Column({nullable: true, unique: true})
    phone:string
    @Column({nullable: true, default: ''})
    name:string
    @Column({nullable: true, default: ''})
    birthdate:string

    @Column({})
    role: Role


    @OneToMany(type => Income, income => income.user)
    expenses: Income[]
}