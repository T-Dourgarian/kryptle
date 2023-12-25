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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const dto_1 = require("./dto");
const guards_1 = require("../common/guards");
const decorators_1 = require("../common/decorators");
const jwt_1 = require("@nestjs/jwt");
let AuthController = class AuthController {
    constructor(authService, jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }
    async signupLocal(dto, res) {
        const data = await this.authService.signupLocal(dto);
        res.cookie('access_token', data.access_token, {
            sameSite: 'strict',
            httpOnly: true,
        });
        res.cookie('refresh_token', data.refresh_token, {
            sameSite: 'strict',
            httpOnly: true,
        });
        const { id, username } = this.jwtService.decode(data.access_token);
        return res.json({ id, username });
    }
    async signinLocal(dto, res) {
        const data = await this.authService.signinLocal(dto);
        res.cookie('access_token', data.tokens.access_token, {
            sameSite: 'strict',
            httpOnly: true,
        });
        res.cookie('refresh_token', data.tokens.refresh_token, {
            sameSite: 'strict',
            httpOnly: true,
        });
        const { id, username } = this.jwtService.decode(data.tokens.access_token);
        return res.json({ id, username, ...data.userData });
    }
    logout(dto, userId, res) {
        res.cookie('refresh_token', '', {
            sameSite: 'strict',
            httpOnly: true,
        });
        res.cookie('access_token', '', {
            sameSite: 'strict',
            httpOnly: true,
        });
        this.authService.logout(userId, dto);
        return res.sendStatus(200);
    }
    async refreshTokens(refreshToken, userId, res) {
        const data = await this.authService.refreshTokens(userId, refreshToken);
        res.cookie('access_token', data.access_token, {
            sameSite: 'strict',
            httpOnly: true,
        });
        res.cookie('refresh_token', data.refresh_token, {
            sameSite: 'strict',
            httpOnly: true,
        });
        return res.sendStatus(200);
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('/local/signup'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AuthDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signupLocal", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('/local/signin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SignInDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signinLocal", null);
__decorate([
    (0, common_1.Post)('/logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetCurrentUserId)()),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SignOutDto, Number, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.UseGuards)(guards_1.RtGuard),
    (0, common_1.Post)('/refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, decorators_1.GetCurrentUser)('refreshToken')),
    __param(1, (0, decorators_1.GetCurrentUserId)()),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshTokens", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, jwt_1.JwtService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map