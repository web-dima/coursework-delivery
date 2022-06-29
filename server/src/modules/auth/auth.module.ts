import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from "@nestjs/jwt"
import {configuration} from "../../config/configuration";
import {TypeOrmModule} from "@nestjs/typeorm"
import {Employee} from "../employee/entities/employee.entity";
import {EmployeeService} from "../employee/employee.service";


@Module({
  imports: [
      JwtModule.register({
          secret: "why_you_read_this_if_you_interesting_i_spent_a_lot_of_time_for_this_shit",
          signOptions: {
              expiresIn: "30d"
          }
      }),
      TypeOrmModule.forFeature([Employee])
  ],

  controllers: [AuthController],
  providers: [AuthService, EmployeeService],
  exports: [JwtModule]
})
export class AuthModule {}
