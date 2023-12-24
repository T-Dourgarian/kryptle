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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsController = void 0;
const common_1 = require("@nestjs/common");
const stats_service_1 = require("./stats.service");
const jwt_1 = require("@nestjs/jwt");
const dto_1 = require("./dto");
let StatsController = class StatsController {
    constructor(statsService, jwtService) {
        this.statsService = statsService;
        this.jwtService = jwtService;
    }
    getStats(req) {
        const { id: userId } = this.jwtService.decode(req.cookies.access_token);
        return this.statsService.getUserStats(userId);
    }
    getLeaderboardData(dto) {
        return this.statsService.getLeaderboardData(dto);
    }
};
__decorate([
    (0, common_1.Get)('/user'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], StatsController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('/leaderboard'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LeaderboardDto]),
    __metadata("design:returntype", void 0)
], StatsController.prototype, "getLeaderboardData", null);
StatsController = __decorate([
    (0, common_1.Controller)('stats'),
    __metadata("design:paramtypes", [stats_service_1.StatsService, jwt_1.JwtService])
], StatsController);
exports.StatsController = StatsController;
//# sourceMappingURL=stats.controller.js.map