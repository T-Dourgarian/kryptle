import { Body, Controller, Post } from "@nestjs/common";
import { SolutionService } from "./solution.service";
import { AuthDto } from "./dto";

@Controller('solution')
export class SolutionController {
    constructor(private solutionService: SolutionService ) {}

    @Post()
    signup(@Body() dto: AuthDto) {
        return this.solutionService.postSolution(dto);
    }
}