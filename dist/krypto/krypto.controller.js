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
exports.KryptoController = void 0;
const common_1 = require("@nestjs/common");
const krypto_service_1 = require("./krypto.service");
const decorators_1 = require("../common/decorators");
const jwt_1 = require("@nestjs/jwt");
let KryptoController = class KryptoController {
    constructor(kryptoService, jwtService) {
        this.kryptoService = kryptoService;
        this.jwtService = jwtService;
    }
    getDailyKrypto() {
        return this.kryptoService.getDailyKypto();
    }
    getUserGameData(req) {
        const { id: userId } = this.jwtService.decode(req.cookies.access_token);
        return this.kryptoService.getUserGameData(userId);
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('/game'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], KryptoController.prototype, "getDailyKrypto", null);
__decorate([
    (0, common_1.Get)('/user'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], KryptoController.prototype, "getUserGameData", null);
KryptoController = __decorate([
    (0, common_1.Controller)('dailykrypto'),
    __metadata("design:paramtypes", [krypto_service_1.KryptoService, jwt_1.JwtService])
], KryptoController);
exports.KryptoController = KryptoController;
//# sourceMappingURL=krypto.controller.js.map