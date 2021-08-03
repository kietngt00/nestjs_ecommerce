import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from './dto/signup.dto';
import { UserRepository } from '../user/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ){}

    async signUp(signUpDto:SignUpDto): Promise<void>{
        return this.userRepository.createUser(signUpDto);
    }

    async signIn(username: string, password: string): Promise<string>{
        const user = await this.userRepository.findOne({username});
        if(user && (await bcrypt.compare(password,user.password))){
            const isAdmin = user.isAdmin;
            const payload = {username, isAdmin};
            const accessToken: string = await this.jwtService.sign(payload);
            return accessToken;
        }else{
            throw new UnauthorizedException('Please check your sign in information!')
        }
    }

}
