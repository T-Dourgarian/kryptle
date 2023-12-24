import { IsInt, IsNotEmpty } from 'class-validator';

export class SignOutDto {
    @IsNotEmpty()
    @IsInt()
    currentSeconds: number;
}