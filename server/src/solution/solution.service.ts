import { ForbiddenException, Injectable } from "@nestjs/common";
// import { AuthDto } from './dto'
import { daily_krypto } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
// import Mexp from 'math-expression-evaluator'; how the fuck do I use this npm package 

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

            
            // const solutionAnswer = mexp.eval(solution);
            // let numsUsed = solution.match(numbersRE).sort((a,b) => a - b);;

            
        } catch(error) {
            throw error
        }
    }
}