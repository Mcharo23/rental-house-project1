/// <reference types="multer" />
import { HouseService } from './house.service';
import { Response } from 'express';
export declare class HouseController {
    private readonly houseService;
    constructor(houseService: HouseService);
    createHouse(file: Array<Express.Multer.File>): Promise<string[]>;
    getImage(imageName: string, res: Response): Promise<void>;
    getAllImages(res: Response): Promise<void>;
}
