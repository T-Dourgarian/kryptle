import { SolutionService } from "./solution.service";
import { SolutionDto } from "./dto";
import { JwtService } from '@nestjs/jwt';
export declare class SolutionController {
    private solutionService;
    private jwtService;
    constructor(solutionService: SolutionService, jwtService: JwtService);
    signup(dto: SolutionDto, req: any): Promise<{
        avgTimeSeconds: number;
    }>;
}
