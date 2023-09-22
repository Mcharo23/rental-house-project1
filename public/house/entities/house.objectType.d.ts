import { Types } from 'mongoose';
import { ContractType } from 'src/contract/entities/contract.objectType';
import { UserType } from 'src/users/entities/user.type';
export declare class HouseType {
    _id: Types.ObjectId;
    name: string;
    Region: string;
    District: string;
    Ward: string;
    price: number;
    Description: string;
    user: UserType;
    status: string;
    imgUrl: string[];
}
export declare class MyHouseType {
    _id: Types.ObjectId;
    name: string;
    Region: string;
    District: string;
    Ward: string;
    price: number;
    Description: string;
    contract: ContractType[];
    status: string;
    imgUrl: string[];
}
