import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Instructor } from "./InstructorEntity";
import { Section } from "./SectionEntity";
import { Student } from "./StudentEntity";


@Entity()
export class Course{

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToMany(()=>Instructor,instructor=>instructor.courses)
    instructors:Instructor[]

    @Column()
    title:string;


    @Column()
    description:string;

    
    @Column()
    image:string;

    @OneToMany(()=>Section,section=>section.course)
    sections:Section[];

    @ManyToMany(()=>Student,student=>student.courses)
    students:Student;

    @CreateDateColumn({update:false})
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date
}


//future scope -> create a field like name+1  joshcourse1 joshcourse2 like that 