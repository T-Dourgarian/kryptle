import { PrismaService } from "src/prisma/prisma.service";
export declare class KryptoService {
    private prisma;
    constructor(prisma: PrismaService);
    getDailyKypto(dto: any): Promise<{
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
    signin(dto: any): Promise<void>;
}
