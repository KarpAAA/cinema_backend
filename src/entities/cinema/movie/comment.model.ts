import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Movie} from "./movie.model";


@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    author: string

    @Column({length: 500})
    comment: string

    @Column({type: 'float'})
    rating: number

    @ManyToOne(() => Movie, movie => movie.comments)
    movie: Movie;
}