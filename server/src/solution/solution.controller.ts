import { Body, Controller, Post, Req } from "@nestjs/common";
import { SolutionService } from "./solution.service";
import { SolutionDto } from "./dto";
import { JwtService } from '@nestjs/jwt';

@Controller('solution')
export class SolutionController {
    constructor(private solutionService: SolutionService, private jwtService: JwtService ) {}

    @Post()
    signup(@Body() dto: SolutionDto, @Req() req) {
        const { id: userId } = this.jwtService.decode(req.cookies.access_token)
        return this.solutionService.postSolution(dto, userId );
    }
}