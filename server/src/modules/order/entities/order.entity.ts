import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne} from 'typeorm';
import {Product} from "../../products/entities/product.entity";
import {JoinTable} from "typeorm";
import {Employee} from "../../employee/entities/employee.entity";

export enum PaymentTypeEnum {
    cash = "cash",
    card = "card"
}

export enum OrderStatusEnum {
    inProgress = "в обработке",
    open = "открыт",
    take="взят",
    delivered="доставлен"
}


@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column()
    address: string;

    @Column()
    name: string;

    @Column()
    email: string

    @Column({type: "enum", enum: OrderStatusEnum, default: OrderStatusEnum.inProgress})
    status: OrderStatusEnum

    @Column({type: "enum", enum: PaymentTypeEnum})
    paymentType: PaymentTypeEnum

    @ManyToMany(()=> Product, {
        cascade: true
    })
    @JoinTable({
        name: "order_products",
        joinColumn: { name: "orderId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "productId" }
    })
    products: Product[]

    @ManyToOne(()=> Employee, (employee)=> employee.orders, {
        nullable: true
    })
    deliveryman: Employee
}