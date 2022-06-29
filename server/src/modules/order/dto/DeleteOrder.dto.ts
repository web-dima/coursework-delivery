import {IsNotEmpty, IsString} from "class-validator";

export class DeleteOrderDto {
    @IsNotEmpty()
    @IsString()
    reason: string
}