import { Module } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseResolver } from './house.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { House, HouseSchema } from './entities/house.schema';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { HouseController } from './house.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: House.name, schema: HouseSchema }]),
    UsersModule,
  ],
  controllers: [HouseController],
  providers: [HouseResolver, HouseService, UsersService],
  exports: [HouseService, MongooseModule],
})
export class HouseModule {}
