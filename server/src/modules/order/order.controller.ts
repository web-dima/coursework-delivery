import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {OrderService} from './order.service';
import {CreateOrderDto} from './dto/create-order.dto';
import {RoleGuard} from "../../guards/role.guard";
import {Employee, EmployeeRoles} from "../employee/entities/employee.entity";
import {ChangeStatusDto, ChangeStatusToOpenDto} from "./dto/changeStatus.dto";
import {User} from "../../decorators/user.decorator";
import {DeleteOrderDto} from "./dto/DeleteOrder.dto";

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post("create")
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  @Patch("status/open")
  @UseGuards(RoleGuard(EmployeeRoles.admin))
  async changeStatusToOpen(@Body() changeStatusToOpenDto: ChangeStatusToOpenDto) {
    return await this.orderService.changeStatusToOpen(changeStatusToOpenDto);
  }

  @Patch("status")
  @UseGuards(RoleGuard(EmployeeRoles.shnir))
  async changeStatus(@Body() changeStatusDto: ChangeStatusDto, @User() deliveryman) {
    return await this.orderService.changeStatus(changeStatusDto, deliveryman);
  }

  @Get()
  async findAll() {
   return await this.orderService.findAll();
  }
  @Get("open")
  @UseGuards(RoleGuard(EmployeeRoles.shnir))
  async getAllOpenOrders() {
     return await this.orderService.getAllOpenOrders();
  }

  @Get("delivery")
  @UseGuards(RoleGuard(EmployeeRoles.shnir))
  async hz(@User() shnir: Employee) {
    return await this.orderService.getOrdersBySingleShnir(shnir);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Delete(':id')
  @UseGuards(RoleGuard(EmployeeRoles.admin))
  remove(@Param('id') id: string, @Body() dto: DeleteOrderDto) {
    return this.orderService.remove(+id, dto);
  }
}
