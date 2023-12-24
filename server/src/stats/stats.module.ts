import { Module } from "@nestjs/common";
import { StatsService } from "./stats.service";
import { StatsController } from "./stats.controller";
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [JwtModule.register({})],
    controllers: [StatsController],
    providers: [StatsService]
})
export class StatsModule {}