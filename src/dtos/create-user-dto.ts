import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import {  PrimaryGeneratedColumn } from "typeorm";

export class createUserDto{

    

    @PrimaryGeneratedColumn()
    id:number;

  
    @IsNotEmpty()
    password:string;

    @IsNotEmpty()
    @IsEmail()
    email:string

    
}