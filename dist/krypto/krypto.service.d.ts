import { PrismaService } from "..//prisma/prisma.service";
export declare class KryptoService {
    private prisma;
    constructor(prisma: PrismaService);
    getDailyKypto(): Promise<{
        id: number;
        numbersToUse: string[];
        targetNumber: number;
        avgTimeSeconds: number;
    } | {
        id: number;
        numbersToUse: number[];
        targetNumber: number;
        avgTimeSeconds: number;
    }>;
    getUserGameData(userId: any): Promise<{
        validSolutions: string[];
        dailyStreak: number;
    }>;
}
