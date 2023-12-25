import { Exclude } from "class-transformer";
import { IsAlpha, IsEmail, IsNotEmpty, IsUUID, Length } from "class-validator";

export class ResponseUserDto {
    @IsNotEmpty()
    @IsUUID()
    id: string
    @IsNotEmpty()
    @Length(3, 20, {message: 'Name must be between 3 and 20 characters'})
    @IsAlpha()
    name: string
    @IsNotEmpty()
    @IsEmail()
    email: string
}