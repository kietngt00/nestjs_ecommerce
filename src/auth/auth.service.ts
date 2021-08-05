import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Role } from 'src/user/role.enum';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ){}

    async signUp(signUpDto:SignUpDto): Promise<string>{
        const {email,username,password} = signUpDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        try {
            const user = new this.userModel({id:uuid(),email,username, password:hashedPassword, roles: [Role.USER], cart:[], order:[]});
            await user.save();
            return "Sign Up Successfully!"
        }catch(error){
            if(error.code === '23505'){ // duplicate username
                throw new ConflictException('Username already exits !')
            }else{
                throw new InternalServerErrorException();
            }
        }
    }

    async signIn(username: string, password: string): Promise<string>{
        const user = await this.userModel.findOne({username});
        if(user && (await bcrypt.compare(password,user.password))){
            const roles:Role[] = user.roles;
            const payload = {username, roles};
            const accessToken: string = await this.jwtService.sign(payload);
            return accessToken;
        }else{
            throw new UnauthorizedException('Please check your sign in information!')
        }
    }

}
