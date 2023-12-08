import { Module } from "@nestjs/common";
import { SolutionService } from "./solution.service";
import { SolutionController } from "./solution.controller";
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [JwtModule.register({})],
    controllers: [SolutionController],
    providers: [SolutionService]
})
export class SolutionModule {}