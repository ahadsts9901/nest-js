import { IsNotEmpty, IsString } from "class-validator"

export class CreateChatDto {

    @IsString()
    @IsNotEmpty()
    message: string

    @IsString()
    @IsNotEmpty()
    to_id: string

    @IsString()
    @IsNotEmpty()
    from_id: string

}