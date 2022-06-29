import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule } from "@nestjs/config";
import {configuration} from "./config/configuration";
import { RestaurantsModule } from './modules/restaurants/restaurants.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import {Restaurant} from "./modules/restaurants/entities/restaurant.entity";
import {Product} from "./modules/products/entities/product.entity";
import { EmployeeModule } from './modules/employee/employee.module';
import {Employee} from "./modules/employee/entities/employee.entity";
import { OrderModule } from './modules/order/order.module';
import {Order} from "./modules/order/entities/order.entity";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {MulterModule} from "@nestjs/platform-express";
import {ServeStaticModule} from "@nestjs/serve-static";
import { FileModule } from './modules/file/file.module';
import * as path from "path"


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/config/.env`,
      load: [configuration]
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: configuration().db.host,
      port: configuration().db.port,
      username: configuration().db.username,
      password: configuration().db.password,
      database: configuration().db.database,
      entities: [Restaurant, Product, Employee, Order],
      synchronize: true,
    }),

    MulterModule.register({
      dest: `${process.cwd()}\\static`
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve( __dirname, 'static'),
    }),
    AuthModule,
    ProductsModule,
    RestaurantsModule,
    EmployeeModule,
    OrderModule,
    FileModule
  ]
})
export class AppModule {}
