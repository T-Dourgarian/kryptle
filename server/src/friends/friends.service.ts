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
                    users.username,
                    stats.avg_solve_time,
                    stats.total_solves_unique,
                    stats.daily_streak,
                    solutions.solution_seconds AS today_solution_seconds,
                    solutions.solution AS today_solution
                FROM friends
                JOIN users ON friends.friend_userid = users.id
                JOIN stats ON friends.friend_userid = stats.userid
                JOIN solutions ON friends.friend_userid = solutions."userId" AND solutions.daily_krypto_id = (SELECT id FROM daily_krypto ORDER BY id DESC LIMIT 1)
                WHERE friends.userid = ${userId};           
            `


            return result

        } catch(error) {
            console.log(error);
        }
    }

}