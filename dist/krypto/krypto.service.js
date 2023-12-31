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
exports.KryptoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("..//prisma/prisma.service");
let KryptoService = class KryptoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDailyKypto() {
        try {
            const DK = await this.prisma.daily_krypto.findFirst({
                orderBy: {
                    created_at: 'desc'
                }
            });
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
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async getUserGameData(userId) {
        try {
            const todaysKryptoData = await this.prisma.daily_krypto.findFirst({
                orderBy: {
                    id: 'desc',
                },
            });
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
            });
            const formattedSolutions = user.solutions.map((s) => s.solution_formatted);
            const userGameData = {
                validSolutions: formattedSolutions,
                dailyStreak: user.stats.daily_streak
            };
            return userGameData;
        }
        catch (error) {
            console.log(error);
        }
    }
};
KryptoService = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], KryptoService);
exports.KryptoService = KryptoService;
//# sourceMappingURL=krypto.service.js.map