import {HttpException, HttpStatus, Injectable, UseGuards} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {UpdateProductDto} from './dto/update-product.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Product} from "./entities/product.entity";
import {Repository} from "typeorm";
import {RoleGuard} from "../../guards/role.guard";
import {EmployeeRoles} from "../employee/entities/employee.entity";
import {FileService} from "../file/file.service";
import {Restaurant} from "../restaurants/entities/restaurant.entity";

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>,
              @InjectRepository(Restaurant) private restaurantRepository: Repository<Restaurant>,
              private fileService: FileService) {}

  async create(createProductDto: CreateProductDto, img: Express.Multer.File) {
    createProductDto.restaurant = +createProductDto.restaurant

    const fileName = await this.fileService.saveFile(img)
    //@ts-ignore
    const newProduct =  await this.productRepository.save({...createProductDto, img: fileName})

    await this.refactorPrice(createProductDto.restaurant)

  }

  async getAllProducts() {
    return await this.productRepository.find()
  }

  async getSingleProduct(id: number) {
    return await this.productRepository.findOne({where: {id}})
  }

  async update(id: number, updateProductDto: UpdateProductDto, img: Express.Multer.File) {
    const product = await this.productRepository.findOne({where:{id}, relations: {restaurant: true}})
    // console.log(product.restaurant.id)
    if (!product) {
      throw new HttpException("такого продукта не существует", HttpStatus.BAD_REQUEST)
    }
    if (img) {
      this.fileService.overwriteFile(img, product.img)
    }

    if (updateProductDto.price ?? updateProductDto.price < product.price) {
      console.log("lower")
      //@ts-ignore
      await this.refactorPrice(product.restaurant.id)
    }

    const newProduct = await this.productRepository.save({
      ...product,
      ...updateProductDto
    })
    if (updateProductDto.price ?? updateProductDto.price < product.price) {
      // console.log("lower")
      //@ts-ignore
      await this.refactorPrice(product.restaurant.id)
    }
    return {
      success: true,
      restaurant: newProduct
    }
  }

  async deleteAllProductFromRest(restId: number) {
    const products = await this.productRepository.find({
      relations: {
        restaurant: true,
      },
      where: {
        restaurant: {
          id: restId,
        },
      },
    })
    products.forEach((product=> {
      this.fileService.deleteFile(product.img)
    }))
    // const products = await this.productRepository
    //     .createQueryBuilder("sosa")
    //     .select("product")
    //     .from(Product, "product")
    //     .leftJoinAndSelect("product.restaurant", "restaurant")
    //     .where({restaurant: restId})
    //     .getMany()

    const deletedProducts = await this.productRepository
        .createQueryBuilder("sosaDelete")
        .delete()
        .from(Product)
        .where({restaurant: restId})
        .execute()
    if (!deletedProducts.affected) {
      throw new HttpException("ошибка при удалении продуктов, попробуйте еще раз",HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async refactorPrice(restId: number) {
    const allProducts = await this.productRepository.find({
      relations: {
        restaurant: true,
      },
      where: {
        restaurant: {
          id: restId,
        },
      },
    })

    const priceList = allProducts.map(product=> {
      return product.price
    })
    // console.log(priceList)
    //@ts-ignore
    allProducts[0].restaurant.minimalPrice = Math.min(...priceList)
    // console.log(allProducts)
    //@ts-ignore
    await this.restaurantRepository.save(allProducts[0].restaurant)
  }
}
