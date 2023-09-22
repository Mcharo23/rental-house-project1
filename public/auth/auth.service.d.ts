import { UsersService } from 'src/users/users.service';
import { LoginResponse } from './dto/login.response';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.schema';
import { UserType } from 'src/users/entities/user.type';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<UserType>;
    login(user: User): Promise<LoginResponse>;
}
