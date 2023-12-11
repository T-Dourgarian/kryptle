import { PrismaService } from "../prisma/prisma.service";
export declare class RefreshKryptoService {
    private prisma;
    constructor(prisma: PrismaService);
    generateRandomIntegers(min: any, max: any, count: any): any[];
    refresh(): Promise<void>;
}
