import { Module } from "@nestjs/common";
import { RefreshKryptoService } from "./refreshKrypto.service";

@Module({
    providers: [ RefreshKryptoService ]
})
export class RefreshKryptoModule {}