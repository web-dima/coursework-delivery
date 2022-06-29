import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {RestaurantsService} from './restaurants.service';
import {CreateRestaurantDto} from './dto/create-restaurant.dto';
import {UpdateRestaurantDto} from './dto/update-restaurant.dto';
import {EmployeeRoles} from "../employee/entities/employee.entity";
import {RoleGuard} from "../../guards/role.guard";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post("create")
  @UseGuards(RoleGuard(EmployeeRoles.admin))
  @UseInterceptors(FileInterceptor("img"))
  async create(@Body() createRestaurantDto: CreateRestaurantDto, @UploadedFile() img: Express.Multer.File) {
    return await this.restaurantsService.create(createRestaurantDto, img);
  }

  @Get()
  async getAllRestaurants() {
    return await this.restaurantsService.getAllRestaurants();
  }

  @Get(':id')
  async getSingeRestaurant(@Param('id') id: string) {
    return await this.restaurantsService.getSingeRestaurant(+id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard(EmployeeRoles.admin))
  @UseInterceptors(FileInterceptor("img"))
  async update(@Param('id') id: string,
               @Body() updateRestaurantDto: UpdateRestaurantDto,
               @UploadedFile() img?: Express.Multer.File
               ) {
    return await this.restaurantsService.updateRestaurantInfo(+id, updateRestaurantDto, img);
  }

  @Delete(':id')
  @UseGuards(RoleGuard(EmployeeRoles.admin))
  async deleteRestaurant(@Param('id') id: string) {
    return await this.restaurantsService.deleteRestaurant(+id);
  }
}
