import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Hall} from "./hall.model";
import {SeatType} from "../../../enums/seat-type.model";
import {Row} from "./row.model";


@Entity()
export class Seat {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    number: number;

    @ManyToOne(() => Row, row => row.seats)
    row: Row

    @Column()
    type: SeatType

}