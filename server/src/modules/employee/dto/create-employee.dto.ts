import {IsEmail, IsNotEmpty, IsString} from "class-validator"

export class CreateEmployeeDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    password:string

    @IsString()
    @IsNotEmpty()
    name:string

    @IsString()
    @IsNotEmpty()
    phone:string
}
