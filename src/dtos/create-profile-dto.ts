import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";



export class createProfileDto {
    
   
    @IsString()
    @IsNotEmpty()
    firstName:string;

    @IsString()
    @IsOptional()
    bio?:string;

    @IsString()
    @IsOptional()
    country?:string;
    
    @IsDate()
    @Type(()=>Date)
    @IsOptional()
    dateOfBirth?:Date;

    @IsString()
    @IsOptional()
    profilePicture?:string;

}