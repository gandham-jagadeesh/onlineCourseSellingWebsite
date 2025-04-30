import { IsNotEmpty, IsString } from "class-validator";


export class createLessonDto{

    @IsString()
    @IsNotEmpty()
    title:string;

}