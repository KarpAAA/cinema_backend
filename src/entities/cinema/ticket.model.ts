import {Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/user.model";
import {Session} from "./session/session.model";
import {Seat} from "./session/hall/seat.model";
import {Operation} from "../opertaion.model";


@Entity()
export class Ticket {

    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => User)
    @JoinColumn({name: "user_id"})
    user: User

    @ManyToOne(() => Session)
    @JoinColumn({name: "session_id"})
    session: Session

    @Column()
    row: number

    @Column()
    seat: number

    @Column()
    price: number

    @ManyToOne(type => Operation, (operation) => operation.tickets)
    operation?: Operation
}