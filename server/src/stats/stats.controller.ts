import { Body, Controller, Get, Post, Query, Req } from "@nestjs/common";
import { StatsService } from "./stats.service";
import { JwtService } from '@nestjs/jwt';
import { LeaderboardDto } from "./dto";

@Controller('stats')
export class StatsController {
    constructor(private statsService: StatsService, private jwtService: JwtService ) {}

    @Get('/user')
    getStats(@Req() req) {
        const { id: userId } = this.jwtService.decode(req.cookies.access_token)
        return this.statsService.getUserStats(userId );
    }

    @Get('/leaderboard')
    getLeaderboardData(@Query() dto: LeaderboardDto, ) {
        return this.statsService.getLeaderboardData(dto);
    }  
}