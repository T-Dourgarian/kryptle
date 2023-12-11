import { Body, Controller, Post, Get, UseGuards } from "@nestjs/common";
import { KryptoService } from "./krypto.service";
import { Public } from '../common/decorators';
// import { AuthDto } from "./dto";

@Controller('dailykrypto')
export class KryptoController {
    constructor(private kryptoService: KryptoService ) {}

    @Get()
    signup(@Body() dto) {
        return this.kryptoService.getDailyKypto(dto);
    }

}