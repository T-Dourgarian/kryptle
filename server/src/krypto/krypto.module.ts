import { Module } from "@nestjs/common";
import { KryptoService } from "./krypto.service";
import { KryptoController } from "./krypto.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [JwtModule.register({})],
    controllers: [KryptoController],
    providers: [KryptoService]
})
export class KryptoModule {}