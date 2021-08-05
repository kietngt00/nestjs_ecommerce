import {IsString, MinLength, MaxLength, IsEmail} from 'class-validator';
import { Column } from 'typeorm';

export class ProductDto{
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;
}