import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { ObjectId } from "mongodb";
import { Document, SchemaType } from "mongoose";
import { Role } from "src/user/role.enum";
import { Product } from "src/product/product.schema";

export type UserDocument = User & Document

@Schema()
export class User{
    @Prop()
    id: string;

    @Prop()
    email: string;

    @Prop({unique: true})
    username: string;

    @Prop()
    password: string;

    @Prop()
    roles: Role[];

    @Prop()
    cart: Product[]

    @Prop()
    order: Product[]
}

export const UserSchema = SchemaFactory.createForClass(User);