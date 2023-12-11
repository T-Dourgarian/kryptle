import { ForbiddenException, Injectable } from "@nestjs/common";
// import { AuthDto } from './dto'
// import { Daily_krypto } from "@prisma/client";
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

                const AVG_SOLUTION_SECONDS = result._avg.solution_seconds;

                return {
                    id: DK.id,
                    numbersToUse: DK.numbers.split(' '),
                    targetNumber: DK.target,
                    avgTimeSeconds: AVG_SOLUTION_SECONDS
                };
            }

            return {
                id: 0,
                numbersToUse: [1, 1, 1, 1, 1],
                targetNumber: 1,
                avgTimeSeconds: 1
            }

        } catch(error) {
            console.log(error)
        }
    }

    async signin(dto) {

        
    }
}