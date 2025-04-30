import { Module } from '@nestjs/common';
import { LessonResourceService } from './lesson-resource.service';
import { LessonResourceController } from './lesson-resource.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonResource } from 'src/entites/LessonResourceEntity';

@Module({
  imports:[TypeOrmModule.forFeature([LessonResource])],
  controllers: [LessonResourceController],
  providers: [LessonResourceService],
})
export class LessonResourceModule {}
