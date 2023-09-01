import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserType } from 'src/users/entities/user.type';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'hide-me',
      logging: true,
    });
  }

  async validate(payload: any): Promise<UserType> {
    const { userId, username } = {
      userId: payload.sub,
      username: payload.username,
    };

    const user = await this.userService.findOne(username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
