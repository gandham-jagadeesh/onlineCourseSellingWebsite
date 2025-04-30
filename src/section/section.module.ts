import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from 'src/entites/SectionEntity';
import { UserModule } from 'src/user/user.module';
import { CourseModule } from 'src/course/course.module';

@Module({
  imports:[TypeOrmModule.forFeature([Section]),UserModule,CourseModule],
  controllers: [SectionController],
  providers: [SectionService],
  exports:[TypeOrmModule]
})
export class SectionModule {}
