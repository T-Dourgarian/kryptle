import { ForbiddenException, Injectable } from "@nestjs/common";
// import { AuthDto } from './dto'
import { daily_krypto } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const Mexp = require('math-expression-evaluator');
const mexp = new Mexp();

@Injectable({})
export class SolutionService {
    constructor(private prisma:PrismaService) {}

    async postSolution(dto) {
       
        try {
            const numbersRE = /\b\d+\b/g;

            const {
                id,
                solution,
                solutionSeconds
            } = dto;

            
            const result = await this.prisma.daily_krypto.findFirst({
                where: {
                    id 
                },
                select: {
                    numbers: true,
                    target: true,
                },
            });

            if (!result) throw new ForbiddenException('Krypto ID invalid')

            const target = result.target;
            const numbersToUse = result.numbers.split(' ').sort((a,b) => Number(a) - Number(b));
            
            let solutionAnswer;
            
            try {
                solutionAnswer = mexp.eval(solution);
            } catch(error) {
                throw new ForbiddenException("Invalid mathamatical equation");
            }
            
            const numsUsed = solution.match(numbersRE).sort((a,b) => a - b);

    
            //checks if solution uses more or less that 5 numbers
            if (numsUsed.length > 5) {
                throw new ForbiddenException('Invalid: There are too many numbers in your solution');
            } else if (numsUsed.length < 5) {
                throw new ForbiddenException('Invalid: You must use all 5 numbers individually');
            }

            // checks that solution uses correct 5 numbers
            for (let i = 0; i < numbersToUse.length; i++) {
                if (numbersToUse[i] !== numsUsed[i]) {
                    throw new ForbiddenException(`Invalid: ${numsUsed[i]} is not a valid number`);
                }
            }
        
            // checks that solution is correct
            if (Number(target) !== Number(solutionAnswer)) {
                throw new ForbiddenException(`Invalid: This solution does not equal ${target}`);
            }

            if (solution.includes('.')) {
                throw new ForbiddenException(`Invalid: This solution contains a decimal`);
            }
        

            
            await this.prisma.solutions.create({
                data: {
                    daily_krypto_id: id,
                    solution: solution,
                    solution_seconds: solutionSeconds,
                },
            });

            const avgSolutionSecondsAggr = await this.prisma.solutions.aggregate({
                where: {
                    daily_krypto_id: id,
                },
                _avg: {
                    solution_seconds: true,
                },
            });

            const AVG_SOLUTION_SECONDS = avgSolutionSecondsAggr._avg.solution_seconds;

            return { AvgTimeSeconds: AVG_SOLUTION_SECONDS}
            

            
        } catch(error) {
            throw error
        }
    }
}