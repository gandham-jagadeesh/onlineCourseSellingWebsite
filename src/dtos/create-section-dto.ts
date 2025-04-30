import { IsNotEmpty, IsString } from "class-validator";


export class sectionDto{
    
    @IsNotEmpty()
    @IsString()
    title:string;


}