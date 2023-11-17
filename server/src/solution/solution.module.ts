import { Module } from "@nestjs/common";
import { SolutionService } from "./solution.service";
import { SolutionController } from "./solution.controller";

@Module({
    controllers: [SolutionController],
    providers: [SolutionService]
})
export class SolutionModule {}