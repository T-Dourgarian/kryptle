import { Controller, Post, Request, Response, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types/tokens.type';
import { RtGuard } from 'src/common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/common/decorators';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private jwtService: JwtService) {}

    @Public()
    @Post('/local/signup')
    @HttpCode(HttpStatus.CREATED)
    signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.signupLocal(dto)
    }

    @Public()
    @Post('/local/signin')
    @HttpCode(HttpStatus.OK)
    async signinLocal(
        @Body() dto: AuthDto,
        @Request() req,
        @Response() res,    
    ) {
        const data = await this.authService.signinLocal(dto);

        res.cookie('access_token', data.access_token, {
            expires: new Date(new Date().getTime() + 60 * 15),
            sameSite: 'strict',
            httpOnly: true,
        })

        res.cookie('refresh_token', data.refresh_token, {
            expires: new Date(new Date().getTime() + 60 * 60 * 24 * 7),
            sameSite: 'strict',
            httpOnly: true,
        })

        return res.json(this.jwtService.decode(data.access_token))
    }

    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId: number) {
        return this.authService.logout(userId)
    }

    @Public()
    @UseGuards(RtGuard)
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(
        @GetCurrentUser('refreshToken')  refreshToken: string, 
        @GetCurrentUserId() userId: number
    ) {
        return this.authService.refreshTokens(userId, refreshToken)
    }
}
