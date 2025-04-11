import { OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";
import { User } from "./UserEntity";


@Entity()
export class Student{

    @PrimaryGeneratedColumn()
    id:number;



    @OneToOne(()=>User,user=>user.student)
    user:User;


}