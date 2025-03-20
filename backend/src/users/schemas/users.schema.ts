import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { HydratedDocument } from 'mongoose';
import { MINIMUM_USER_NAME_LENGHT, MINIMUM_USER_PASSWORD_LENGHT } from "src/common/constants";


@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, minlength:MINIMUM_USER_NAME_LENGHT  })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true,minlength:MINIMUM_USER_PASSWORD_LENGHT  })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;