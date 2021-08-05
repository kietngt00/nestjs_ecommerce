import {Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/admin.guard';
import { GetUser } from './get-user.decorator';
import { UserService } from './user.service';

// Need AuthGuard: sign in
@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/cart')
  getCart(@GetUser() user) {
    const {username} = user;
    return this.userService.getCart(username);
  }

  @Get('/order')
  getOrder(@GetUser() user) {
    const {username} = user;
    return this.userService.getOrder(username);
  }

  @Post('/cart')
  postCart(@GetUser() user, @Body('id') prodId: string) {
    const {username} = user;
    return this.userService.postCart(username, prodId);
  }

  @Delete('/cart/:id')
  removeProduct(@GetUser() user, @Param('id') prodId: string){
    const {username} = user;
    return this.userService.removeProduct(username, prodId)
  }

  @Post('/order')
  postOrder(@GetUser() user, @Body('id') prodId: string) {
    const {username} = user;
    return this.userService.postOrder(username, prodId);
  }

  @UseGuards(AdminGuard)
  @Get('/admins')
  getAdmins(){
    return this.userService.getAdmins();
  }

  @UseGuards(AdminGuard)
  @Get('/')
  getAllUsers(){
    return this.userService.getAllUsers();
  }

  @UseGuards(AdminGuard)
  @Get('/:username')
  getUser(@Param('username') name:string){
    return this.userService.getUser(name);
  }

  @UseGuards(AdminGuard)
  @Delete('/:id')
  deleteUser(@Param('id') id: string){
    return this.userService.deleteUser(id);
  }

}
