import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./UserEntity";


@Entity()
export class Profile{

    @PrimaryGeneratedColumn()
    id:number;
    
    @Column({nullable:true})
    firstName:string;

    @Column({"type":Date,nullable:true})
    dateOfBirth:Date;
    
    @Column({nullable:true})
    bio:string;

    @Column({nullable:true})
    profilePicture:string;


    @Column({nullable:true})
    country:string;

    @OneToOne(()=>User,user=>user.profile)
    user:User


    
}