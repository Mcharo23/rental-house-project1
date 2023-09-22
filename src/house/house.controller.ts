import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HouseService } from './house.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { multerOptions } from './config';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { join } from 'path';
import { readdirSync } from 'fs';

@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Post('/upload-house-images/')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('file', null, multerOptions))
  async createHouse(
    @UploadedFiles() file: Array<Express.Multer.File>,
  ): Promise<string[]> {
    const imageUrls = await file.map((file) => file.filename);
    return imageUrls;
  }

  @Get('/images/:imageName')
  async getImage(@Param('imageName') imageName: string, @Res() res: Response) {
    const imagePath = join(__dirname, '..', '..', 'images', imageName); // Adjust the path accordingly

    // Use express's res.sendFile method to send the image file
    res.sendFile(imagePath);
  }

  @Get('/images')
  async getAllImages(@Res() res: Response) {
    const imageDirectory = './images'; // Adjust the directory path accordingly
    const imageFiles = readdirSync(imageDirectory);

    // Send the list of image filenames as a JSON response
    res.json(imageFiles);
  }
}
