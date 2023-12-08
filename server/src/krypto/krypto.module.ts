import { Module } from "@nestjs/common";
import { KryptoService } from "./krypto.service";
import { KryptoController } from "./krypto.controller";

@Module({
    controllers: [KryptoController],
    providers: [KryptoService]
})
export class KryptoModule {}