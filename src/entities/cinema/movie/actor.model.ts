import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Movie} from "./movie.model";


@Entity()
export class Actor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    image: string;

    @ManyToOne(() => Movie, movie => movie.actors)
    movie: Movie;

}