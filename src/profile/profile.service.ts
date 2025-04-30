import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createProfileDto } from 'src/dtos/create-profile-dto';
import { Profile } from 'src/entites/ProfileEntity';
import { User } from 'src/entites/UserEntity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepo:Repository<Profile>,
        @InjectRepository(User)
        private readonly userRepo:Repository<User>
    ){ }

    async createProfile(userid:number,profile:createProfileDto):Promise<Profile>{
        let  user = await this.userRepo.findOne({where:{id:userid},relations:["profile"]});
        if(!user){
            throw new NotFoundException("user id not Found");
        }
        if(user.profile){
            Object.assign(user.profile,profile);
            const updateUser = await this.userRepo.save(user);
            return updateUser.profile;
        }
        else{
            const createdProfile = this.profileRepo.create(profile);
            const savedProfile   = await this.profileRepo.save(createdProfile);
            user.profile=savedProfile;
            const savedUser = await this.userRepo.save(user);
            return savedUser.profile;
        }
    }
}