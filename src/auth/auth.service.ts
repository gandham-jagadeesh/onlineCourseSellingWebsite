import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { hashPassword, validHash } from 'src/util/hash.util';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entites/UserEntity';
@Injectable()
export class AuthService {
    constructor(private readonly userService:UserService,private readonly configService:ConfigService,private readonly jwtService:JwtService){}


    async validateUser(email:string,password:string){
        try{
            const user = await this.userService.getUserByEmail(email);
        const isAuthenticated = validHash(password,user.password)
        if(!isAuthenticated){
            throw new UnauthorizedException();
        }
        return user;
        }
        catch(err){
            throw new UnauthorizedException('credeninitals are not valid');
        }
        
    }


    async login(user:User,response:Response){
        const expiresAuthToken = new Date();
            expiresAuthToken.setMinutes(
            expiresAuthToken.getMinutes() +
             parseInt(this.configService.get("JWT_ACCESS_TOKEN_EXPIRATION_M")!
        ));
        
        const expiresRefreshToken = new Date();
        expiresRefreshToken.setMinutes(
            expiresRefreshToken.getMinutes() + parseInt(this.configService.get("JWT_REFRESH_TOKEN_EXPIRATION_M")!)
        );

        console.log(user);
        const authToken =  this.jwtService.sign({id:user.id},{
            secret:this.configService.getOrThrow("JWT_ACCESS_TOKEN_SECRET_KEY"),
            expiresIn:`${this.configService.get("JWT_ACCESS_TOKEN_EXPIRATION_M")}m`
        });

        const refreshToken = this.jwtService.sign({id:user.id},{
            secret:this.configService.getOrThrow("JWT_REFRESH_TOKEN_SECRET_KEY"),
           expiresIn:`${this.configService.get("JWT_REFRESH_TOKEN_EXPIRATION_M")}m`
        });
        const encryptedRefreshToken = await hashPassword(refreshToken);
        const updatedUser = await this.userService.updateUser(user.id,encryptedRefreshToken);
        response.cookie('Authentication',authToken,{
            httpOnly:true,
            secure:false,
            expires: expiresAuthToken
        });
        response.cookie('refresh-token',refreshToken,{
            httpOnly:true,
            secure:false,
            expires: expiresRefreshToken
        });
      return {
        message:"Login sucessfull",
        user:{
            id:user.id,
            email:user.email,
            role:user.role
        }
      }
    }

async validateRefreshTokenUser(refreshToken:string,userid:number){
    try{
        const validUser = await this.userService.getUserById(userid);
        console.log("valid user:",validUser);
        if(!validUser){
            throw new NotFoundException("user id not Found");
        }
        
        const isValidRefreshToken = await validHash(refreshToken,validUser?.refreshToken)
        if(isValidRefreshToken){
            return validUser;
        }
        else{
            throw new UnauthorizedException("credeninitals are wrong");
        }
    }
    catch(err){
        console.log(err);
    }
}

async validateUserById(userid:number){
    const validUser = await this.userService.getUserById(userid);
    if(!validUser){
        throw new NotFoundException("user id not Found");
    }
    return validUser;
}

}


