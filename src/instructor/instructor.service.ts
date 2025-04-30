import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Instructor } from 'src/entites/InstructorEntity';
import { User } from 'src/entites/UserEntity';
import { Repository } from 'typeorm';
import { instructorDto } from 'src/dtos/create-instructor-dto';
import { Role } from 'src/util/role.enum.util';

@Injectable()
export class InstructorService {
    constructor(
        @InjectRepository(Instructor)
        private readonly instructorRepo:Repository<Instructor>,
        @InjectRepository(User)
        private readonly userRepo:Repository<User>
    ){}

    async createInstructor(userId:number,instructorDto:instructorDto):Promise<Partial<Instructor>>{
        const user = await this.userRepo.findOne({where:{id:userId},
        relations:["instructor"]
    });
       if(!user){
        throw new NotFoundException("given userId not found");
       }
       if(user?.role === Role.INSTRUCTOR){
        throw new BadRequestException("user is already an instructor"); 
      }
      user.role=Role.INSTRUCTOR;
      await this.userRepo.save(user);
     
      const instructor = this.instructorRepo.create({
        ...instructorDto,
        user:user
      });
      const savedInstructor = await this.instructorRepo.save(instructor);
      return savedInstructor;
    }


}
