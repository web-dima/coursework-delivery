// import {OmitType, PartialType, PickType} from '@nestjs/mapped-types';
// import { CreateRestaurantDto } from './create-restaurant.dto';

// export class UpdateRestaurantDto extends OmitType(CreateRestaurantDto, ["timeDelivered", "specification", "title"]) {}

import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateRestaurantDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    specification?: string;

    // @IsString()
    // @IsNotEmpty()
    // minimalPrice: number;

    @IsString()
    @IsOptional()
    timeDelivered?: number

    // @IsString()
    // @IsNotEmpty()
    // img: string
}
