import {Module} from '@nestjs/common';
import {OrderService} from './order.service';
import {OrderController} from './order.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Order} from "./entities/order.entity";
import {Product} from "../products/entities/product.entity";
import {Employee} from "../employee/entities/employee.entity";
import {JwtModule} from "@nestjs/jwt";
import {EmployeeService} from "../employee/employee.service";
import {MailModule} from "../mail/mail.module";

@Module({
    imports: [TypeOrmModule.forFeature([Order, Product, Employee]), JwtModule.register({
        secret: "why_you_read_this_if_you_interesting_i_spent_a_lot_of_time_for_this_shit",
        signOptions: {
            expiresIn: "30d"
        }
    }),MailModule],
    controllers: [OrderController],
    providers: [OrderService, EmployeeService]
})
export class OrderModule {
}



