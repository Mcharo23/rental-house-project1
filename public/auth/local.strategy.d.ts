import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { UserType } from 'src/users/entities/user.type';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(email: string, password: string): Promise<UserType>;
}
export {};
