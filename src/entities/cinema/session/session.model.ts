import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Movie} from "../movie/movie.model";
import {Hall} from "./hall/hall.model";
import {TicketTypesModel} from "./ticket.types.model";


@Entity()
export class Session {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    technology: string

    @ManyToOne(() => Movie, {cascade: true})
    @JoinColumn({name: "movie_id"})
    movie: Movie

    @ManyToOne(() => Hall, (hall) => hall.sessions, {cascade: true})
    @JoinColumn({name: "hall_id"})
    hall: Hall

    @Column({name: "start_date_time", type: "timestamp", nullable: true, default: new Date()})
    startDateTime: Date


    @OneToMany(type => TicketTypesModel, tt => tt.session, {cascade: true})
    ticketType: TicketTypesModel[]
}