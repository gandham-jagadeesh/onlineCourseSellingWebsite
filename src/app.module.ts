import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from './profile/profile.module';
import { SectionModule } from './section/section.module';
import { LessonModule } from './lesson/lesson.module';
import { CourseModule } from './course/course.module';
import { StudentModule } from './student/student.module';
import { InstructorModule } from './instructor/instructor.module';
import { LessonResourceModule } from './lesson-resource/lesson-resource.module';
import { EnrollmentController } from './enrollment/enrollment.controller';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { S3Service } from './s3/s3.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      host:"localhost",
      port:3306,
      type:"mysql",
      username:"root",
      password:"password",
      database:"db",
      synchronize:true,
      autoLoadEntities:true
    }),
    ConfigModule.forRoot(),
    UserModule,
    ProfileModule,
    CourseModule,
    SectionModule,
    LessonModule,
    StudentModule,
    InstructorModule,
    LessonResourceModule,
    EnrollmentModule],
  controllers: [AppController, EnrollmentController],
  providers: [AppService, S3Service]
})
export class AppModule {}
