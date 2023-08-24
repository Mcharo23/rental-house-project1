import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginResponse } from './dto/login.response';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.schema';
import * as bcrypt from 'bcrypt';
import { UserType } from 'src/users/entities/user.type';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserType> {
    const user = await this.userService.findOne(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<LoginResponse> {
    const result = {
      accessToken: this.jwtService.sign({
        username: user.username,
        sub: user._id,
      }),
      user: user,
    };
    return result;
  }
}
