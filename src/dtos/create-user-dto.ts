import { Column, PrimaryColumnCannotBeNullableError, PrimaryGeneratedColumn } from "typeorm";

export class createUserDto{

    
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    role:string;


}