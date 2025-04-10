import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./UserEntity";


@Entity()
export class Profile{

    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:false})
    name:string;

    @Column({nullable:false})
    dateofBirth:Date;
    
    @Column()
    bio:string;

    @Column()
    profilePicture:string;


    @OneToOne(()=>User,user=>user.profile)
    user:User

    
}