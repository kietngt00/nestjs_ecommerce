import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { ProductRepository } from 'src/product/product.repository';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private productRepository: ProductRepository
    ){}

    async getCart(username: string): Promise<Product[]>{
        const user:User = await this.userRepository.findOne({username});
        if(!user){
            throw new UnauthorizedException();
        }else{
            return user.cart
        }
    }

    async getOrder(username: string): Promise<Product[]>{
        const user:User = await this.userRepository.findOne({username});
        if(!user){
            throw new UnauthorizedException();
        }else{
            return user.order
        }
    }

    async postCart(username: string, prodId: string):Promise<string>{
        const user:User = await this.userRepository.findOne({username});
        const prod:Product = await this.productRepository.findOne({ID:prodId})
        if(!user){
            throw new UnauthorizedException();
        }
        if(!prod)
            throw new NotFoundException(`Could not found a prodict with id ${prodId} to insert into cart`)
        user.cart.push(prod)
        await this.userRepository.save(user)
        return "Successfully add to cart!"
    }

    async removeProduct(username: string, prodId: string){
        const user:User = await this.userRepository.findOne({username});
        if(!user){
            throw new UnauthorizedException();
        }
        const prodInd = user.cart.findIndex((prod)=> prod.ID === prodId)
        if(prodInd == -1)
            throw new NotFoundException(`Could not find a product with id ${prodId} in the cart`);
        user.cart = user.cart.slice(prodInd,1);
        await this.userRepository.save(user)
        return "Successfully remove the product from the cart!"
    }

    async postOrder(username: string, prodId: string):Promise<string>{
        const user:User = await this.userRepository.findOne({username});
        if(!user){
            throw new UnauthorizedException();
        }

        const prodInd = user.cart.findIndex((prod)=> prod.ID === prodId)
        if(prodInd == -1)
            throw new NotFoundException(`Could not find a product with id ${prodId} in the cart`);

        user.order.push(user.cart[prodInd]);
        user.cart = user.cart.slice(prodInd,1);
        await this.userRepository.save(user)
        return "Successfully order the product!"
    }
}
