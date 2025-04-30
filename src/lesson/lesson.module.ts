import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from 'src/entites/Lesson.Entity';
import { SectionModule } from 'src/section/section.module';
import { S3Service } from 'src/s3/s3.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[TypeOrmModule.forFeature([Lesson]),SectionModule],
  controllers: [LessonController],
  providers: [LessonService,S3Service,ConfigService]
})
export class LessonModule {}
