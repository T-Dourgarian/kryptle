import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RefreshKryptoService {
    constructor(private prisma:PrismaService) {}

    generateRandomIntegers(min, max, count) {
        const randomIntegers = [];
        for (let i = 0; i < count; i++) {
            const randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;
            randomIntegers.push(randomInteger);
        }
        return randomIntegers;
    }

    @Cron('0 0 * * *')
    async refresh() {
        const kryptoNumbers = this.generateRandomIntegers(1, 25, 6);
        const numbersToUse = kryptoNumbers.slice(0, 5).join(' ');
        const targetNumber = kryptoNumbers[5];

        try {
            await this.prisma.daily_krypto.create({
                data: {
                    numbers: numbersToUse,
                    target: targetNumber,
                },
            });

        } catch(error) {
            console.log('error');
        }
    }
}