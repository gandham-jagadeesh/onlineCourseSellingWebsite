import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from 'src/dtos/create-user-dto';
import { User } from 'src/entites/UserEntity';

@Controller('users')
export class UserController {

    constructor(private readonly userService:UserService){}


    @Post()
    async createUser(@Body() userdto:createUserDto):Promise<any>{
        const createdUser = await this.userService.createUser(userdto);
        return new User(createdUser);
    }

}
