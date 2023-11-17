import { IsNotEmpty, IsEmail, IsString, IsInt,  } from "class-validator"

export class AuthDto {  
    @IsInt()
    @IsNotEmpty()
    id: number

    @IsString()
    @IsNotEmpty()
    solution: string

    @IsInt()
    @IsNotEmpty()
    solutionSeconds
}