import { JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";
import { User } from "./UserEntity";
import { Course } from "./CourseEntity";


@Entity()
export class Student{

    @PrimaryGeneratedColumn()
    id:number;

    @OneToOne(()=>User)
    @JoinColumn()
    user:User;


    @ManyToMany(()=>Course,course=>course.students)
    @JoinTable()
    courses:Course[];

}