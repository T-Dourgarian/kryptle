"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshKryptoService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../prisma/prisma.service");
let RefreshKryptoService = class RefreshKryptoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateRandomIntegers(min, max, count) {
        const randomIntegers = [];
        for (let i = 0; i < count; i++) {
            const randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;
            randomIntegers.push(randomInteger);
        }
        return randomIntegers;
    }
    async refresh() {
        const kryptoNumbers = this.generateRandomIntegers(1, 25, 6);
        const numbersToUse = kryptoNumbers.slice(0, 5).join(' ');
        const targetNumber = kryptoNumbers[5];
        try {
            await this.prisma.stats.updateMany({
                where: {
                    daily_streak_increment_eligible: true
                },
                data: {
                    daily_streak: 0
                }
            });
            await this.prisma.stats.updateMany({
                where: {
                    daily_streak_increment_eligible: false
                },
                data: {
                    daily_streak_increment_eligible: true
                }
            });
            await this.prisma.daily_krypto.create({
                data: {
                    numbers: numbersToUse,
                    target: targetNumber,
                },
            });
            await this.prisma.user.updateMany({
                data: {
                    solve_timer_seconds: 0
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
};
__decorate([
    (0, schedule_1.Cron)('0 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RefreshKryptoService.prototype, "refresh", null);
RefreshKryptoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RefreshKryptoService);
exports.RefreshKryptoService = RefreshKryptoService;
//# sourceMappingURL=refreshKrypto.service.js.map