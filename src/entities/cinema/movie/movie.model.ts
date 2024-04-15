import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {AdditionalInfo} from "./movie.additional.info.model";
import {Comment} from "./comment.model";
import {Actor} from "./actor.model";


@Entity()
export class Movie {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title: string;

    @Column()
    image: string;

    @Column()
    dateTime: string

    @Column()
    trailerLink: string

    @Column()
    age: number

    @Column({length: 1024})
    plot: string

    @OneToOne(() => AdditionalInfo, { cascade: true })
    @JoinColumn()
    additionalInfo: AdditionalInfo;

    @OneToMany(type => Comment, comment => comment.movie, { cascade: true })
    comments: Comment[];

    @OneToMany(type => Actor, actor => actor.movie, { cascade: true })
    actors: Actor[];
}