import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {ProductsService} from './products.service';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {RoleGuard} from "../../guards/role.guard";
import {EmployeeRoles} from "../employee/entities/employee.entity";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post("create")
  @UseGuards(RoleGuard(EmployeeRoles.admin))
  @UseInterceptors(FileInterceptor("img"))
  create(@Body() createProductDto: CreateProductDto, @UploadedFile() img: Express.Multer.File) {
    return this.productsService.create(createProductDto, img);
  }

  @Get()
  async findAll() {
    return await this.productsService.getAllProducts();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.getSingleProduct(+id);
  }


  @Patch(':id')
  @UseGuards(RoleGuard(EmployeeRoles.admin))
  @UseInterceptors(FileInterceptor("img"))
  async update(@Param('id') id: string,
               @Body() updateProductDto: UpdateProductDto,
               @UploadedFile() img?: Express.Multer.File) {
    return await this.productsService.update(+id, updateProductDto, img);
  }

  // @Delete(':id')
  // @UseGuards(RoleGuard(EmployeeRoles.admin))
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
}
