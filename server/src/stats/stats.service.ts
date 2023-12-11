import { ForbiddenException, Injectable } from "@nestjs/common";
// import { AuthDto } from './dto'
// import { Daily_krypto } from "@prisma/client";
import { PrismaService } from "..//prisma/prisma.service";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable({})
export class StatsService {
    constructor(private prisma:PrismaService) {}

    async getUserStats(userId) {
        try {
            const userStats = await this.prisma.stats.findFirst({
                where: {
                    userid: userId
                },
                select: {
                    avg_solve_time: true,
                    total_solves: true,
                    total_solves_unique: true,
                    daily_streak: true
                }
            })

            return userStats
        } catch(error) {
            console.log(error);
        }
    }
}