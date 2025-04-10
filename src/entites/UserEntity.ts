import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./ProfileEntity";
import { Student } from "./StudentEntity";
import { Instructor } from "./InstructorEntity";



@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id:number;


    @Column({nullable:false,unique:true})
    password:string;

    @OneToOne(()=>Profile,profile=>profile.user,{nullable:false})
    @JoinColumn()
    profile:Profile;

    @OneToOne(()=>Student,student=>student.user)
    student:Student;

    @OneToOne(()=>Instructor,Instructor=>Instructor.user)
    instructor:Instructor;

}