import { KryptoService } from "./krypto.service";
export declare class KryptoController {
    private kryptoService;
    constructor(kryptoService: KryptoService);
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
}
