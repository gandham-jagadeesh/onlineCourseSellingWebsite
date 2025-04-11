import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createUserDto } from 'src/dtos/create-user-dto';
import { User } from 'src/entites/UserEntity';
import { hashPassword } from 'src/util/hash.util';
import { Repository } from 'typeorm';

@Injectable()
export class UserService{

    constructor(
       
        @InjectRepository(User)
        private userRepo:Repository<User>
    ){}

    async createUser(user:createUserDto):Promise<User>{
        let checkEmail = await this.userRepo.findOneBy({email:user.email});
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
}