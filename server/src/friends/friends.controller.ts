import { Body, Controller, Get, Post, Query, Req } from "@nestjs/common";
import { FriendsService } from "./friends.service";
import { JwtService } from '@nestjs/jwt';
import { CreateFriendRequestDto, AcceptFriendRequestDto } from "./dto";

@Controller('friends')
export class FriendsController {
    constructor(private friendsService: FriendsService, private jwtService: JwtService ) {}

    @Post('/request')
    createFriendRequest(
        @Req() req, 
        @Body() dto: CreateFriendRequestDto
    ) {
        const { id: userId } = this.jwtService.decode(req.cookies.access_token);
        const { receiverUserId } = dto;
        return this.friendsService.createFriendRequest(userId, receiverUserId);
    }

    @Post('/accept')
    acceptFriendRequest(
        @Req() req, 
        @Body() dto: AcceptFriendRequestDto
    ) {
        const { id: userId } = this.jwtService.decode(req.cookies.access_token);
        const { requestId } = dto;
        return this.friendsService.acceptFriendRequest(userId, requestId);
    }

    @Get('/')
    getFriendsData(
        @Req() req, 
    ) {
        const { id: userId } = this.jwtService.decode(req.cookies.access_token);

        return this.friendsService.getFriendsData(userId);
    }


}