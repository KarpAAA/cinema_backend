import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Goods {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    photo: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column({nullable: true, default: 0})
    amount?: number;
}