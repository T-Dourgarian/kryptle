"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const krypto_module_1 = require("./krypto/krypto.module");
const prisma_module_1 = require("./prisma/prisma.module");
const solution_module_1 = require("./solution/solution.module");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const refreshKrypto_module_1 = require("./refreshKrypto/refreshKrypto.module");
const auth_module_1 = require("./auth/auth.module");
const core_1 = require("@nestjs/core");
const guards_1 = require("./common/guards");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [refreshKrypto_module_1.RefreshKryptoModule, krypto_module_1.KryptoModule, solution_module_1.SolutionModule, prisma_module_1.PrismaModule, config_1.ConfigModule.forRoot({ isGlobal: true }), schedule_1.ScheduleModule.forRoot(), auth_module_1.AuthModule],
        controllers: [],
        providers: [{
                provide: core_1.APP_GUARD,
                useClass: guards_1.AtGuard
            }],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map