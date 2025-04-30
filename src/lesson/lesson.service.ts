import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createLessonDto } from 'src/dtos/create-lesson-dto';
import { Lesson } from 'src/entites/Lesson.Entity';
import { Section } from 'src/entites/SectionEntity';
import { Repository } from 'typeorm';

@Injectable()
export class LessonService {

    constructor(
        @InjectRepository(Lesson)
        private readonly lessonRepo:Repository<Lesson>,
        @InjectRepository(Section)
        private readonly sectionRepo:Repository<Section>
    )
    {}

    createLesson(sectionid:number,lessondto:createLessonDto){
        //here we get is video and may be file or stuff or may be multiple files
        // create a video uploading service and use this service
        
    }





}
