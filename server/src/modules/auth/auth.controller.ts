import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {RegisterDto} from "./dto/register.dto";
import {LoginDto} from "./dto/login.dto";
import {User} from "../../decorators/user.decorator";
import {Employee, EmployeeRoles} from "../employee/entities/employee.entity";
import {RoleGuard} from "../../guards/role.guard";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/registration")
  async register(@Body() AuthDto: RegisterDto) {
    return await this.authService.register(AuthDto);
  }

  @Post("/login")
  async login(@Body() AuthDto: LoginDto) {
    return await this.authService.login(AuthDto);
  }

  @Get("/popa")
  @UseGuards(RoleGuard(EmployeeRoles.shnir))
  async test(@User() user: Employee) {
    return this.authService.test(user);
  }

}
