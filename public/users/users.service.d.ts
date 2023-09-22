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
/// <reference types="mongoose/types/inferschematype" />
import { CreateUserInput } from './dto/create-user.input';
import { UpdatePasswordInput } from './dto/update-user-password.input';
import { User } from './entities/user.schema';
import { Model, Types } from 'mongoose';
import { UserType } from './entities/user.type';
import { UpdateUserInput } from './dto/update-user.input';
export declare class UsersService {
    private readonly userModel;
    private readonly logger;
    constructor(userModel: Model<User>);
    create(createUserInput: CreateUserInput): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: Types.ObjectId;
    }>>;
    findAll(): Promise<UserType[]>;
    findOne(username: string): Promise<User>;
    getManyUsers(user: string[]): Promise<UserType[]>;
    updatePassword(updatePasswordInput: UpdatePasswordInput, user: User): Promise<string>;
    update(updateUserInput: UpdateUserInput, user: User): Promise<string>;
    remove(id: number): string;
    hashPassword(password: string, salt: string): Promise<string>;
    generateSalt(): Promise<string>;
}
