import {IsString, MinLength, MaxLength, IsEmail} from 'class-validator';

export class SignUpDto{
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password: string;
}