import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";


@Injectable({})
export class FriendsService {
    constructor(private prisma:PrismaService) {}

    async createFriendRequest(originUserId, receiverUserId) {
        try {
            const existingRequest = await this.prisma.friend_requests.findFirst({
                where: {
                    origin_userid: originUserId,
                    receiver_userid: receiverUserId
                }
            })

            if (existingRequest?.id) throw new ForbiddenException('Request already created');

            const result = await this.prisma.friend_requests.create({
                data: {
                    origin_userid: originUserId,
                    receiver_userid: receiverUserId
                }
            })

            return result
        } catch(error) {
            console.log(error);
        }
    }


    async acceptFriendRequest(userId, requestId) {
        try {

            const existingRequest = await this.prisma.friend_requests.findFirst({
                where: {
                    id: requestId
                }
            })

            if (!existingRequest) throw new ForbiddenException('Invalid requestId');

            if (existingRequest.receiver_userid !== userId) throw new ForbiddenException('Only the receiver of a friend request can accept.');

            // create the friend record for each user

            const result = await this.prisma.friends.create({
                data: {
                    userid: userId,
                    friend_userid: existingRequest.origin_userid
                }
            })

            await this.prisma.friends.create({
                data: {
                    userid: existingRequest.origin_userid, 
                    friend_userid: userId,
                }
            })

            return result;

        } catch(error) {
            console.log(error);
        }
    }

    async getFriendsData(userId) {
        try {

            const result = await this.prisma.$queryRaw
            `
                SELECT 
                    u.username,
                    s.avg_solve_time,
                    s.total_solves_unique,
                    s.daily_streak,
                    CASE 
                        WHEN so.solution_seconds IS NOT NULL THEN so.solution_seconds
                        ELSE NULL -- Or any default value you prefer
                    END AS today_solution_seconds,
                    CASE 
                        WHEN so.solution IS NOT NULL THEN so.solution
                        ELSE NULL -- Or any default value you prefer
                    END AS today_solution
                FROM friends f
                JOIN users u ON f.friend_userid = u.id
                JOIN stats s ON f.friend_userid = s.userid
                LEFT JOIN solutions so ON f.friend_userid = so."userId" 
                    AND so.daily_krypto_id = (
                        SELECT MAX(id) 
                        FROM daily_krypto
                    )
                WHERE f.userid = ${userId};
            `


            console.log(result)

            return result

        } catch(error) {
            console.log(error);
        }
    }

}