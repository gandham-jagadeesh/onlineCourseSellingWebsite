import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { localAuthGuard } from './guards/local.auth.guard';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { User } from 'src/entites/UserEntity';
import { Response } from 'express';
import { jwtAuthGuard } from './guards/jwt.auth.guard';
import { jwtRefresh } from './guards/jwt-refresh.auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}


    @Post('/login')
    @UseGuards(localAuthGuard)
    async login(@CurrentUser() user:User,@Res({passthrough:true}) res:Response){  
    return await this.authService.login(user,res); 
}


    @Post('/refreshtoken')
    @UseGuards(jwtRefresh) 
    async refreshtoken(@CurrentUser() user:User,@Res({passthrough:true}) res:Response){
        return await this.authService.login(user,res);
    }
}
