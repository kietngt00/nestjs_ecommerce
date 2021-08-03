import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService){}

    @Get('/')
    getAll(){
        return this.productService.getAll()
    }

    @Get('/:id')
    getById(@Param() id: string){
        return this.productService.getById(id);
    }


    ///////////////////////////////////////////////////////////////
    // Need login, admin role for below routes
    ///////////////////////////////////////////////////////////////
    @Post()
    createProduct(@Body() productDto: ProductDto):Promise<Product>{
        return this.productService.createProduct(productDto)
    }

    @Patch('/:id')
    updateProduct(@Param() id:string, @Body() productDto: ProductDto){
        return this.productService.updateProduct(id, productDto)
    }

    @Delete('/:id')
    deleteProduct(@Param() id:string){
        return this.productService.deleteProduct(id);
    }

}
