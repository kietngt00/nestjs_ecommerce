import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ProductController } from './product.controller';
import { Product, ProductSchema } from './product.schema';
import { ProductService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{name: Product.name, schema: ProductSchema}]
    ),
    AuthModule
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
