import { Module } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseResolver } from './house.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { House, HouseSchema } from './entities/house.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: House.name, schema: HouseSchema }]),
    UsersModule,
  ],
  providers: [HouseResolver, HouseService],
  exports: [HouseService],
})
export class HouseModule {}
