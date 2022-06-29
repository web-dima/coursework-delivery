import {IsEnum, IsInt, IsNotEmpty} from "class-validator";
import {OrderStatusEnum} from "../entities/order.entity";

export class ChangeStatusToOpenDto {
    @IsInt()
    @IsNotEmpty()
    orderId: number
}

export class ChangeStatusDto {
    @IsInt()
    @IsNotEmpty()
    orderId: number

    @IsEnum(OrderStatusEnum)
    @IsNotEmpty()
    status: OrderStatusEnum
}