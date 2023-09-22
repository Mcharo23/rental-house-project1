/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UsersService } from './users.service';
import { UserType } from './entities/user.type';
import { CreateUserInput } from './dto/create-user.input';
import { UpdatePasswordInput } from './dto/update-user-password.input';
import { UpdateUserInput } from './dto/update-user.input';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(createUserInput: CreateUserInput): Promise<import("mongoose").Document<unknown, {}, import("./entities/user.schema").User> & import("./entities/user.schema").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findAll(context: any): Promise<UserType[]>;
    findOne(username: string): Promise<UserType>;
    updatePassword(updatePasswordInput: UpdatePasswordInput, context: any): Promise<string>;
    update(updateUserInput: UpdateUserInput, context: any): Promise<string>;
    removeUser(id: number): string;
}
