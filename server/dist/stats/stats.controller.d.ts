import { StatsService } from "./stats.service";
import { JwtService } from '@nestjs/jwt';
export declare class StatsController {
    private statsService;
    private jwtService;
    constructor(statsService: StatsService, jwtService: JwtService);
    getStats(req: any): Promise<{
        avg_solve_time: number;
        total_solves: number;
        total_solves_unique: number;
    }>;
}
