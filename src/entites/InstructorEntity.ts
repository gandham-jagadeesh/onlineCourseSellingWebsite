import { ManyToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";
import { User } from "./UserEntity";
import { Course } from "./CourseEntity";

@Entity()
export class Instructor{

    @PrimaryGeneratedColumn()
    id:number;

  @OneToOne(()=>User,user=>user.instructor)
  user:User;

  @ManyToMany(()=>Course,course=>course.instructors)
  courses:Course[]
}