import { FriendsService } from "./friends.service";
import { JwtService } from '@nestjs/jwt';
import { CreateFriendRequestDto, AcceptFriendRequestDto } from "./dto";
export declare class FriendsController {
    private friendsService;
    private jwtService;
    constructor(friendsService: FriendsService, jwtService: JwtService);
    createFriendRequest(req: any, dto: CreateFriendRequestDto): Promise<{
        id: number;
        origin_userid: number;
        receiver_userid: number;
        createdat: Date;
    }>;
    acceptFriendRequest(req: any, dto: AcceptFriendRequestDto): Promise<{
        id: number;
        userid: number;
        friend_userid: number;
        createdat: Date;
    }>;
    getFriendsData(req: any): Promise<unknown>;
}
