import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sectionDto } from 'src/dtos/create-section-dto';
import { Course } from 'src/entites/CourseEntity';
import { Section } from 'src/entites/SectionEntity';
import { Repository } from 'typeorm';

@Injectable()
export class SectionService {

    constructor(
        @InjectRepository(Section)
        private readonly sectionRepo:Repository<Section>,
        @InjectRepository(Course)
        private readonly CourseRepo:Repository<Course>
    ){}

    createSection(courseid:number,sectiondto:sectionDto){
        //check whether course id exists or not
        //if exists then create if not exists then sends course id not created
        //create a section -> many lessons
        //first how to take data like pdfs and more section can take many lessions like stuff first it create a sectino with title and stuff then may be
        const course = this.CourseRepo.findBy({id:courseid});
        if(!course){
            throw new NotFoundException("course id not found");
        }

        const section =  this.sectionRepo.create(sectiondto);
        const savedSection = this.sectionRepo.save(section);
        return savedSection;
    }
}