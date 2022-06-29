import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Order} from "../../order/entities/order.entity";

export enum EmployeeRoles {
    admin="admin",
    shnir="deliveryman"
}

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    name: string

    @Column({length: "15"})
    phone: string

    @Column({
        type: "enum",
        enum: EmployeeRoles,
        default: EmployeeRoles.shnir
    })
    role: EmployeeRoles

    @OneToMany(()=> Order, (order)=> order.deliveryman, {
        nullable: true
    })
    orders: Order[]
}
