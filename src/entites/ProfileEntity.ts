import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./UserEntity";


@Entity()
export class Profile{

    @PrimaryGeneratedColumn()
    id:number;
    
    @Column({nullable:false})
    firstName:string;

    @Column({"type":Date,nullable:true})
    dateOfBirth:Date;
    
    @Column()
    bio:string;

    @Column()
    profilePicture:string;


    @Column()
    country:string;

    @OneToOne(()=>User,user=>user.profile)
    user:User


    
}