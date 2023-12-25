import { Controller, Post, Request, Response, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignInDto, SignOutDto } from './dto';
import { Tokens } from './types/tokens.type';
import { RtGuard } from '../common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from '../common/decorators';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private jwtService: JwtService) {}

    @Public()
    @Post('/local/signup')
    @HttpCode(HttpStatus.CREATED)
    async signupLocal(@Body() dto: AuthDto, @Response() res): Promise<Tokens> {

        const data = await this.authService.signupLocal(dto);

        res.cookie('access_token', data.access_token, {
            sameSite: 'strict',
            httpOnly: true,
        });
        
        res.cookie('refresh_token', data.refresh_token, {
            sameSite: 'strict',
            httpOnly: true,
        });

        const { id, username } = this.jwtService.decode(data.access_token)

        return res.json({ id, username })
    }

    @Public()
    @Post('/local/signin')
    @HttpCode(HttpStatus.OK)
    async signinLocal(
        @Body() dto: SignInDto,
        @Response() res,    
    ) {
        
        const data = await this.authService.signinLocal(dto);

        res.cookie('access_token', data.tokens.access_token, {
            sameSite: 'strict',
            httpOnly: true,
        });
        
        res.cookie('refresh_token', data.tokens.refresh_token, {
            sameSite: 'strict',
            httpOnly: true,
        });

        const { id, username } = this.jwtService.decode(data.tokens.access_token)

        return res.json({ id, username, ...data.userData })

    }

    @Post('/logout')
    @HttpCode(HttpStatus.OK)
    logout(
        @Body() dto: SignOutDto,
        @GetCurrentUserId() userId: number,
        @Response() res,    
    ) {

        res.cookie('refresh_token', '', {
            sameSite: 'strict',
            httpOnly: true,
        });

        res.cookie('access_token', '', {
            sameSite: 'strict',
            httpOnly: true,
        });

        this.authService.logout(userId, dto);

        return res.sendStatus(200);
    }

    @Public()
    @UseGuards(RtGuard)
    @Post('/refresh')
    @HttpCode(HttpStatus.OK)
    async refreshTokens(
        @GetCurrentUser('refreshToken')  refreshToken: string, 
        @GetCurrentUserId() userId: number,
        @Response() res
    ) {
        const data = await this.authService.refreshTokens(userId, refreshToken)

        res.cookie('access_token', data.access_token, {
            sameSite: 'strict',
            httpOnly: true,
        })

        res.cookie('refresh_token', data.refresh_token, {
            sameSite: 'strict',
            httpOnly: true,
        })

        return res.sendStatus(200)
    }
}
