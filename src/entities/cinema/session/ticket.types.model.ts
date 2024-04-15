import {SeatType} from "../../enums/seat-type.model";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Session} from "./session.model";


@Entity()
export class TicketTypesModel {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: SeatType;

    @Column()
    price: number;

    @ManyToOne(type => Session, session => session.ticketType)
    session?: Session
}