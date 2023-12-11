import { PrismaService } from "..//prisma/prisma.service";
export declare class SolutionService {
    private prisma;
    constructor(prisma: PrismaService);
    postSolution(dto: any, userId: any): Promise<{
        avgTimeSeconds: number;
    }>;
}
