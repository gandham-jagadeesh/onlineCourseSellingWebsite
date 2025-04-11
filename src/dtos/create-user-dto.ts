import { Exclude, Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { createProfileDto } from "./create-profile-dto";

export class createUserDto{


  
    @IsNotEmpty()
    password:string;

    @IsNotEmpty()
    @IsEmail()
    email:string
    
    @ValidateNested()
    @Type(()=>createProfileDto)
    @IsOptional()
    profile?:createProfileDto;
    
}