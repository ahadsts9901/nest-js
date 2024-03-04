import { IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    firstName: string
    
    @IsString()
    @IsNotEmpty()
    lastName: string
    
    @IsString()
    @IsNotEmpty()
    email: string
    
    @IsString()
    @IsNotEmpty()
    password: string
}