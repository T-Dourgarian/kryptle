import { AuthService } from './auth.service';
import { AuthDto, SignInDto, SignOutDto } from './dto';
import { Tokens } from './types/tokens.type';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private authService;
    private jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    signupLocal(dto: AuthDto, res: any): Promise<Tokens>;
    signinLocal(dto: SignInDto, res: any): Promise<any>;
    logout(dto: SignOutDto, userId: number): Promise<void>;
    refreshTokens(refreshToken: string, userId: number, res: any): Promise<any>;
}
