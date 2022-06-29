import {IsNotEmpty, IsString} from "class-validator";
import {Restaurant} from "../../restaurants/entities/restaurant.entity";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    restaurant: number | Restaurant

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    price: number

    @IsString()
    @IsNotEmpty()
    ingredients : string
}
