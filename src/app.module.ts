import { Logger, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { HouseModule } from './house/house.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/test1'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      // formatError: (error: GraphQLError): GraphQLFormattedError => {
      //   const formattedError: GraphQLFormattedError = {
      //     message: error.extensions.originalError as string,
      //   };
      //   return formattedError;
      // },
    }),
    UsersModule,
    AuthModule,
    HouseModule,
  ],
})
export class AppModule {}
