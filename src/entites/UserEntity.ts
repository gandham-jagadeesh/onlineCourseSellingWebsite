import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./ProfileEntity";
import { Student } from "./StudentEntity";
import { Instructor } from "./InstructorEntity";
import { Exclude } from "class-transformer";


enum Role{
    STUDENT="student",
    INSTRUCTOR="instructor"
}

@Entity()
export class User{
    constructor(partial:Partial<User>){
        Object.assign(this,partial);
    }
    @PrimaryGeneratedColumn()
    id:number;

    @Exclude()
    @Column({nullable:false})
    password:string;

    @Column({nullable:false,unique:true})
    email:string

    @OneToOne(()=>Profile,profile=>profile.user,{eager:true,cascade:true})
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

    @CreateDateColumn({update:false})
    createdAt:Date

    @CreateDateColumn()
    updatedAt:Date
}