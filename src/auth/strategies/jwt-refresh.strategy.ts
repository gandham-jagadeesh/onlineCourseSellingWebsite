import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { TokenPayLoad } from "../token.payload.interface";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { AuthService } from "../auth.service";
import { UserService } from "src/user/user.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class jwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh'){

    constructor(private readonly configService:ConfigService,private readonly authService:AuthService,private readonly userService:UserService){

        super({
            jwtFromRequest:ExtractJwt.fromExtractors([
                (request:Request)=>request?.cookies?.['refresh-token']
            ]),
            secretOrKey:configService.getOrThrow("JWT_REFRESH_TOKEN_SECRET_KEY"),
            passReqToCallback: true
        })
    }
    
    async validate(request:Request,payload:TokenPayLoad) {
        return await this.authService.validateRefreshTokenUser(request?.cookies?.['refresh-token'],payload.id);
    }
 
  
}