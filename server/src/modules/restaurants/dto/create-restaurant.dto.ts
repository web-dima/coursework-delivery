import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateRestaurantDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    specification: string;

    // @IsString()
    // @IsNotEmpty()
    // minimalPrice: number;

    @IsString()
    @IsNotEmpty()
    timeDelivered: number

    // @IsString()
    // @IsNotEmpty()
    // img: string
}
