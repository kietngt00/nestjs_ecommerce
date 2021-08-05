import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.schema';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>
    ){}

    async getAll():Promise<Product[]>{
        return this.productModel.find().exec()
    }

    async getById(id:string){
        const product = await this.productModel.findOne({id}).exec();
        if(!product)
            throw new NotFoundException(`Could not found a product`);
        return product;
    }

    async createProduct(productDto: ProductDto):Promise<Product>{
        const {name, description, price} = productDto
        try {
            const product = new this.productModel({id:uuid(), name, description, price});          
            return product.save();
        } catch (error) {
            throw new ConflictException('Username already exits !');
        }
    }

    async updateProduct(id:string, productDto:ProductDto):Promise<string>{
        const product = await this.productModel.findOne({id}).exec();
        if(!product)
            throw new NotFoundException(`Could not found a product`);

        const {name, description, price} = productDto;
        if(name)
            product.name = name;
        if(description)
            product.description = description;
        if(price)
            product.price = price;
        await product.save()
        return "Successfully update!"
    }

    async deleteProduct(id:string):Promise<string>{
        const result = await this.productModel.deleteOne({id}).exec()
        if(!result.deletedCount)
            throw new NotFoundException(`Could not found a product with id ${id}`);
        return "Sucessfully delete!"
    }
}
