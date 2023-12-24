"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KryptoModule = void 0;
const common_1 = require("@nestjs/common");
const krypto_service_1 = require("./krypto.service");
const krypto_controller_1 = require("./krypto.controller");
const jwt_1 = require("@nestjs/jwt");
let KryptoModule = class KryptoModule {
};
KryptoModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule.register({})],
        controllers: [krypto_controller_1.KryptoController],
        providers: [krypto_service_1.KryptoService]
    })
], KryptoModule);
exports.KryptoModule = KryptoModule;
//# sourceMappingURL=krypto.module.js.map