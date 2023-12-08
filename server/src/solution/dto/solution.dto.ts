import { IsNotEmpty, IsEmail, IsString, IsInt,  } from "class-validator"

export class SolutionDto {  
    @IsInt()
    @IsNotEmpty()
    kryptoId: number

    @IsString()
    @IsNotEmpty()
    solution: string

    @IsInt()
    @IsNotEmpty()
    solutionSeconds: number

    @IsString()
    @IsNotEmpty()
    formattedSolution: string
}