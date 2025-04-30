import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class CourseDto{


    @IsNotEmpty()
    @IsString()
    title:string;


    @IsNotEmpty()
    @IsString()
    description:string;
}