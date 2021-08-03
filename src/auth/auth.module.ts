import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports:[
        ConfigModule,
        TypeOrmModule.forFeature([UserRepository]),
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) =>({
                secret: configService.get('JWT_SECRET'),
                signOptions:{
                    expiresIn: 3600
                }
            })
        })
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
