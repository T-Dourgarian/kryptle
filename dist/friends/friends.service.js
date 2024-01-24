"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FriendsService = class FriendsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createFriendRequest(originUserId, receiverUserId) {
        try {
            const existingRequest = await this.prisma.friend_requests.findFirst({
                where: {
                    origin_userid: originUserId,
                    receiver_userid: receiverUserId
                }
            });
            if (existingRequest?.id)
                throw new common_1.ForbiddenException('Request already created');
            const result = await this.prisma.friend_requests.create({
                data: {
                    origin_userid: originUserId,
                    receiver_userid: receiverUserId
                }
            });
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }
    async acceptFriendRequest(userId, requestId) {
        try {
            const existingRequest = await this.prisma.friend_requests.findFirst({
                where: {
                    id: requestId
                }
            });
            if (!existingRequest)
                throw new common_1.ForbiddenException('Invalid requestId');
            if (existingRequest.receiver_userid !== userId)
                throw new common_1.ForbiddenException('Only the receiver of a friend request can accept.');
            const result = await this.prisma.friends.create({
                data: {
                    userid: userId,
                    friend_userid: existingRequest.origin_userid
                }
            });
            await this.prisma.friends.create({
                data: {
                    userid: existingRequest.origin_userid,
                    friend_userid: userId,
                }
            });
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }
    async getFriendsData(userId) {
        try {
            const result = await this.prisma.$queryRaw `
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
            `;
            return result;
        }
        catch (error) {
            console.log(error);
        }
    }
};
FriendsService = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FriendsService);
exports.FriendsService = FriendsService;
//# sourceMappingURL=friends.service.js.map