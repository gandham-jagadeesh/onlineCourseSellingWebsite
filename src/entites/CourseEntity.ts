import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Instructor } from "./InstructorEntity";

export class Course{

    @PrimaryGeneratedColumn()
    id:number;

    @OneToMany(()=>Instructor,instructor=>instructor.courses)
    instructors:Instructor[]

    @Column()
    title:string;
    
}