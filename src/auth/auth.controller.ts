import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    signUp(@Body()signUpDto: SignUpDto){
        return this.authService.signUp(signUpDto);
    }

    @Post('signin')
    signIn(@Body('username') username: string, @Body('password') password: string){
        return this.authService.signIn(username, password)
    }
}
