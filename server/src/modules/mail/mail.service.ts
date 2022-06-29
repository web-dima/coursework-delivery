import { Injectable } from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer';
import {configuration} from "../../config/configuration";
import {Order, PaymentTypeEnum} from "../order/entities/order.entity";

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendInfoAboutOrder(order: Order){
        // console.log(configuration())
        const productsTitle = order.products.map(product=> "'" + product.title + "'").join(", ")
        const paymentType = order.paymentType === PaymentTypeEnum.card ? "по карте" : "наличкой"
        await this.mailerService.sendMail({
            to: order.email,
            from: configuration().mail.login,
            subject: "к нам поступил ваш заказ",
            template: "createOrder.hbs",
            context: {
                name: order.name,
                price: order.price,
                paymentType,
                products: productsTitle,
                address: order.address
            }
        })
    }

    async changeOrderStatus(order: Order) {
        const paymentType = order.paymentType === PaymentTypeEnum.card ? "по карте" : "наличкой"

        await this.mailerService.sendMail({
            to: order.email,
            from: configuration().mail.login,
            subject: "к нам поступил ваш заказ",
            template: "changeStatus.hbs",
            context: {
                id: order.id,
                name: order.name,
                price: order.price,
                paymentType,
                address: order.address
            }
        })
    }

    async thx({email, name}: Order) {
        await this.mailerService.sendMail({
            to: email,
            from: configuration().mail.login,
            subject: "к нам поступил ваш заказ",
            template: "thx.hbs",
            context: {
                name: name
            }
        })
    }

    async deleteOrder({name, email, id}:Order, reason: string) {
        await this.mailerService.sendMail({
            to: email,
            from: configuration().mail.login,
            subject: "к нам поступил ваш заказ",
            template: "delete.hbs",
            context: {
                name: name,
                reason
            }
        })
    }
}
