import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/entites/CourseEntity';
import { Repository } from 'typeorm';
import { CourseDto } from 'src/dtos/create-course-dto';
import { User } from 'src/entites/UserEntity';
import { Role } from 'src/util/role.enum.util';

@Injectable()
export class CourseService {

    constructor(
        @InjectRepository(Course)
        private readonly courseRepo:Repository<Course>,
        @InjectRepository(User)
        private readonly userRepo:Repository<User>
    ){}



    async createCourse(userId:number,courseDto:CourseDto):Promise<Course>{
        const user = await this.userRepo.findOne({where:{id:userId},relations:['instructor']});
        if(!user){
            throw new UnauthorizedException("user not found");
        }
        if(user.role !== Role.INSTRUCTOR){
            throw new UnauthorizedException("you don't have permission to create a course");
        }
        const createdCourse =  this.courseRepo.create({
            ...courseDto,
            instructors:[user.instructor],
        });
        const savedCourse = await this.courseRepo.save(createdCourse);
        return savedCourse;
    }

}