import { KryptoService } from "./krypto.service";
import { JwtService } from "@nestjs/jwt";
export declare class KryptoController {
    private kryptoService;
    private jwtService;
    constructor(kryptoService: KryptoService, jwtService: JwtService);
    signup(dto: any): Promise<{
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
    getUserGameData(req: any): Promise<{
        validSolutions: string[];
        dailyStreak: any;
    }>;
}
