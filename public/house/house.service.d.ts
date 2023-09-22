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
import { CreateHouseInput } from './dto/create-house.input';
import { UpdateHouseInput } from './dto/update-house.input';
import { Model, Types } from 'mongoose';
import { House } from './entities/house.schema';
import { User } from 'src/users/entities/user.schema';
export declare class HouseService {
    private readonly houseModel;
    private readonly userModel;
    private logger;
    constructor(houseModel: Model<House>, userModel: Model<User>);
    create(createHouseInput: CreateHouseInput, user: User): Promise<House>;
    findAll(): Promise<Omit<import("mongoose").Document<unknown, {}, House> & House & Required<{
        _id: Types.ObjectId;
    }>, never>[]>;
    demoHouses(): Promise<Omit<import("mongoose").Document<unknown, {}, House> & House & Required<{
        _id: Types.ObjectId;
    }>, never>[]>;
    findMyHouses(user: User): Promise<House[]>;
    findOne(houseId: Types.ObjectId): Promise<House>;
    update(updateHouseInput: UpdateHouseInput, user: User): Promise<string>;
    remove(id: number): string;
}
