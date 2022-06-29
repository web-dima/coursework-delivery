import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {LoginDto} from './dto/login.dto';
import {Employee} from "../employee/entities/employee.entity";
import {CreateEmployeeDto} from "../employee/dto/create-employee.dto";
import {EmployeeService} from "../employee/employee.service";
import {compare, hash} from "bcrypt"
import {JwtService} from "@nestjs/jwt";
import {configuration} from "../../config/configuration";
import {RegisterDto} from "./dto/register.dto";
import * as path from "path"

@Injectable()
export class AuthService {
  // @InjectRepository(Employee) private EmployeeRepository: Repository<Employee>,
  constructor(private employeeService: EmployeeService,
              private JwtService: JwtService) {}

  async register(createEmployeeDto: RegisterDto) {

    const candidate = await this.employeeService.findByEmail(createEmployeeDto.email)

    if (candidate) {
      throw new HttpException("пользователь уже сущесвтует в системе", HttpStatus.BAD_REQUEST)
    }

    createEmployeeDto.password = await hash(createEmployeeDto.password, 5)
    const user = await this.employeeService.create(createEmployeeDto)
    console.log(user)
    const token = this.createToken(user)

    return {
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
      token
    }
  }

  async login(createEmployeeDto: LoginDto) {

    const user = await this.employeeService.findByEmail(createEmployeeDto.email)

    if (!user) {
      throw new HttpException("пользователя с такой почтой не существует в системе", HttpStatus.BAD_REQUEST)
    }

    if (!await compare(createEmployeeDto.password, user.password)) {
      throw new HttpException("неверный пароль", HttpStatus.BAD_REQUEST)
    }

    const token = this.createToken(user)

    return {
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
      token
    }
  }

  test(user: Employee) {
    console.log(path.join(__dirname))
  }

  private createToken(user: Employee) {

    return this.JwtService.sign({id: user.id.toString()})
  }
}
