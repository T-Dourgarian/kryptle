import { Body, Controller, Post, Get, UseGuards, Req, HttpCode, HttpStatus } from "@nestjs/common";
import { KryptoService } from "./krypto.service";
import { Public } from '../common/decorators';
import { JwtService } from "@nestjs/jwt";
// import { AuthDto } from "./dto";

@Controller('dailykrypto')
export class KryptoController {
    constructor(private kryptoService: KryptoService, private jwtService: JwtService ) {}

    @Get('/game')
    signup(@Body() dto) {
        return this.kryptoService.getDailyKypto(dto);
    }

    @Get('/user')
    @HttpCode(HttpStatus.OK)
    getUserGameData(@Req() req) {
        const { id: userId } = this.jwtService.decode(req.cookies.access_token);
        return this.kryptoService.getUserGameData(userId);
    }

}