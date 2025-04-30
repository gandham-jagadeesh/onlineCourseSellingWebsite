import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import {Section} from "./SectionEntity";
import { LessonResource } from "./LessonResourceEntity";

@Entity()
export class Lesson{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({default:0})
    order:number;

    @Column({nullable:false})
    title:string;

    @ManyToOne(()=>Section,section=>section.lessons)
    section:Section;

    @OneToMany(()=>LessonResource,lessonResource=>lessonResource.lesson,{cascade:true})
    resources:LessonResource;

}