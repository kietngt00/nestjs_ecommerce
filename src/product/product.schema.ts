import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProductDocument = Product & Document

@Schema()
export class Product{
    @Prop()
    id: string;

    @Prop({unique: true})
    name: string;

    @Prop()
    description: string;

    @Prop()
    price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product)