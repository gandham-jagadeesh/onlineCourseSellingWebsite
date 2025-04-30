import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Profile } from "./ProfileEntity";
import { Student } from "./StudentEntity";
import { Instructor } from "./InstructorEntity";
import { Exclude } from "class-transformer";
import { Role } from "src/util/role.enum.util";


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
    @Exclude()
    role:Role

    @OneToOne(()=>Instructor,instructor=>instructor.user)
    instructor:Instructor;

    
    @OneToOne(()=>Student,student=>student.user)
    student:Student;

    @CreateDateColumn({update:false})
    createdAt:Date

    @UpdateDateColumn()
    updatedAt:Date
}