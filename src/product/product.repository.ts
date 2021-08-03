import { NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { ProductDto } from "./dto/product.dto";
import { Product } from "./product.entity";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product>{
    async getAll(){
        const products = await this.find({})
        if(!products)
            throw new NotFoundException(`Could not found a product`);
        return products;
    }

    async updateProduct(id:string, productDto: ProductDto){
        const {name, description, price} = productDto;
        const product = await this.findOne(id);
        if(!product)
            throw new NotFoundException(`Could not found a product`);
        if(name)
            product.name = name
        if(description)
            product.description = description
        if(price)
            product.price = price
        await this.save(product);
        return product;
    }
}