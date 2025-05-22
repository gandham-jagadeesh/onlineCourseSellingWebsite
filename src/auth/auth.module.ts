import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { jwtStrategy } from './strategies/jwt.strategy';
import { localStrategy } from './strategies/local.strategy';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { jwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports:[JwtModule,PassportModule,UserModule,ConfigModule],
  providers: [AuthService,jwtStrategy,localStrategy,jwtRefreshStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
