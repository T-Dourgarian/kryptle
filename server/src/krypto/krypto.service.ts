import { ForbiddenException, Injectable } from "@nestjs/common";
// import { AuthDto } from './dto'
import { PrismaService } from "..//prisma/prisma.service";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable({})
export class KryptoService {
    constructor(private prisma:PrismaService) {}

    async getDailyKypto(dto) {
        try {
            const DK = await this.prisma.daily_krypto.findFirst({
                orderBy: {
                    created_at: 'desc'
                }
            })
    
            // console.log('DK', DK)
    
            if (DK) {

                const result = await this.prisma.solutions.aggregate({
                    where: {
                      daily_krypto_id: DK.id,
                    },
                    _avg: {
                      solution_seconds: true,
                    },
                });

                const AVG_SOLUTION_SECONDS = Math.round(result._avg.solution_seconds);

                return {
                    id: DK.id,
                    numbersToUse: DK.numbers.split(' '),
                    targetNumber: DK.target,
                    avgTimeSeconds: AVG_SOLUTION_SECONDS
                };
            }

            return {
                id: 0,
                numbersToUse: [2, 2, 2, 2, 2],
                targetNumber: 2,
                avgTimeSeconds: 1
            }

        } catch(error) {
            console.log(error)
        }
    }


    async getUserGameData(userId) {
        try {

            const todaysKryptoData = await this.prisma.daily_krypto.findFirst({
                orderBy: {
                    id: 'desc',
                  },
            })

            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId
                },
                include: {
                    solutions: {
                        select: {
                            solution_formatted: true
                        },
                        where: {
                            daily_krypto_id: todaysKryptoData.id
                        }
                    },
                    stats: {
                        select: {
                            daily_streak: true
                        },
                        where: {
                            userid: userId
                        }
                    }
                }
            })

            const formattedSolutions = user.solutions.map((s) => s.solution_formatted);

            const userGameData = {
                validSolutions: formattedSolutions,
                dailyStreak: user.stats[0].daily_streak
            }

            return userGameData
            
        } catch(error) {
            console.log(error);
        }
    }
}