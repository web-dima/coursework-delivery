import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Restaurant} from "./entities/restaurant.entity";
import {Repository} from "typeorm";
import {FileService} from "../file/file.service";
import {ProductsService} from "../products/products.service";
import {Employee} from "../employee/entities/employee.entity";

@Injectable()
export class RestaurantsService {

  constructor(@InjectRepository(Restaurant) private RestaurantRepository:Repository<Restaurant>,
              private fileService: FileService,
              private productService: ProductsService) {}

  async create(createRestaurantDto: CreateRestaurantDto, img: Express.Multer.File) {
    console.log(createRestaurantDto)
    console.log(img)
    const fileName = await this.fileService.saveFile(img)
    await this.RestaurantRepository.save({...createRestaurantDto, img: fileName, minimalPrice: 100000})
  }

  async getAllRestaurants() {
    return await this.RestaurantRepository.find()
  }

  async getSingeRestaurant(id: number) {
    return await this.RestaurantRepository.findBy({id})
  }

  async updateRestaurantInfo(id: number, updateRestaurantDto: UpdateRestaurantDto, img?: Express.Multer.File) {
    const rest = await this.RestaurantRepository.findOne({where:{id}})
    if (!rest) {
      throw new HttpException("такого ресторана не существует", HttpStatus.BAD_REQUEST)
    }
    if (img) {
      this.fileService.overwriteFile(img, rest.img)
    }

    const newRest = await this.RestaurantRepository.save({
      ...rest,
      ...updateRestaurantDto
    })
    return {
      success: true,
      restaurant: newRest
    }
  }

  async deleteRestaurant(id: number) {
    const rest = await this.RestaurantRepository.findOne({where: {id}})
    if (!rest) {
      throw new HttpException("такого ресторана не сущесвтует", HttpStatus.BAD_REQUEST)
    }
    await this.productService.deleteAllProductFromRest(rest.id)
    await this.RestaurantRepository.delete({id})

    return {
      success: true
    }
  }

  async refactorPrice(restId: number, repository) {
    const allProducts = await repository.find({
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
    //@ts-ignore
    allProducts[0].restaurant.minimalPrice = Math.min(...priceList)
    //@ts-ignore
    await this.restaurantRepository.save(allProducts[0].restaurant)
  }
}
