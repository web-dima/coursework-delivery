import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Restaurant} from "./entities/restaurant.entity";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {EmployeeService} from "../employee/employee.service";
import {Employee} from "../employee/entities/employee.entity";
import {FileModule} from "../file/file.module";
import {ProductsService} from "../products/products.service";
import {Product} from "../products/entities/product.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant, Employee, Product]),
    JwtModule.register({
      secret: "why_you_read_this_if_you_interesting_i_spent_a_lot_of_time_for_this_shit",
      signOptions: {
        expiresIn: "30d"
      }
    }),
    FileModule
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, EmployeeService, ProductsService]
})
export class RestaurantsModule {}
