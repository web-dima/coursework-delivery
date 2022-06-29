// import {OmitType, PartialType} from '@nestjs/mapped-types';
// import { CreateProductDto } from './create-product.dto';

// export class UpdateProductDto extends OmitType(CreateProductDto, ["restaurant", "title", "price", "ingredients"]) {}


import {IsNotEmpty, IsOptional, IsString} from "class-validator";
// import {Restaurant} from "../../restaurants/entities/restaurant.entity";

export class UpdateProductDto {
    // @IsString()
    // @IsNotEmpty()
    // restaurant: number

    @IsString()
    @IsOptional()
    title?: string

    @IsString()
    @IsOptional()
    price?: number

    @IsString()
    @IsOptional()
    ingredients?: string
}
