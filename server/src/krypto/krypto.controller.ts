import { Body, Controller, Post, Get } from "@nestjs/common";
import { KryptoService } from "./krypto.service";
// import { AuthDto } from "./dto";

@Controller('dailykrypto')
export class KryptoController {
    constructor(private kryptoService: KryptoService ) {}

    @Get()
    signup(@Body() dto) {
        return this.kryptoService.getDailyKypto(dto);
    }
    @Post('signin')
    signin(@Body() dto){
        return this.kryptoService.signin(dto);
    }
}