import { IS_LENGTH, IsAlpha, IsEmail, IsNotEmpty, IsStrongPassword, Length, isEmail } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @Length(3, 20, {message: 'Name must be between 3 and 20 characters'})
    @IsAlpha()
    name: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @Length(8,20, {message: 'Password must be between 8 and 20 characters'})
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;
}