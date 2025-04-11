import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./ProfileEntity";
import { Student } from "./StudentEntity";
import { Instructor } from "./InstructorEntity";


enum Role{
    STUDENT="student",
    INSTRUCTOR="instructor"
}

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id:number;


    @Column({nullable:false})
    password:string;

    @Column({nullable:false,unique:true})
    email:string

    @OneToOne(()=>Profile,profile=>profile.user)
    @JoinColumn()
    profile:Profile;
    
    
    
    @Column({type:"enum",enum:Role,default:Role.STUDENT})
    role:Role

    @OneToOne(()=>Student,student=>student.user,)
    @JoinColumn()
    student:Student;

    @OneToOne(()=>Instructor,Instructor=>Instructor.user)
    @JoinColumn()
    instructor:Instructor;

}