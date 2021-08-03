import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, ObjectIdColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{
    @ObjectIdColumn()
    _id: string;

    @PrimaryColumn()
    ID: string;

    @Column({unique: true})
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;
}