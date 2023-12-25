import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ResponseUserDto } from './dtos/response-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(userCreate: CreateUserDto): Promise<ResponseUserDto> {
    userCreate.password = await bcrypt.hash(userCreate.password, 12);
    const user = await this.userRepository.save(userCreate);
    if (!user) {
      throw new BadRequestException('User already exists.');
    } else {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }
  }

  async findOne(loginUser: LoginUserDto): Promise<string> {
    const user: User | null = await this.userRepository.findOne({
      where: { email: loginUser.email },
    });
    if (!user) {
      throw new BadRequestException('User does not exist.');
    } else if (!(await bcrypt.compare(loginUser.password, user.password))) {
      throw new BadRequestException('Password is incorrect.');
    }
    return await this.jwtService.signAsync({ id: user.id });
  }

  async cookie(cookie: string) {
    const data = await this.jwtService.verifyAsync(cookie);

    if (!data) {
      throw new BadRequestException('Invalid cookie.');
    }
    return data;
  }
}
