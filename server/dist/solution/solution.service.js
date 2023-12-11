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
exports.SolutionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("..//prisma/prisma.service");
const Mexp = require('math-expression-evaluator');
const mexp = new Mexp();
let SolutionService = class SolutionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async postSolution(dto, userId) {
        try {
            const numbersRE = /\b\d+\b/g;
            const { kryptoId, solution, solutionSeconds, formattedSolution } = dto;
            const result = await this.prisma.daily_krypto.findFirst({
                where: {
                    id: kryptoId
                },
                select: {
                    numbers: true,
                    target: true,
                },
            });
            if (!result)
                throw new common_1.ForbiddenException('Krypto ID invalid');
            const target = result.target;
            const numbersToUse = result.numbers.split(' ').sort((a, b) => Number(a) - Number(b));
            let solutionAnswer;
            try {
                solutionAnswer = mexp.eval(solution);
            }
            catch (error) {
                throw new common_1.ForbiddenException("Invalid mathamatical equation");
            }
            const numsUsed = solution.match(numbersRE).sort((a, b) => a - b);
            if (numsUsed.length > 5) {
                throw new common_1.ForbiddenException('Invalid: There are too many numbers in your solution');
            }
            else if (numsUsed.length < 5) {
                throw new common_1.ForbiddenException('Invalid: You must use all 5 numbers individually');
            }
            for (let i = 0; i < numbersToUse.length; i++) {
                if (numbersToUse[i] !== numsUsed[i]) {
                    throw new common_1.ForbiddenException(`Invalid: ${numsUsed[i]} is not a valid number`);
                }
            }
            if (Number(target) !== Number(solutionAnswer)) {
                throw new common_1.ForbiddenException(`Invalid: This solution does not equal ${target}`);
            }
            if (solution.includes('.')) {
                throw new common_1.ForbiddenException(`Invalid: This solution contains a decimal`);
            }
            const alreadyCompletedSolution = await this.prisma.solutions.findFirst({
                where: {
                    daily_krypto_id: kryptoId,
                    userId: userId
                }
            });
            if (!alreadyCompletedSolution) {
            }
            await this.prisma.solutions.create({
                data: {
                    userId: userId,
                    daily_krypto_id: kryptoId,
                    solution: solution,
                    solution_seconds: solutionSeconds,
                    solution_formatted: formattedSolution
                },
            });
            const userStats = await this.prisma.$queryRaw `
                SELECT
                    "userId",
                    ROUND(AVG(solution_seconds)) AS avg_solve_time,
                    COUNT(*)::int AS total_solves,
                    COUNT(DISTINCT daily_krypto_id)::int AS total_solves_unique
                FROM public.solutions
                where "userId" = ${userId}
                GROUP BY "userId";
            `;
            await this.prisma.$queryRaw `
                UPDATE stats
                SET
                    avg_solve_time = ${userStats[0].avg_solve_time},
                    total_solves = ${userStats[0].total_solves},
                    total_solves_unique = ${userStats[0].total_solves_unique},
                    daily_streak = CASE WHEN daily_streak_increment_eligible = true THEN stats.daily_streak + 1 ELSE stats.daily_streak END,
                    daily_streak_increment_eligible = false
                WHERE
                    userid = ${userId};
            `;
            const avgSolutionSecondsAggr = await this.prisma.solutions.aggregate({
                where: {
                    daily_krypto_id: kryptoId,
                },
                _avg: {
                    solution_seconds: true,
                },
            });
            const AVG_SOLUTION_SECONDS = Math.round(avgSolutionSecondsAggr._avg.solution_seconds);
            return { avgTimeSeconds: AVG_SOLUTION_SECONDS };
        }
        catch (error) {
            throw error;
        }
    }
};
SolutionService = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SolutionService);
exports.SolutionService = SolutionService;
//# sourceMappingURL=solution.service.js.map