import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./CourseEntity";
import { Lesson } from "./Lesson.Entity";


@Entity()
export class Section{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:false})
    title:string;
 
    @ManyToOne(()=>Course,course=>course.sections)
    course:Course


    @OneToMany(()=>Lesson,lesson=>lesson.section)
    lessons:Lesson[];
}