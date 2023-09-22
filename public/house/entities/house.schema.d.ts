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
import { Document, Types } from 'mongoose';
import { User } from 'src/users/entities/user.schema';
import { Contract } from 'src/contract/entities/contract.schema';
export declare class House extends Document {
    _id: Types.ObjectId;
    name: string;
    Region: string;
    District: string;
    Ward: string;
    price: number;
    Description: string;
    status: string;
    user: User;
    contract?: Contract[];
    imgUrl: string[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const HouseSchema: import("mongoose").Schema<House, import("mongoose").Model<House, any, any, any, Document<unknown, any, House> & House & Required<{
    _id: Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, House, Document<unknown, {}, House> & House & Required<{
    _id: Types.ObjectId;
}>>;
