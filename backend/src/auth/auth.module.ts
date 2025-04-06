import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [UsersModule, JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
            return {
                secret: configService.get<string>('JWT_SECRET'),
            }
        }, inject: [ConfigService],
    })],
    providers: [AuthService, {
        provide:JwtStrategy,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
            return new JwtStrategy(configService.get<string>('JWT_SECRET')!);
        }
    }],
    controllers: [AuthController]
})
export class AuthModule { }
