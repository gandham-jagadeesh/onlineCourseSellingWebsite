import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable } from "@nestjs/common";


@Injectable()
export class localStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService:AuthService){
        super({
            usernameField:'email'
        })
    }

    validate(email:string,password:string){
        // console.log("executing local strategy");
        // console.log(email,password);
        const user =  this.authService.validateUser(email,password);
       return user;
    }
}