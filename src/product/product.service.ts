import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from './dto/product.dto';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import { v4 as uuid} from 'uuid';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: ProductRepository
    ){}

    getAll(){
        return this.productRepository.getAll()
    }

    async getById(ID:string){
        const product = await this.productRepository.findOne(ID);
        if(!product)
            throw new NotFoundException(`Could not found a product`);
        return product;
    }

    async createProduct(productDto: ProductDto):Promise<Product>{
        const {name, description, price} = productDto;
        const id = uuid()
        const product = this.productRepository.create({ID:id,name,description,price});
        await this.productRepository.save(product)
        return product;
    }

    async updateProduct(id:string, productDto:ProductDto){
        return this.productRepository.updateProduct(id,productDto)
    }

    async deleteProduct(id:string){
        const result = await this.productRepository.delete(id);
        if(!result.affected)
            throw new NotFoundException(`Could not found a task with id ${id}`);
        return;
    }
}
