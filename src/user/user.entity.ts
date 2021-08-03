import { Product } from "src/product/product.entity";
import { Column, Entity, ObjectIdColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @ObjectIdColumn()
    _id: string;

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column()
    isAdmin: boolean;

    @Column()
    cart: Product[]

    @Column()
    order: Product[]


}