import { PrismaService } from "../prisma/prisma.service";
export declare class FriendsService {
    private prisma;
    constructor(prisma: PrismaService);
    createFriendRequest(originUserId: any, receiverUserId: any): Promise<{
        id: number;
        origin_userid: number;
        receiver_userid: number;
        createdat: Date;
    }>;
    acceptFriendRequest(userId: any, requestId: any): Promise<{
        id: number;
        userid: number;
        friend_userid: number;
        createdat: Date;
    }>;
    getFriendsData(userId: any): Promise<unknown>;
}
