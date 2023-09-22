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
import { House } from 'src/house/entities/house.schema';
import { User } from 'src/users/entities/user.schema';
export declare class Contract extends Document {
    _id: Types.ObjectId;
    Tenant: User;
    House: House;
    isCurrent: boolean;
    Duration: number;
    Date_of_signing?: Date | null;
    Date_of_contract?: Date | null;
    End_of_contract?: Date | null;
    Total_rent: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const ContractSchema: import("mongoose").Schema<Contract, import("mongoose").Model<Contract, any, any, any, Document<unknown, any, Contract> & Contract & Required<{
    _id: Types.ObjectId;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Contract, Document<unknown, {}, Contract> & Contract & Required<{
    _id: Types.ObjectId;
}>>;
