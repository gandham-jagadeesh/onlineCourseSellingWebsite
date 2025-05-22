import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { TokenPayLoad } from "../token.payload.interface";
import { UserService } from "src/user/user.service";


@Injectable()   
export class jwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService:AuthService,private readonly configService:ConfigService,private readonly userService:UserService){
        
            super({
            jwtFromRequest:ExtractJwt.fromExtractors([(request:Request)=>request.cookies?.Authentication]),
            secretOrKey:configService.getOrThrow("JWT_ACCESS_TOKEN_SECRET_KEY") 
            });
    }

    async validate(payload:TokenPayLoad) {
        
     return await this.authService.validateUserById(payload.id);
    }
}