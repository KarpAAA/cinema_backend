import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Row} from "./row.model";
import {Session} from "../session.model";


@Entity()
export class Hall {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    number: number

    @OneToMany(() => Row, row => row.hall, {cascade: true})
    rows: Row[];

    @ManyToOne(() => Session, (session) => session.hall)
    sessions: Session[];
}

