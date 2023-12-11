import { PrismaService } from "..//prisma/prisma.service";
export declare class StatsService {
    private prisma;
    constructor(prisma: PrismaService);
    getUserStats(userId: any): Promise<{
        avg_solve_time: number;
        total_solves: number;
        total_solves_unique: number;
    }>;
}
