import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/admin.guard';
import { ProductDto } from './dto/product.dto';
import { Product } from './product.schema'
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService){}

    @Get('/')
    getAll(){
        return this.productService.getAll()
    }

    @Get('/:id')
    getById(@Param('id') id: string){
        return this.productService.getById(id);
    }

    @UseGuards(AuthGuard(),AdminGuard)
    @Post()
    createProduct(@Body() productDto: ProductDto):Promise<Product>{
        return this.productService.createProduct(productDto)
    }

    @UseGuards(AuthGuard(),AdminGuard)
    @Patch('/:id')
    updateProduct(@Param('id') id:string, @Body() productDto: ProductDto){
        return this.productService.updateProduct(id, productDto)
    }

    @UseGuards(AuthGuard(),AdminGuard)
    @Delete('/:id')
    deleteProduct(@Param('id') id:string){
        return this.productService.deleteProduct(id);
    }

}
