import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class signInUserDto{

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    password:string;
}