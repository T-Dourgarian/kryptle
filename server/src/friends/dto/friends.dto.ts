import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateFriendRequestDto {
    @IsNotEmpty()
    @IsString()
    receiverUserId: string
}


export class AcceptFriendRequestDto {
    @IsNotEmpty()
    @IsString()
    requestId: string
}