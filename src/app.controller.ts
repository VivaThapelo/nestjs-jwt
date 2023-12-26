import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { ResponseUserDto } from './dtos/response-user.dto';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/register')
  async register(@Body() body: CreateUserDto): Promise<ResponseUserDto> {
    return this.appService.create(body);
  }

  @Post('/login')
  async login(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Response<string>> {
    try {
      const token = await this.appService.findOne(body);
      response.cookie('jwt', token, { httpOnly: true });
      return response.status(200).json({ message: 'Login Successful' }).send();
    } catch (error) {
      throw error;
    }
  }

  @Get('/user')
  async user(@Req() request: Request) {
    try {
      return await this.appService.cookie(request.cookies['jwt']);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Post('/logout')
  async logout(
    @Res({ passthrough: true }) response: Response,
  ): Promise<Response<string>> {
    response.clearCookie('jwt');
    return response.status(200).json({ message: 'Logout Successful' }).send();
  }
}
