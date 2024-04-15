import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import {Ticket} from "./cinema/ticket.model";
import {Goods} from "./cinema/goods.model";
import {User} from "./user/user.model";


@Entity()
export class Operation {

    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(type => User)
    @JoinColumn()
    user: User

    @Column()
    date:string

    @Column()
    movie: string

    @Column()
    sessionDate: string

    @OneToMany( type => Ticket, (ticket) => ticket.operation, {cascade: true, eager: true})
    tickets: Ticket[]

    @ManyToMany(type => Goods, {cascade: true, eager: true})
    @JoinTable()
    goods: Goods[]

    @Column()
    price: number
}