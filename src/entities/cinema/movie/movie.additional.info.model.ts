import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class AdditionalInfo {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    year: number

    @Column()
    country: string

    @Column()
    genre: string

    @Column()
    producer: string

    @Column()
    scenario: string

    @Column()
    rental: string

    @Column()
    duration: number
}