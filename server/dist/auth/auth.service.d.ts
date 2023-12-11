import { PrismaService } from '..//prisma/prisma.service';
import { AuthDto, SignInDto, SignOutDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private prisma;
    private jwtService;
    private config;
    constructor(prisma: PrismaService, jwtService: JwtService, config: ConfigService);
    signupLocal(dto: AuthDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    updateRtHash(userId: number, rt: string): Promise<void>;
    signinLocal(dto: SignInDto): Promise<{
        tokens: {
            access_token: string;
            refresh_token: string;
        };
        userData: {
            currentSeconds: number;
            solutions: string[];
        };
    }>;
    logout(userId: number, dto: SignOutDto): Promise<void>;
    refreshTokens(userId: number, rt: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    hashData(data: string): Promise<string>;
    getTokens(userId: number, username: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
