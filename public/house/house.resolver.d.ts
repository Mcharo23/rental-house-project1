import { HouseService } from './house.service';
import { CreateHouseInput } from './dto/create-house.input';
import { UpdateHouseInput } from './dto/update-house.input';
import { UsersService } from 'src/users/users.service';
import { House } from './entities/house.schema';
export declare class HouseResolver {
    private readonly houseService;
    private readonly userService;
    private readonly logger;
    constructor(houseService: HouseService, userService: UsersService);
    createHouse(createHouseInput: CreateHouseInput, context: any): Promise<House>;
    findAll(): Promise<House[]>;
    demoHouses(): Promise<House[]>;
    findMyHouses(context: any): Promise<House[]>;
    findOne(HoiseID: string): Promise<House>;
    updateHouse(context: any, updateHouseInput: UpdateHouseInput): Promise<string>;
    removeHouse(id: number): string;
}
