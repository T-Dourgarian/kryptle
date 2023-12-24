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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("..//prisma/prisma.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(prisma, jwtService, config) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.config = config;
    }
    async signupLocal(dto) {
        const user = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { username: dto.username },
                    { email: dto.email }
                ]
            }
        });
        if (user?.username === dto.username)
            throw new common_1.ForbiddenException('Username already taken');
        if (user?.email === dto.email)
            throw new common_1.ForbiddenException('Email already taken');
        const hash = await this.hashData(dto.password);
        const newUser = await this.prisma.user.create({
            data: {
                username: dto.username,
                email: dto.email,
                hash,
            }
        });
        await this.prisma.stats.create({
            data: {
                userid: newUser.id
            }
        });
        const tokens = await this.getTokens(newUser.id, newUser.username);
        await this.updateRtHash(newUser.id, tokens.refresh_token);
        return tokens;
    }
    async updateRtHash(userId, rt) {
        const hash = await this.hashData(rt);
        await this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                hashedRt: hash
            }
        });
    }
    async signinLocal(dto) {
        const DK = await this.prisma.daily_krypto.findFirst({
            orderBy: {
                created_at: 'desc'
            }
        });
        const user = await this.prisma.user.findUnique({
            where: {
                username: dto.username
            }
        });
        if (!user)
            throw new common_1.ForbiddenException('Access Denied');
        const passwordMatches = await bcrypt.compare(dto.password, user.hash);
        if (!passwordMatches)
            throw new common_1.ForbiddenException('Access Denied');
        const tokens = await this.getTokens(user.id, user.username);
        await this.updateRtHash(user.id, tokens.refresh_token);
        const userData = {
            currentSeconds: user.solve_timer_seconds,
        };
        return { tokens, userData };
    }
    async logout(userId, dto) {
        await this.prisma.user.update({
            where: {
                id: userId,
                hashedRt: {
                    not: null
                }
            },
            data: {
                solve_timer_seconds: dto.currentSeconds,
                hashedRt: null
            }
        });
    }
    async refreshTokens(userId, rt) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!user || !user.hashedRt)
            throw new common_1.ForbiddenException('Access Denied');
        const rtMatches = await bcrypt.compare(rt, user.hashedRt);
        if (!rtMatches)
            throw new common_1.ForbiddenException('Access Denied');
        const tokens = await this.getTokens(user.id, user.username);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
    }
    hashData(data) {
        return bcrypt.hash(data, 10);
    }
    async getTokens(userId, username) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({
                id: userId,
                username,
            }, {
                secret: this.config.get('AT_SECRET'),
                expiresIn: 60 * 15
            }),
            this.jwtService.signAsync({
                id: userId,
                username,
            }, {
                secret: this.config.get('RT_SECRET'),
                expiresIn: 60 * 60 * 24 * 7
            })
        ]);
        return {
            access_token: at,
            refresh_token: rt
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map