import { Exclude, Type } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { createProfileDto } from "./create-profile-dto";
import { Role } from "src/util/role.enum.util";




export class createUserDto{


    
  
    @IsNotEmpty()
    password:string;

    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsEnum(Role)
    @IsNotEmpty()
    role:Role

    @ValidateNested()
    @Type(()=>createProfileDto)
    @IsOptional()
    profile?:createProfileDto;
    
}