import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "./entities/product.entity";
import {Employee} from "../employee/entities/employee.entity";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {EmployeeService} from "../employee/employee.service";
import {FileService} from "../file/file.service";
import {FileModule} from "../file/file.module";
import {RestaurantsService} from "../restaurants/restaurants.service";
import {RestaurantsModule} from "../restaurants/restaurants.module";
import {Restaurant} from "../restaurants/entities/restaurant.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Employee, Restaurant]),
    JwtModule.register({
      secret: "why_you_read_this_if_you_interesting_i_spent_a_lot_of_time_for_this_shit",
      signOptions: {
        expiresIn: "30d"
      }
    }),
    FileModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService, EmployeeService]
})
export class ProductsModule {}
