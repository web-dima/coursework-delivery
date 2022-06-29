import {PaymentTypeEnum} from "../entities/order.entity";
import {IsArray, IsEmail, IsEnum, IsInt, IsNotEmpty, IsString} from "class-validator";

export class CreateOrderDto {
    @IsInt()
    @IsNotEmpty()
    price: number

    @IsString()
    @IsNotEmpty()
    address: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsEnum(PaymentTypeEnum)
    @IsNotEmpty()
    paymentType:PaymentTypeEnum

    @IsArray()
    @IsNotEmpty()
    productsIds: number[]
}
