import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany} from 'typeorm';
import {Product} from "../../products/entities/product.entity";

@Entity()
export class Restaurant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    specification: string;

    @Column()
    minimalPrice: number;

    @Column()
    timeDelivered: number

    @Column({type: "text"})
    img: string

    @OneToMany(()=> Product, (product)=> product.restaurant)
    product: Product[]
}