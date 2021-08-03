import {Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GetName } from './get-user.decorator';
import { UserService } from './user.service';

// Need AuthGuard: sign in

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/cart') // get cart list
  getCart(@GetName() username:string) {
      this.userService.getCart(username);
  }

  @Get('/order') // get order list
  getOrder(@GetName() username:string) {
      return this.userService.getOrder(username);
  }

  // @Post('/cart') // insert a product into cart
  // postCart(@GetName() username:string, prodId: string) {
  //     return this.userService.postCart(username, prodId);
  // }

  @Delete('/cart/:id') // delete a product from cart
  removeProduct(@GetName() username:string, @Param() prodId: string){
      return this.userService.removeProduct(username, prodId)
  }

  @Post('/order') // order a product
  postOrder(@GetName() username:string, prodId: string) {
    return this.userService.postOrder(username, prodId);
  }
}
