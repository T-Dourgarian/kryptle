import { StatsService } from "./stats.service";
import { JwtService } from '@nestjs/jwt';
import { LeaderboardDto } from "./dto";
export declare class StatsController {
    private statsService;
    private jwtService;
    constructor(statsService: StatsService, jwtService: JwtService);
    getStats(req: any): Promise<{
        avg_solve_time: number;
        total_solves: number;
        total_solves_unique: number;
        daily_streak: number;
    }>;
    getLeaderboardData(dto: LeaderboardDto): Promise<{
        avg_solve_time: number;
        total_solves: number;
        total_solves_unique: number;
        daily_streak: number;
        users: {
            username: string;
        };
    }[]>;
}
