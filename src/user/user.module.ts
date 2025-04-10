import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entites/UserEntity';
import { Student } from 'src/entites/StudentEntity';
import { Instructor } from 'src/entites/InstructorEntity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Student,Instructor])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
