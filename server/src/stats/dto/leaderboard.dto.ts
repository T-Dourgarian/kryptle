import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LeaderboardDto {
    @IsNotEmpty()
    @IsString()
    orderBy: string
}