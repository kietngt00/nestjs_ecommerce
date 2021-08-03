import { EntityRepository, Repository } from "typeorm";
import { SignUpDto } from "../auth/dto/signup.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";


@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(signUpDto: SignUpDto): Promise<void>{
        const {email,username,password} = signUpDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({email,username, password:hashedPassword, isAdmin: false, cart:[], order:[]});
        try {
            await this.save(user);
        }catch(error){
            if(error.code === '23505'){ // duplicate username
                throw new ConflictException('Username already exits !')
            }else{
                throw new InternalServerErrorException();
            }
        }

    }
}