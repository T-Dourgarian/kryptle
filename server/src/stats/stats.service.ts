import { Injectable } from "@nestjs/common";
import { PrismaService } from "..//prisma/prisma.service";


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

    async getLeaderboardData(dto) {
        try {
            
            const { orderBy } = dto;

            const leaderBoardData = await this.prisma.stats.findMany({
                where: {
                    avg_solve_time: {
                        gt: 0
                    }
                },
                select: {
                  avg_solve_time: true,
                  total_solves_unique: true,
                  total_solves: true,
                  daily_streak: true,
                  users: {
                    select: {
                      username: true,
                    },
                  },
                },
                orderBy: {
                    [orderBy]: orderBy === 'avg_solve_time' ? 'asc' : 'desc'
                },
                take: 10,
                
              });

              return leaderBoardData;

        } catch(error) {
            console.log(error);
        }
    }
}