import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDto } from 'src/dtos/create-user-dto';
import { User } from 'src/entites/UserEntity';
import { hashPassword, validHash } from 'src/util/hash.util';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserService{

    constructor(
       
        @InjectRepository(User)
        private userRepo:Repository<User>
    ){}

    async createUser(user:createUserDto):Promise<User>{
        let checkEmail = await this.userRepo.findOneBy({email:user?.email});
        if(checkEmail){
            throw new ConflictException("Email already Exists");
        }
        let  createdUser = this.userRepo.create(user);
        const hashedpassword = await hashPassword(createdUser.password);
        let  hasedUser   = {
            ...createdUser,
            password:hashedpassword
        }

        const savedUser   = await this.userRepo.save(hasedUser);
        return savedUser;
    }

    async getUserByEmail(email:string):Promise<User>{
        let userInfo = await this.userRepo.findOneBy({email:email});
        if(!userInfo){
            throw new NotFoundException("Email id not Found");
        }
        return  userInfo;
    }

    async getUserById(userId:number):Promise<User>{
        let UserInfo = await this.userRepo.findOneBy({id:userId});
        if(!UserInfo){
            throw new NotFoundException("User id not Found");
        }
        return new User(UserInfo);
    }

    async updateUser(userId:number,hashedrefreshToken:string):Promise<UpdateResult>{
        let userInfo = await this.userRepo.findOneBy({id:userId});
        if(!userInfo){
            throw new NotFoundException("user id not Found");
        }
       const updatedUserInfo =  await this.userRepo.update({id:userId},{refreshToken:hashedrefreshToken});
       return updatedUserInfo;
    }
}