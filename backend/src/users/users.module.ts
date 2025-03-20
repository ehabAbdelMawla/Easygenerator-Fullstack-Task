import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './repositories/users.repository';
import { User, UserSchema } from './schemas/users.schema';
import { UsersController } from './users.controller';


@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers: [UserRepository],
    controllers:[UsersController],
    exports: [UserRepository]
})
export class UsersModule { }
