import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne} from 'typeorm';
import {Restaurant} from "../../restaurants/entities/restaurant.entity";
import {Order} from "../../order/entities/order.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> Restaurant, (rest) => rest.product, {
        nullable: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    restaurant: Restaurant;

    @Column()
    title: string;

    @Column()
    price: number;

    @Column()
    ingredients : string

    @Column({type: "text"})
    img: string

    @ManyToMany((type) => Order, (order) => order.products)
    orders: Order[];
}