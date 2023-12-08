import { Body, Controller, Post } from "@nestjs/common";
import { SolutionService } from "./solution.service";
import { SolutionDto } from "./dto";

@Controller('solution')
export class SolutionController {
    constructor(private solutionService: SolutionService ) {}

    @Post()
    signup(@Body() dto: SolutionDto) {
        return this.solutionService.postSolution(dto);
    }
}