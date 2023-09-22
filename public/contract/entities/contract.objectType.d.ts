import { Types } from 'mongoose';
import { HouseType } from 'src/house/entities/house.objectType';
import { UserType } from 'src/users/entities/user.type';
export declare class ContractType {
    _id: Types.ObjectId;
    isCurrent: boolean;
    Duration: number;
    Total_rent: string;
    createdAt: Date;
    Date_of_signing?: Date | null;
    Date_of_contract?: Date | null;
    End_of_contract?: Date | null;
    House: HouseType;
    Tenant: UserType;
}
