"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.enableCors({
        credentials: true,
        origin: true
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true
    }));
    await app.listen(process.env.PORT || 5000);
}
bootstrap();
//# sourceMappingURL=main.js.map