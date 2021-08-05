import { ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/product/product.schema';
import { Role } from './role.enum';
import { User, UserDocument } from './user.schema';


@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @InjectModel(Product.name) private productModel: Model<ProductDocument>
    ){}

    async getCart(username: string): Promise<Product[]>{
        const user = await this.userModel.findOne({username}).exec();
        if(!user){
            throw new NotFoundException();
        }else{
            return user.cart;
        }
    }

    async getOrder(username: string): Promise<Product[]>{
        const user = await this.userModel.findOne({username}).exec();
        if(!user){
            throw new NotFoundException();
        }else{
            return user.order
        }
    }

    async postCart(username: string, prodId: string):Promise<string>{
        const user = await this.userModel.findOne({username}).exec();
        const prod:Product = await this.productModel.findOne({id:prodId}).exec();
        if(!user){
            throw new NotFoundException();
        }
        if(!prod)
            throw new NotFoundException(`Could not found a prodict with id ${prodId} to insert into cart`);
        user.cart.push(prod);
        await user.save();
        return "Successfully add to cart!";
    }

    async removeProduct(username: string, prodId: string):Promise<string>{
        const user = await this.userModel.findOne({username}).exec();
        if(!user){
            throw new NotFoundException();
        }
        const prodInd = user.cart.findIndex((prod)=> prod.id === prodId)
        if(prodInd == -1)
            throw new NotFoundException(`Could not find a product with id ${prodId} in the cart`);
        user.cart = user.cart.slice(prodInd,1);
        await user.save()
        return "Successfully remove the product from the cart!"
    }

    async postOrder(username: string, prodId: string):Promise<string>{
        const user = await this.userModel.findOne({username}).exec();
        if(!user){
            throw new NotFoundException();
        }

        const prodInd = user.cart.findIndex((prod)=> prod.id === prodId)
        console.log(prodInd)
        if(prodInd == -1)
            throw new NotFoundException(`Could not find a product with id ${prodId} in the cart`);

        user.order.push(user.cart[prodInd]);
        user.cart = user.cart.splice(prodInd,1);
        await user.save();
        return "Successfully order the product!"
    }

    async getAdmins():Promise<User[]>{
        const adRole = [Role.USER, Role.ADMIN];
        const admins = await this.userModel.find({roles:adRole}).exec();
        if(!admins)
            throw new NotFoundException();
        return admins;
    }

    async getAllUsers(){
        const users = await this.userModel.find().exec();
        const result = users.map(user => {
            let {username, cart, order} = user
            return {username,cart,order}
        })
    }

    async getUser(name: string){
        return await this.userModel.findOne({username:name}).exec();
    }

    async deleteUser(id: string){
        const user = await this.userModel.findOne({id}).exec();
        if(user.roles[1] == Role.ADMIN)
            throw new ConflictException('Can not delete an admin');
        const result = await this.userModel.deleteOne({id}).exec()
        if(!result.deletedCount)
            throw new NotFoundException(`Could not found an user with id ${id}`);
        return "Sucessfully delete the user!"
    }


}
