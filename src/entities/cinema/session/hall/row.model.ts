import {Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Seat} from "./seat.model";
import {Hall} from "./hall.model";

@Entity()
export class Row {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    number: number;

    @ManyToOne(() => Hall, hall => hall.rows)
    hall: Hall;

    @OneToMany(type => Seat,  seat => seat.row, {cascade: true})
    seats: Seat[];
}