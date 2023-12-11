import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { StatsService } from "./stats.service";
import { JwtService } from '@nestjs/jwt';

@Controller('stats')
export class StatsController {
    constructor(private statsService: StatsService, private jwtService: JwtService ) {}

    @Get()
    getStats(@Req() req) {
        const { id: userId } = this.jwtService.decode(req.cookies.access_token)
        return this.statsService.getUserStats(userId );
    }
}