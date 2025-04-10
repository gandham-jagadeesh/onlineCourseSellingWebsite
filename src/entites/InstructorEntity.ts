import { OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";
import { User } from "./UserEntity";

@Entity()
export class Instructor{

    @PrimaryGeneratedColumn()
    id:number;

  @OneToOne(()=>User,user=>user.instructor)
  user:User;
}