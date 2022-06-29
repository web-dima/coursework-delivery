import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Employee,} from "./entities/employee.entity";



@Injectable()
export class EmployeeService {

  constructor(@InjectRepository(Employee) private EmployeeRepository: Repository<Employee>) {
  }

  async create(user: CreateEmployeeDto) {
    // const newUser = await this.EmployeeRepository.create(user)
    return await this.EmployeeRepository.save(user)
  }

  async findByEmail(email: string) {
    return await this.EmployeeRepository.findOne({where: {email}})
  }

  async findById(id: string | number): Promise<Employee> {
    if (typeof id === "string") {
      id = parseInt(id)
    }
    return await this.EmployeeRepository.findOne({where: {id}})
  }


  findAll() {
    return `This action returns all employee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }


}
