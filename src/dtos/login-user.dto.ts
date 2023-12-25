import { IsEmail, IsNotEmpty, IsStrongPassword, Length } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
