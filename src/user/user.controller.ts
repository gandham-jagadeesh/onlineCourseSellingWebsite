import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from 'src/dtos/create-user-dto';
import { User } from 'src/entites/UserEntity';
import { signInUserDto } from 'src/dtos/signin-user-dto';

@Controller('/users')
export class UserController {

    constructor(private readonly userService:UserService){}


    @Post('/register')
    async signUp(@Body() userdto:createUserDto):Promise<User>{
        const createdUser = await this.userService.createUser(userdto);
        return new User(createdUser);
    }

    // @Post("/login")
    // async signIn(@Body() userdto:signInUserDto){
    //     // const response = await this.userService.signIn();
    //     // return "";
    // }
}
