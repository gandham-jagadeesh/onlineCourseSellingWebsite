import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Lesson } from "./Lesson.Entity";

enum ResourceType{
    File="file",
    video="video",
    url="url"
}

@Entity()
export class LessonResource{

    @PrimaryGeneratedColumn()
    id:number;    
   
    @ManyToOne(()=>Lesson,Lesson=>Lesson.resources)
    lesson:Lesson;

    @Column({type:"enum",enum:ResourceType,default:ResourceType.url})
    type:ResourceType;

    @Column({})
    description:string;

    @Column({})
    url:string;

}