import {IsString, MinLength, MaxLength, IsEmail} from 'class-validator';
import { Column } from 'typeorm';

export class ProductDto{
    @Column({unique: true})
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;
}