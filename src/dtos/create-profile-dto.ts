import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator";



export class createProfileDto {
    
   
    @IsString()
    firstName?:string;

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