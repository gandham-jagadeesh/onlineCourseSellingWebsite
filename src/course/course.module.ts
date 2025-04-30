import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entites/CourseEntity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([Course]),UserModule],
  controllers: [CourseController],
  providers: [CourseService],
  exports:[TypeOrmModule]
})
export class CourseModule {}
