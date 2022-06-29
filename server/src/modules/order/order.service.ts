import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateOrderDto} from './dto/create-order.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Order, OrderStatusEnum} from "./entities/order.entity";
import {Repository} from "typeorm";
import {Product} from "../products/entities/product.entity";
import {MailService} from "../mail/mail.service";
import {ChangeStatusDto, ChangeStatusToOpenDto} from "./dto/changeStatus.dto";
import {Employee} from "../employee/entities/employee.entity";
import {DeleteOrderDto} from "./dto/DeleteOrder.dto";

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private orderRepository: Repository<Order>,
              @InjectRepository(Product) private productRepository: Repository<Product>,
              private mailService: MailService) {}

  async create(createOrderDto: CreateOrderDto) {
    const newOrder = new Order()
    newOrder.email = createOrderDto.email
    newOrder.address = createOrderDto.address
    newOrder.name = createOrderDto.name
    newOrder.price = createOrderDto.price
    newOrder.paymentType = createOrderDto.paymentType
    const productInOrder = await this.productRepository.createQueryBuilder("product")
        .where("product.id IN (:...ids)", {ids: [createOrderDto.productsIds]})
        .getMany()


    newOrder.products = productInOrder

    // const productInOrder = await this.orderRepository.
    const order = await this.orderRepository.save(newOrder)
    await this.mailService.sendInfoAboutOrder(order)
    return order
  }

  async changeStatusToOpen(changeDto: ChangeStatusToOpenDto) {
    const order = await this.orderRepository.findOne({where: {id: changeDto.orderId}})
    if (!order) {
      throw new HttpException("такого заказа не существует", HttpStatus.BAD_REQUEST)
    }
    if (order.status !== OrderStatusEnum.inProgress) {
      throw new HttpException("заказ уже открыт", HttpStatus.BAD_REQUEST)
    }

    order.status = OrderStatusEnum.open

    await this.orderRepository.save(order)

    return order.status
  }

  async changeStatus(changeDto: ChangeStatusDto, deliveryman: Employee) {
    const order = await this.orderRepository.findOne({where: {id: changeDto.orderId}})
    if (!order) {
      throw new HttpException("такого заказа не существует", HttpStatus.BAD_REQUEST)
    }

    if (order.status === OrderStatusEnum.inProgress || order.status === OrderStatusEnum.delivered) {
      throw new HttpException("заказ еще не открыт или уже доставлен", HttpStatus.INTERNAL_SERVER_ERROR)
    }


    const oldStatus = order.status

    order.status = changeDto.status

    let kostylPotomyChoYaZaebalsa = false

    switch (order.status) {
      case OrderStatusEnum.inProgress: {
        order.status = oldStatus
        throw new HttpException("невозможно", HttpStatus.BAD_REQUEST)
      }
      case OrderStatusEnum.open: {
        order.status = oldStatus
        throw new HttpException("невозможно", HttpStatus.BAD_REQUEST)
      }
      case OrderStatusEnum.take: {
        console.log(order)
        order.deliveryman = deliveryman
        await this.mailService.changeOrderStatus(order)
        break;
      }
      case OrderStatusEnum.delivered: {
        if (oldStatus !== OrderStatusEnum.take) {
          throw new HttpException("невозможно", HttpStatus.BAD_REQUEST)
        }
        await this.mailService.thx(order)
        kostylPotomyChoYaZaebalsa = true
        break;
      }
    }



    if (kostylPotomyChoYaZaebalsa) {
      return await this.orderRepository
          .createQueryBuilder()
          .delete()
          .from(Order)
          .where("id = :id", { id: order.id })
          .execute();
    }

    await this.orderRepository.save(order)

    return order.status
  }

  async getAllOpenOrders() {
    return await this.orderRepository.find({where: {status: OrderStatusEnum.open}, relations: ["products"]})
  }

  async getOrdersBySingleShnir(shnir: Employee) {
    return await this.orderRepository.find({where: {status: OrderStatusEnum.take, deliveryman: shnir}, relations: ["products"]})
  }

  async findAll() {
    return await this.orderRepository.find()
  }

  async findOne(id: number) {
    return await this.orderRepository.find({where: {id},relations:["products"]});
  }

  async remove(id: number, {reason}: DeleteOrderDto) {
    console.log(id, reason)
    const order = await this.orderRepository.findOne({where: {id}})
    console.log(order)
    if (order.status !== OrderStatusEnum.inProgress) {
      throw new HttpException("нельзя удалить заказ у которого статус отличается от 'в обработке'", HttpStatus.BAD_REQUEST)
    }

    // const deletedOrder = await this.orderRepository.createQueryBuilder()
    //     .delete()
    //     .from(Order)
    //     .where("id = :id", { id: order.id })
    //     .execute();
    // if (!deletedOrder.affected) {
    //   throw new HttpException("ошибка при удалении заказа",HttpStatus.INTERNAL_SERVER_ERROR)
    // }
    // await this.mailService.deleteOrder(order, reason)
  }
}
