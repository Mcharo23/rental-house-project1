import { Strategy } from 'passport-jwt';
import { UserType } from 'src/users/entities/user.type';
import { UsersService } from 'src/users/users.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    constructor(userService: UsersService);
    validate(payload: any): Promise<UserType>;
}
export {};
