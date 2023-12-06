import { Body, Controller, Post, Get } from "@nestjs/common";
import { KryptoService } from "./krypto.service";
import { Public } from "src/common/decorators";

@Controller('dailykrypto')
export class KryptoController {
    constructor(private kryptoService: KryptoService ) {}

    @Public()
    @Get()
    signup(@Body() dto) {
        return this.kryptoService.getDailyKypto(dto);
    }
}